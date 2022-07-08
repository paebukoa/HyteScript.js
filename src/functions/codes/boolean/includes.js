module.exports = async d => {
    let [string, ...searchs] = d.function.parameters;
    
    let includes = false;

    for (const search of searchs) {
        if (string.includes(search)) includes = true;
    }

    return includes;
};