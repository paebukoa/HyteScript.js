module.exports = async d => {
    let [number] = d.function.parameters;

    return isNaN(number) === true? false : true;
};