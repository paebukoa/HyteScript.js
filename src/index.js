const djs = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./classes/reader.js");
const errors = require("./classes/errors.js");
const prototypes = require("./classes/prototypes.js");
const loadedFuncs = require("./functions/funcParser.js");
const cld = require('child_process');

class Client {
    constructor(options) {

        // client part
        const client = new djs.Client({intents: options.intents});

        client.once("ready", () => {
            const hyCordVersion = require("../package.json").version;
            console.log("HyScriptJS | v" + hyCordVersion + " | HyptaStudios")
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

            if (!name || !code) return console.log(`Invalid name or code!`);

            const findType = eval(`this.data.commands.${type}`);
            if (!findType) return console.log(`Invalid type "${type}" in command "${name}".`);

            eval(`this.data.commands.${type}.push(${JSON.stringify(options, 2)})`);
        }
    }

    addEvents(...events) {
        const data = this.data;
        const acceptableEvents = {
            messageCreate() {
                data.client.on("messageCreate", message => {
                    if (!message.content.toLowerCase().startsWith(data.configs.prefix.toLowerCase())) return;

                    const foundCommands = data.commands.default.filter(c => message.content.toLowerCase().slice(data.configs.prefix.length).startsWith(c.name.toLowerCase()));

                    if (foundCommands === []) return;

                    for (let command of foundCommands) {
                        data.cmd = command;
                        data.message = message;
                        data.channel = message.channel;
                        data.author = message.author;
                        data.guild = message.guild;
                        data.args = message.content.slice(`${data.configs.prefix}${command.name}`.length).trim().split(" ");

                        const readCode = new data.reader(data, command.code);

                        if (data.exec.result.replaceAll("\n", "").trim() === "" || data.exec.error) return;

                        message.channel.send(data.exec.result);
                    }
                });
            }
        }

        for (let event of events) {
            if (typeof event !== "string") return;

            const executeEvent = acceptableEvents[event];

            if (!executeEvent) return;

            executeEvent();
        }
    }
}

module.exports = { Client };