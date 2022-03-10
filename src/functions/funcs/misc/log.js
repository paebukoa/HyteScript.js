module.exports = async d => {
    let [text = `Command ${d.command.name} triggered.`] = d.params.splits;
    
    console.log(text);
};