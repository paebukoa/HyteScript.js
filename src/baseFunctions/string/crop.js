module.exports = {
    description: 'Crops chars which exceeds provided max length. Returns cropped string + provided suffix (text in the end).',
    usage: 'string | maxLength | suffix?',
    parameters: [
        {
            name: 'String',
            description: 'String to get char at index.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Max length',
            description: 'The max length of the string to be left.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Suffix',
            description: 'Text to replace cropped text.',
            optional: 'true',
            defaultValue: '...'
        }
    ],
    run: async (d, string, maxLength, suffix = "...") => {
        if (string == undefined) return new d.error('required', d, 'string');
        if (maxLength == undefined) return new d.error('required', d, 'max length');

        if (isNaN(maxLength) || Number(maxLength) < 1) return new d.error('invalid', d, "max length", maxLength);

        let croppedText = string.slice(0, Number(maxLength));
        
        if (croppedText === string) return croppedText;

        return croppedText + suffix;
    }
}