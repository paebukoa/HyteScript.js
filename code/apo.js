const discord = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./codeReader.js");
const error = require("./errors.js");
const funcs = require("./functions/funcParser.js");
const protos = require("./prototypes.js");

class Client {
    constructor(d) {
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
            protos: protos,
            reader: reader
        };
    }

    addCommands(...d) {
            d.map(x => {
                let { name, type = "default", code } = x;
                const typeFolder = this.data.commands[type];
                if (typeFolder) {
                    this.data.commands[type].push({
                        name: name,
                        type: type,
                        code: code
                    });
                }
            });
    }

    on(type, dat) {
        const types = {
            messageCreate(d) {
                this.data.client.on('messageCreate', message => {
                    const cmd = message.content.slice(this.data.config.prefix.length).split(" ")[0];
        
                    if (d) {
                        if (!d.respondToBots && message.author.bot) return;
                    }
        
                    if (!message.content.toLowerCase().startsWith(this.data.config.prefix)) return;
        
                    const commands = this.data.commands.default.filter(x => x.name.toLowerCase() === cmd.toLowerCase() || x.aliases?.map(y => y.toLowerCase()).includes(cmd.toLowerCase()));
                    commands.map(x => {
                        const data = {
                            config: this.data.config,
                            message: message,
                            args: message.content.split(" ").slice(1).map(arg => protos.toEscape(arg)),
                            client: this.data.client,
                            db: this.data.db,
                            funcs: this.data.funcs,
                            command: x,
                            commands: this.data.commands,
                            error: this.data.error,
                            protos: this.data.protos,
                            reader: this.data.reader
                        } 
            
                        const funcRes = new reader(data, x.code);
                        
                        if(funcRes.result.trim() !== "" && !funcRes.error) {
                            message.channel.send(funcRes.result);
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