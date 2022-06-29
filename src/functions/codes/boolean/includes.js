module.exports = async d => {
    let [string, ...searchs] = d.func.params.splits;
    
    let includes = false;

    for (const search of searchs) {
        if (string.includes(search)) includes = true;
    }

    return includes;
};