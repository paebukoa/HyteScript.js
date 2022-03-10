module.exports = async d => {
	let [object,name = "default"] = d.params.splits;

	try {
		d.utils.object[name] = JSON.parse(object);
	} catch (e) {
		return d.error.functionError(d, `failed to parse object: ${e}`);
	};
}