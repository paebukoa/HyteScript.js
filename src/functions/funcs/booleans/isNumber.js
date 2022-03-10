module.exports = async d => {
	let [text] = d.params.splits;

	d.result = isNaN(text.trim()) === true ? "false" : "true";
};