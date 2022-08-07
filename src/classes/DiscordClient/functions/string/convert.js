/*module.exports = async (_d, string) => {

    let convert = {
        a: 'o',
        b: 'n',
        c: 'v',
        d: 'f',
        e: 'u',
        f: 'g',
        g: 'h',
        h: 'j',
        i: 'r',
        j: 'k',
        k: 'l',
        l: 's',
        m: 'z',
        n: 'm',
        o: 'a',
        p: 'q',
        q: 'w',
        r: 't',
        s: 'd',
        t: 'y',
        u: 'e',
        v: 'b',
        w: 'i',
        x: 'c',
        y: 'p',
        z: 'x'
    }

    let result = [...string].map(letter => {
        
        let letterCase 
        
        if (letter.toLowerCase() === letter) letterCase = 'Lower'
        else letterCase = 'Upper'

        if (convert[letter.toLowerCase()]) return convert[letter.toLowerCase()][`to${letterCase}Case`]()
        else return letter
    }).join("")

    let specialChars = {
        'á': "s'y",
        'â': "s'k",
        'à': "s'c",
        'ã': "s't",
        'ó': "p'y",
        'ô': "p'k",
        'ò': "p'c",
        'õ': "p't",
        'é': "r'y",
        'ê': "r'k",
        'è': "r'c",
        'í': "o'y",
        'î': "o'k",
        'ì': "o'c",
        'ú': "i'y",
        'û': "i'k",
        'ù': "i'c"
    }

    for (const specialChar in specialChars) {
        const converted = specialChars[specialChar]
        specialCharInsensitive = new RegExp(specialChar, 'gi')

        result = result.replaceAll(specialCharInsensitive, converted)
    }

    return result
}*/

module.exports = {
    run: async (d, str) => {
        let converters = {
            a: `(![]+[])[+!![]]`,
            b: `({}+[])[+!![]+!![]]`,
            c: `({}+[])[+!![]+!![]+!![]+!![]+!![]]`,
            d: `([][+[]])[+!![]+!![]]`,
            e: `({}+[])[+!![]+!![]+!![]+!![]]`,
            f: `(![]+[])[+[]]`,
            g: `(typeof ([]+[]))[+!![]+!![]+!![]+!![]+!![]]`,
            h: `(new Date((+!![]+!![]+!![]+!![]+!![])**(+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]))+[])[+!![]]`,
            i: `([][+[]]+[])[+!![]+!![]+!![]+!![]+!![]]`,
            j: `({}+[])[+!![]+!![]+!![]]`,
            k: `Object.keys[${this.n}+${this.a}+${this.m}+${this.e}][+[]]`,
            l: `(![]+[])[+!![]+!![]]`,
            m: `(new Map()+[])[+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]]`,
            n: `([][+[]]+[])[+!![]]`,
            o: `({}+[])[+!![]]`,
            p: `(new Map()+[])[+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]]`,
            q: ``

        }
    }
}