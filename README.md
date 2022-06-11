<div align="center">
<h1><b>HyteScript.js</b></h1>

<img src="https://cdn.discordapp.com/attachments/903833951595036672/952355008156958750/HyteScript-nobg.png" width="300" height="300">
</div>
<br>

<div align="center">
It's an open source package that simplifies making Discord Bots.<br>
You have the freedom to do anything you want!
<br>

## Requires node.js v16.6.0 or later.
</div>

<br>
<h1 align="center">Installation</h1>

For installing this package you need to execute this on your console:

```bash
npm i hytescript.js
```

<br>
<h1 align="center">Example</h1>

```js
const hytescript = require("hytescript.js");

const client = new hytescript.DiscordClient({
    token: "your bot token here",
    prefix: "your bot prefix here",
    intents: ["your intents here"] // or you can just use intents: "all" (not recommended).
});

client.addCommands({
    name: 'ping',
    code: `
🏓 Pong! #(ping)ms.    
`
});

client.addEvents("messageCreate");
```

<br>
<h1 align="center">About HyTera</h1>

**HyTera Ultra Studios** (which is not affiliated with radio companies) is a developer group composed by Hunter (main creator) and Paebukoa (main developer).<br>
It has a subgroup called **Hytera Development** that has our minor projects, such as **HyteScript.js**, Minecraft Mods, Discord Bots and more.

<br>
<h1 align="center">Links</h1>
<div align="center">

[Our Discord Server](https://discord.gg/wx9kMjgcur)<br>
[HyteScript Source Code](https://github.com/paebukoa/HyteScript.js)<br>
[HyteScript Documentation](https://docs.hytescript.ga)<br>
[NPM page](https://www.npmjs.com/package/hytescript.js)<br>
[What inspired HyteScript](https://www.npmjs.com/package/aoi.js)

</div>