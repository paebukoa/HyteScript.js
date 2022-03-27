module.exports = async d => {
    let [number] = d.func.params.splits;

    return isNaN(number) === true? false : true;
};