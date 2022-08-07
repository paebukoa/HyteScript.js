module.exports = async (_d, string) => {
    
    let specialChars = {
        "s'y": 'á',
        "s'k": 'â',
        "s'c": 'à',
        "s't": 'ã',
        "p'y": 'ó',
        "p'k": 'ô',
        "p'c": 'ò',
        "p't": 'õ',
        "r'y": 'é',
        "r'k": 'ê',
        "r'c": 'è',
        "o'y": 'í',
        "o'k": 'î',
        "o'c": 'ì',
        "i'y": 'ú',
        "i'k": 'û',
        "i'c": 'ù'
    }

    for (const specialChar in specialChars) {
        const unconverted = specialChars[specialChar]
        let specialCharInsensitive = new RegExp(specialChar, 'gi')

        string = string.replaceAll(specialCharInsensitive, unconverted)
    }

    let unconvert = {
        o: 'a',
        n: 'b',
        v: 'c',
        f: 'd',
        u: 'e',
        g: 'f',
        h: 'g',
        j: 'h',
        r: 'i',
        k: 'j',
        l: 'k',
        s: 'l',
        z: 'm',
        m: 'n',
        a: 'o',
        q: 'p',
        w: 'q',
        t: 'r',
        d: 's',
        y: 't',
        e: 'u',
        b: 'v',
        i: 'w',
        c: 'x',
        p: 'y',
        x: 'z'
      }

      return [...string].map(letter => {
        
        let letterCase 
        
        if (letter.toLowerCase() === letter) letterCase = 'Lower'
        else letterCase = 'Upper'

        if (unconvert[letter.toLowerCase()]) return unconvert[letter.toLowerCase()][`to${letterCase}Case`]()
        else return letter
    }).join("")
};

const { MessageEmbed } = require('discord.js')
const { inspect } = require('util')


module.exports = {
    name: "eval",
    description: "Run a whole fuckin' code with this!",
    botPerms: ["EMBED_LINKS"],
    run: async (client, message, args) => {
        let code = args.join(' ')
        if (code.trim() === '') return message.channel.send('What do you want to evaluate?')
        
        try {
            let evaled = eval(code)
            if (typeof evaled !== 'string') evaled = inspect(evaled, false, 4, true)

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setAuthor('Eval', message.author.avatarURL())
                    .addField('Input', `\`\`\`
${code}
\`\`\``)
                    .addField('Output', `\`\`\`ansi
\x1b[0m${evaled}
\`\`\``)
                    .setColor('GREEN')
                ]
            })
        } catch (e) {
            message.channel.send(`\`ERROR\`\n:x: ${e}`)
        }


    }
}