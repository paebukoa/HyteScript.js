const discord = require("discord.js");
const DBDJSDB = require("dbdjs.db");
const reader = require("./codeReader.js");
const error = require("./errors.js")

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

        const funcs = require("./functions/funcParser.js");

        client.login(d.token);

        this.data = {
            config: d,
            commands: [],
            client: client,
            db: db,
            funcs: funcs,
            error: {
                set: new error.ErrorClass(true),
                err: false
            },
            reader: reader
        }; 
    }

    addCommands(...d) {
            console.log("|-------- READING COMMANDS ---------|");
            d.map(x => {
                if(!x.name || !x.code) {
                    console.error("Error: the fields \"name\" and \"code\" are required.");
                    console.log("|-----------------------------------|");
                    return;
                }
                this.data.commands[this.data.commands.length] = {
                    name: x.name,
                    code: x.code,
                }
                console.log("| Command \"" + x.name + "\" loaded.")
                console.log("|-----------------------------------|");
            });

    }

    onMessage(d) {
        this.data.client.on('messageCreate', message => {
            if (d) {
                if (!d.respondToBots && message.author.bot) return;
            }
            if (!message.content.toLowerCase().startsWith(this.data.config.prefix)) return;
            this.data.commands.map(x => {
            if (message.content.toLowerCase().replace(this.data.config.prefix, "").trim().split(" ")[0] !== x.name.toLowerCase()) return;

            const data = {
                config: this.data.config,
                message: message,
                args: message.content.toLowerCase().replace(this.data.prefix, "").trim().split(" ").splice(1, 1).join(" "),
                client: this.data.client,
                db: this.data.db,
                funcs: this.data.funcs,
                command: x.name,
                commands: this.data.commands,
                error: this.data.error,
                reader: this.data.reader
            } 

            const funcRes = new reader.CodeReader(data, x.code);
            
            if(funcRes.result.trim() !== "" && !funcRes.error) {
                message.channel.send(funcRes.result);
            }
            });
        });
    }

}

module.exports = { Client };