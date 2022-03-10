module.exports = async d => {
	let [...texts] = d.params.splits;

	d.result = texts[Math.round(Math.random() * (texts.length - 1))]
}