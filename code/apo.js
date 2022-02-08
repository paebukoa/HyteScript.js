const discord = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./newReader.js");
const error = require("./errors.js");
const funcs = require("./functions/funcParser.js");
const protos = require("./prototypes.js");
const cld = require('child_process');

class Client {
    constructor(d) {
        process.on('uncaughtException', function (err) {
            console.error(err);
        });

        const client = new discord.Client({intents: d.intents});
        
        const db = new DBDJSDB.Database({
            path: "./database/",
            tables: [{
                name: "main",
            }],
        });

        db.once("ready", () => {
        console.log("Database loaded.");
        });

        db.connect();

        client.once("ready", () => {
            console.log("Initialized on apo.js - " + require("./../package.json").version);
        });

        client.login(d.token);
        function initializeExpress() {
            const express = require('express');
            const app = express();
            app.get("/", (request, response) => {
                response.sendStatus(200);
            });
            app.listen(process.env.PORT);
            console.log(`\x1b[32mExpress initialized!\x1b[0m`)
        }
        
        try {
            console.log(`\x1b[33mInitializing express...\x1b[0m`);
            initializeExpress();
        } catch {
            console.log(`\x1b[31mExpress is not installed!\x1b[0m\n\x1b[36mInstalling express...\x1b[0m`);
            try {
                cld.execSync("npm i express");
                initializeExpress();
            } catch (e) {
                console.log(`\x1b[31mFailed to initialize express: ${e}\x1b[0m`);
            }
        }

        this.data = {
            config: d,
            commands: {
                default: [],
                functional: []
            },
            client: client,
            db: db,
            funcs: funcs,
            error: {
                set: new error.ErrorClass(true),
                err: false
            },
            protos: new protos.Functions(),
            reader: reader
        };
    }

    addCommands(...d) {
        console.log(`|----------- READING COMMANDS -----------|`);
            d.map(x => {
                let { name, type = "default", code } = x;
                if (!name || !code) {
                    console.log(`\x1b[41m${name}: Failed to load.\x1b[0m`);
                    console.log(`|----------------------------------------|`);
                    return;
                }
                const typeFolder = this.data.commands[type];
                if (!typeFolder) {
                    console.log(`\x1b[41m${name}: Invalid type "${type}" provided.\x1b[0m`);
                    console.log(`|----------------------------------------|`);
                    return;
                }
                this.data.commands[type].push({
                    name: name,
                    type: type,
                    code: code
                });
                console.log(`\x1b[42m${name}: Command successfully loaded!\x1b[0m`);
                console.log(`|----------------------------------------|`);
            });
    }

    on(type, dat) {
        const dats = this.data;
        const types = {
            messageCreate(d) {
                dats.client.on('messageCreate', message => {
                    const cmd = message.content.slice(dats.config.prefix.length).split(" ")[0];
        
                    if (d) {
                        if (!d.respondToBots && message.author.bot) return;
                    }
        
                    if (!message.content.toLowerCase().startsWith(dats.config.prefix)) return;
        
                    const commands = dats.commands.default.filter(x => x.name.toLowerCase() === cmd.toLowerCase() || x.aliases?.map(y => y.toLowerCase()).includes(cmd.toLowerCase()));
                    commands.map(x => {
                        const data = {
                            config: dats.config,
                            message: message,
                            args: message.content.split(" ").slice(1).map(arg => dats.protos.toEscape(arg)),
                            client: dats.client,
                            db: dats.db,
                            funcs: dats.funcs,
                            command: x,
                            commands: dats.commands,
                            error: dats.error,
                            protos: dats.protos,
                            reader: dats.reader
                        } 
            
                        const funcRes = new reader(data, x.code);
                        
                        if((funcRes.data.code.executionResult.replaceAll("\n", "").trim() !== "" || funcRes.data.embeds !== []) && !funcRes.data.error.err) {
                            message.channel.send({
                                content: funcRes.data.code.executionResult
                            });
                        }
                    })
                });
            },

            messageDelete(d) {
                throw new SyntaxError(`This type is not complete yet.`);
            },

            messageEdit(d) {
                throw new SyntaxError(`This type is not complete yet.`);
            },

            interactionCreate(d) {
                throw new SyntaxError(`This type is not complete yet.`);
            }
        }
        const executeEvent = types[type];
        if (executeEvent) {
            executeEvent(dat);
        }
    }

}

module.exports = { Client };