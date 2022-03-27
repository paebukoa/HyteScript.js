module.exports = async d => {
    let [property = "message"] = d.func.params.splits;
    
    return d.data.errorData[property];
}