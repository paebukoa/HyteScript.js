const AsciiTable = require("ascii-table/ascii-table");
const { get } = require("axios");
const Compiler = require("../../compiler");
const { HscLog, clone, wait } = require("../utils/utils");

module.exports = async d => {
    d.client.once('ready', async () => {
        // Commands Loader

        process.stdout.write('Loading commands... ')

        let table = new AsciiTable()
        .setTitle("COMMANDS")
        .setHeading('', 'name', 'type', 'status', 'problems')
        .setAlign(2, AsciiTable.CENTER)
        .setAlign(3, AsciiTable.CENTER)
        .setAlign(4, AsciiTable.RIGHT)
        .setBorder('|', '=', '.', "'")

        let idx = 1
        let load = 0
        let plus = Number((100 / d.commands.length).toFixed(2))

        d.commands.forEach(c => {
            if (c.command != undefined) {
                c.command.code = Compiler.compile(c.command.code)
                d.commandManager[c.command.type].set(c.command.name, c.command)
            }

            load = Math.round(load + plus) 
            process.stdout.write(load >= 100 ? `\x1b[35m100%\x1b[0m\u0008\u0008\u0008\u0008` : `\x1b[35m${load}%\x1b[0m${`\u0008`.repeat(`${load}%`.length)}`)

            table.addRow(idx, c.row.name, c.row.type, c.row.status, c.row.problems)

            idx++
        })
        process.stdout.write(`\x1b[35m100%\x1b[0m\n`)

        console.log(table.render())

        // Status Loader

        if (d.status.length != 0) { // checking if d.status is not empty
            let index = 0

            async function runStatus() {
                while (true) {
                    
                    const {text, type, status, time} = d.status[index]

                    let textData = clone(d)

                    textData.command = {}
                    textData.eventType = 'loadStatus'
                    textData.err = false
                    textData.data = d.data.newInstance()
                    
                    let parseText = await text.parse(textData)
                    if (parseText.error) return;

                    d.client.user.setPresence({
                        activities: [{
                            name: parseText.result,
                            type
                        }],
                        status
                    })

                    await wait(time)
                    
                    if (index === d.status.length - 1) index = 0
                    else index++
                }  
            }

            runStatus()
        }

        // API data Fetch

        const version = (d.data.newInstance()).version;

        const res = await get("https://paebukoaapi.paebukoa.repl.co").catch(e => { return { status: 0 } });
        
        if (res.status !== 200 || typeof res.data !== 'object') {
            HscLog.warn('\x1b[31mcould not contact API.\x1b[0m')
            res.data = {
                hytera: {invite: d.invite},
                hytescript: {version, ownerMessage: ''}
            }
        }

        d.invite = res.data.hytera.invite

        // Status Logs

        if (d.clientOptions.debug === true) HscLog.debug(`\x1b[35;1m${d.functions.size || 0} functions \x1b[0mloaded.`)
     // if (version !== res.data.hytescript.version) HscLog.warn(`\x1b[31mYOU'RE NOT USING THE LATEST VERSION OF HYTESCRIPT (v${latestVersion})!\x1b[0m`)
        HscLog.warn(`\x1b[31mYou're using a dev version, which means that it can contains serious bugs and stability problems.\nPlease, use v${res.data.hytescript.version} if you're looking for a stable version.\x1b[0m`)
        HscLog.info(`\x1b[0mClient initialized on \x1b[36;1mv${version}\x1b[0m.`);
        if (typeof res.data.hytescript.ownerMessage === 'string' && res.data.hytescript.ownerMessage !== '') HscLog.info(`\x1b[36m"${colorful(res.data.hytescript.ownerMessage, 82, 87)}\x1b[36m"\x1b[0m - paebukoa`)
        console.log(`HyTera Development - \x1b[34;1m${d.invite}\x1b[0m`);

        // "ready" Commands Loader

        d.commandManager.ready.forEach(async commandData => {
            
            let data = clone(d)

            data.command = commandData
            data.eventType = 'ready'
            data.err = false
            data.data = d.data.newInstance()

            await commandData.code.parse(data) 
        })
    })
}

// Useful functions

function colorful(str, start, end) {
    const chars = [...str]
    let colored = ''
    let type = '+'
    let idx = start
    for (const char of chars) {
        if (idx === end) type = '-'
        else if (idx === start) type = '+'

        colored += `\x1b[38;5;${idx}m` + char

        if (type === '+') idx++
        else idx--
    }
    colored += `\x1b[0m`

    return colored
}