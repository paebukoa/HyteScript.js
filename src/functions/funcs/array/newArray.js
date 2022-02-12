module.exports = async d => {
    let [text, splitter = ",", name = "default"] = d.params.splits;

    d.utils.array[name] = text.split(splitter);
}