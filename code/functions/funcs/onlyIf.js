const { CheckCondition } = require("../../checkCondition");

module.exports = async d => {
    let [condition, errorMessage = ""] = d.params.splits;

    if(!eval(CheckCondition.solve(condition))) {
        d.error.err = true;
        if (errorMessage.trim() != "") d.message.channel.send(errorMessage);
    }
    d.result = "";
}