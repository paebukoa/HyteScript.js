module.exports = async d => {
    let [msg] = d.inside.splits;
    d.result = msg.trim();
}