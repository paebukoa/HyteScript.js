const djs = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./classes/reader.js");
const errors = require("./classes/errors.js");
const prototypes = require("./classes/prototypes.js");
const loadedFuncs = require("./functions/funcParser.js");

class Client {
    constructor(options) {

        // client part
        const client = new djs.Client({intents: options.intents});

        client.once("ready", () => {
            const hyteScriptVersion = require("../package.json").version;
            console.log("hyteScript | v" + hyteScriptVersion + " | HyTera Studios")
        });

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
            prototypes: prototypes,
            commands: {
                default: [],
                functional: []
            },
            error: errors,
            reader: reader,
            djs: djs
        }

        // avoinding crashes
        process.on('uncaughtException', function (err) {
            console.error(err);
        });
    }

    addCommands(...optionsArr) {
        for (let options of optionsArr) {
            let {name, type = "default", code} = options;

            console.log(`|--------------- LOADING COMMADS ---------------|`);

            // checking name and code
            if (!name || !code) return console.log(`| Invalid name or code!\n|-----------------------------------------------|`);

            // validating type
            const findType = eval(`this.data.commands.${type}`);
            if (!findType) return console.log(`| ${name}: the type "${type}" is invalid!\n|-----------------------------------------------|`);

            // pushing command data
            eval(`this.data.commands.${type}.push(${JSON.stringify(options, 2)})`);

            console.log(`| ${name} (${type}): successfully loaded!\n|-----------------------------------------------|`)
        }
    }

    addEvents(...events) {
        const data = this.data;

        // setting events
        const acceptableEvents = {
            messageCreate() {
                data.client.on("messageCreate", message => {
                    // checking if content starts with prefix
                    if (!message.content.toLowerCase().startsWith(data.configs.prefix.toLowerCase())) return;
                    
                    // fetching commands
                    const foundCommands = data.commands.default.filter(c => message.content.toLowerCase().slice(data.configs.prefix.length).startsWith(c.name.toLowerCase()));

                    if (foundCommands === []) return;
                    
                    // reading commands
                    for (let command of foundCommands) {
                        // setting data
                        data.cmd = command;
                        data.message = message;
                        data.channel = message.channel;
                        data.author = message.author;
                        data.guild = message.guild;
                        data.args = message.content.slice(`${data.configs.prefix}${command.name}`.length).trim().split(" ");
                        data.err = false;
                        
                        // calling reader
                        const readCode = new data.reader(data, command.code);

                        if (data.exec.result.replaceAll("\n", "").trim() === "" || data.exec.error) return;

                        // sending reader result to the message channel
                        message.channel.send(data.exec.result);
                    }
                });
            }
        }

        for (let event of events) {
            if (typeof event !== "string") return;

            // validating event
            const executeEvent = acceptableEvents[event];

            if (!executeEvent) return;
            
            // executing event
            executeEvent();
        }
    }
}

module.exports = { Client };