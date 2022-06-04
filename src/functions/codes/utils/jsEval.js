module.exports = async d => {
    let [jsCode] = d.func.params.splits;
        
    return JSON.stringify(eval(jsCode), null, 2);
};