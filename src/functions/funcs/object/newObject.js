module.exports = {
	let [object,name = "default"] = d.params.splits;

try {
	d.utils.objects[name] = JSON.parse(object);
} catch (e) {
	return d.error.functionError(d, `failed to parse object: ${e}`);
};
}