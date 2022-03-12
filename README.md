<div align="center">
<h1><b>HyteScript.js</b></h1>

<img src="https://cdn.discordapp.com/attachments/903833951595036672/952355008156958750/HyteScript-nobg.png" width="300" height="300">
</div>
<br>

<div align="center">
It's an open source package that simplifies making Discord Bot.<br>
Feel free to do anything you want!
</div>


<br>
<h1 align="center">Example</h1>

```js
const hytescript = require("hytescript.js");

const client = new hytescript.Client({
    token: "your bot token here",
    prefix: "your bot prefix here",
    intents: ["your intents here"] // or you can just use intents: "all" (not recommended).
});

client.addCommands({
    type: 'ready',
    code: `
<|log Logged in <|client tag|>|>
`
}, {
    name: 'ping',
    code: `
🏓 Pong! <|ping|>ms.    
`
});

client.addEvents("messageCreate");
```

<br>
<h1>Folder Reader</h1>

For separing your commands from your index in diferent files, you can use this method
```js
client.readFolder(path);
```

Example:

+ Files

```
commands/
| utilities/
| | ping.js
index.js
```

+ ping.js

```js
module.exports = {
    name: "ping",
    code: `
🏓 Pong! <|ping|>ms. 
`
};
```

+ Reading commands folder

```js
const hytescript = require("hytescript.js");

const client = new hytescript.Client({
    token: "your bot token here",
    prefix: "your bot prefix here",
    intents: ["your intents here"] // or you can just use intents: "all" (not recommended).
});

client.readFolder("./commands");

client.addEvents("messageCreate");
```

<br>
<h1 align="center">About HyTera</h1>

**HyTera Ultra Studios** (which is not affiliated with radio companies) is a developer group composed by Hunter (main creator) and Paebukoa (main developer).<br>
It has a subgroup called **Hytera Development** that has our minor projects, such as **HyteScript.js**, Minecraft Mods, Discord Bots and more.

<br>
<h1 align="center">Links</h1>
<div align="center">
<a href="https://discord.gg/9DPmE8azm2">Discord</a><br>
<a href="https://github.com/paebukoa/HyteScript.js">Github</a>
</div>