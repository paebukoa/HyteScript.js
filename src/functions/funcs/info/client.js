module.exports = async d => {
    let [property] = d.params.splits;
    
    if (Array.isArray((d.client.user[property]))) {
        d.result = d.client.user[property].flat(Infinity).join(",");
        return;
    }

    d.result = d.client.user[property];

}