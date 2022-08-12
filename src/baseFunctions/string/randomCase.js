module.exports = {
    description: 'Returns string with randomly lower case or upper case letters.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'The string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error("required", d, 'string');

        let chars = [...string];
        let cases = [
            char => char.toLowerCase(), 
            char => char.toUpperCase()
        ];

        return chars.map(char => {
            let randomIndex = Math.round(Math.random() * 1);

            let caser = cases[randomIndex];
            
            return caser(char);
        }).join("");
    }
}