module.exports = {
    description: 'Abbreviates a large number.',
    usage: 'number | decimals?',
    parameters: [
        {
            name: 'Number',
            description: 'The number to abbreviate.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Decimals',
            description: 'How many decimals to be included.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, number, decimals = '1') => {
        if (number == undefined) return new d.error('required', d, 'number');
        
        if (isNaN(decimals) || Number(decimals) < 0) return new d.error('invalid', d, 'decimals number', decimals);

    const tier = Math.floor(Math.log10(Math.abs(number || 1)) / 3);
    if (tier === 0) return number;

    const symbols = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C", "UC"] 
        
    const symbol = symbols[tier - 1];
    const abbreviated = number / (10 ** (tier * 3));
    
    return abbreviated.toFixed(Number(decimals)) + symbol;
}};