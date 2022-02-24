module.exports = async d => {
    d.result = d.client.ws.ping;
};