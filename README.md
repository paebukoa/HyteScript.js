<img align="center" src="https://cdn.discordapp.com/attachments/926601392410484757/943353657955610634/logoHyScriptAlt2.png">

<br>

<b>HyteScript.js</b> is a open source package that simplifies making a Discord Bot.<br>
It's a Discord.js based package, which means that it use Discord.js for client, and not DiscordAPI itself.

<br>
<h1 align="center">Features</h1>

<span align="center"><b></b>
+ Easy to use and learn
+ Completly free
+ Built-in functions
+ Support for custom functions
</span>

<br>
<h1 align="center">Example</h1>

```js
const hytescript = require("hytescript.js");

const client = new hytescript.Client({
    token: process.env.TOKEN, // discord bot token
    prefix: "!", 
    intents: "all"
});

client.addCommands({
    type: 'ready',
    code: `
<|log Logged in {clientTag}|>

<|set clientTag/<|userTag <|clientId|>|>|>
`
}, {
    name: 'ping',
    code: `
🏓 Pong! <|ping|>ms.    
`
});

client.addEvents("messageCreate");
```