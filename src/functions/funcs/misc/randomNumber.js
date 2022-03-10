module.exports = async d => {
	let [min, max] = d.params.splits;

	if (isNaN(min) || isNaN(max) || Number(min) >= Number(max)) return d.error.invalidError(d, "number", `${min}, ${max}`);

d.result = Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
};