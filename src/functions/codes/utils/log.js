module.exports = async d => {
    let [message] = d.func.params.splits;

    console.log(message);
};