<div align="center"> <!-- name and banner -->
<h1><b>HyteScript.js</b></h1>

<img src="https://i.imgur.com/29LKvOQ.png" width="300" height="300">
</div>

<div align="center"> <!-- short description -->
<p>HyteScript is a package that simplifies coding anything.</p>
<p>It's currently mainly used for creating Discord bots, but in the future I intend to make more compatibility for making anything you want.</p>
</div>

<h1 align="center">Installation</h1>

As usual, for installing that package you need to use the command below:

```bash
npm i hytescript.js
```

Note that HyteScript.js needs <a href="https://nodejs.org">Node.js v16.9.0 or later</a> to work properly.

<br>
<h1 align="center">Index example</h1>

```js
const hytescript = require("hytescript.js");

new hytescript.DiscordClient({
    token: "your bot token here",
    prefix: "your bot prefix here",
    intents: ["your intents here"]
}) // DiscordClient have support for chaining!
.addCommands({
    name: 'ping',
    code: `
🏓 Pong! #(ping)ms.    
`
})
.addEvents("messageCreate");
```

<h1 align="center">Understanding how HyteScript works</h1>
HyteScript has a basic syntax:

`Text #(function parameter1 | parameter2...) more text`

Note that using whitespaces between parameter separator and parameter doesn't matter, HyteScript will remove it for you.

Just like HyteScript removes whitespaces, it also removes `\n` (new-line, line break...). For using it, you must use `%br%` (it's case insensitive, so you can use `%BR%`, `%Br%`...).

HyteScript reads your code from top to bottom, left to right, just like you're reading this.

Functions names are also case insensitive, so you can use `#(fuNCTion)` or `#(FUNCTION)`, it will work normally.

## Text
The text is everything that doesn't have a special meaning.
Anything outside a function or inside a function as a parameter is considered text.

## #(
Start of a function. When the `#` is used without `(`, then it will be interpreted as text. The same happens when `(` is used without `#`.

Functions always needs that to be used.

## Function
The name of the function that you're going to use. Other functions can't be used inside it, unless you use eval.

## Parameters
Parameters are the text that will be sent to the function. Parameters are separated by `|`, so if you're going to provide the value for the second parameter, you need to use it.

Functions accepts other functions or subfunctions inside it, e.g. `#(function parameter | #(function parameter))`.

## )
Closing a function, which means that you'll not be providing parameters for that function anymore. When you close a function you go back to write <a href="#Text">**text**</a>.<br>

# End

That's it, now you have the knowledge of how hytescript syntax works. Browse the <a href="https://hytescript.hdevelopment.tk">documentation</a> to find out more.

HyteScript is totally made by **paebukoa** 💖, using the package <a href="https://discord.js.org">Discord.js</a>.<br>
You can anyways contribute to HyteScript.js in it <a href="https://github.com/paebukoa/HyteScript.js">GitHub Repository</a>.

See you later in <a href="https://discord.gg/bdUENGdN88">our support</a>, if you need it!