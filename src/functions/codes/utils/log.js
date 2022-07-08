module.exports = async d => {
    let [message] = d.function.parameters;

    console.log(message);
};