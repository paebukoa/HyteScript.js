const djs = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./classes/reader");
const errors = require("./classes/errors");
const prots = require("./classes/prototypes");
const loadedFuncs = require("./functions/funcParser");
const loadedEvents = require("./events/eventParser");
const fs = require("fs");
const PATH = require("path");

class Client {
    constructor(options) {

        const allIntents = ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_SCHEDULED_EVENTS"];
        let intents = options.intents==="all"
        ?allIntents
        :options.intents;
        
        // client part
        const client = new djs.Client({intents: intents, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]});

        
        // database part
        const db = new DBDJSDB.Database({
            path: "./database/",
            tables: [{
                name: "main",
            }],
        });
        
        db.once("ready", () => {
            console.log("Database ready!");
        });

        // initializing
        db.connect();
        client.login(options.token);

        // setting data
        this.data = {
            configs: options,
            client: client,
            db: db,
            loadedFuncs: loadedFuncs,
            prots: prots,
            commands: {
                default: [],
                functional: [],
                ready: []
            },
            error: errors,
            reader: reader,
            djs: djs
        };

        
        // avoinding crashes
        process.on('uncaughtException', function (err) {
            console.error(err);
        });

        client.once("ready", () => {
            const hyteScriptVersion = require("../package.json").version;
            console.log("hyteScript | v" + hyteScriptVersion + " | HyTera Studios");

            for (let command of this.data.commands.ready) {
                // setting data
                let data = this.data;

                let channel = data.client.channels.cache.get(command.channel);

                data.cmd = command;
                if (channel) {
                    data.channel = channel;
                    data.guild = channel.guild;
                }
                data.err = false;
                data.utils = {
                    array: {default: []},
                    object: {default: {}},
                    vars: {},
                    embeds: []
                };
    
                // calling reader
                const readData = new data.reader(data, command.code);

                if (channel) {
					let messageData = {content: readData.result, embeds: readData.utils.embeds};

                    if (readData.result.replace('\n', '').trim() === '') messageData = {embeds: readData.utils.embeds};

                    if (JSON.stringify(messageData.embeds) === "[]" && !messageData.content) return;

                    // sending message with messageData
                    channel.send(messageData);
				};
            };
        });
    }

    addCommands(...optionsArr) {
        console.log(`|--------------- LOADING COMMADS ---------------|`);
        for (let options of optionsArr) {
            let {name, type = "default", code} = options;

            // checking name and code
            if (!code) return console.log(`| ${name || "unknown"}: Invalid code!\n|-----------------------------------------------|`);

            // validating type
            if (!this.data.commands[type]) return console.log(`| ${name || "unknown"}: the type "${type}" is invalid!\n|-----------------------------------------------|`);

            // pushing command data
            this.data.commands[type].push(options);

            console.log(`| ${name || "unknown"} (${type}): successfully loaded!\n|-----------------------------------------------|`);
        }
    }

    addEvents(...events) {
        // setting event
        for (let event of events) {
            if (typeof event !== "string") return;

            // validating event
            const executeEvent = loadedEvents[event];
            if (!executeEvent) return;
            
            // executing event
            executeEvent(this.data);
        }
    }

    async readFolder(path) {
        async function getFiles(path) {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) console.error(`Cannot read ${path}: directory does not exists.`);
                return;
            });

            let files = await fs.promises
            .readdir(path, {withFileTypes: true})
            .then((f) => {
                return f.map((d) => {
                    d.name = `${path}${PATH.sep}${d.name}`;

                    return d;
                });
            });

            let types = {
                files: files.filter(file => file.isFile()),
                dirs: files.filter(file => file.isDirectory())
            };

            for (let dir of types.dirs) {
                let dirFiles = await getFiles(dir.name);

                types.files.push(...dirFiles);
            };

            return types.files;
        };

        let files = await getFiles(path);

        console.log(`|--------------- READING FOLDERS ---------------|`);

        for (let file of files) {

            fs.realpath(path, (err, dir) => {
                if (err) return console.log(`Failed to read ${dir + file.name.replace(path, '')}`);

                let cmdData;

                try {
                    cmdData = require(dir + file.name.replace(path, ''));
                    
                    let optionsArr = [];

                    if (Array.isArray(cmdData)) {
                        optionsArr.push(...cmdData);
                    } else {
                        optionsArr.push(cmdData);
                    };

                    for (let options of optionsArr) {
                        let {name, type = "default", code} = options;
                        
                        console.log(`| Reading ${dir + file.name.replace(path, '')}`);
                        console.log(`|`);
                        
                        // checking name and code
                        if (!code || typeof code !== "string") return console.log(`| ${name || "unknown"}: Invalid code!\n|-----------------------------------------------|`);
                        
                        // validating type
                        if (!this.data.commands[type]) return console.log(`| ${name || "unknown"}: the type "${type}" is invalid!\n|-----------------------------------------------|`);
                        
                        // pushing command data
                        this.data.commands[type].push(options);
                        
                        console.log(`| ${name || "unknown"} (${type}): successfully loaded!\n|-----------------------------------------------|`);
                    };
                } catch {
                    console.log(`Failed to read ${dir + file.name.replace(path, '')}`);
                };
        });

        };
    }
};

module.exports = { Client };