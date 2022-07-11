module.exports = async d => {
    let [property = "message"] = d.function.parameters;
    
    return d.data.errorData[property];
}