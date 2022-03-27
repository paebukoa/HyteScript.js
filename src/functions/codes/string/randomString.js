module.exports = async d => {
	let [...texts] = d.func.params.splits;

	return texts[Math.round(Math.random() * (texts.length - 1))]
}