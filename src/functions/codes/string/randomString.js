module.exports = async d => {
	let [...texts] = d.function.parameters;

	return texts[Math.round(Math.random() * (texts.length - 1))]
}