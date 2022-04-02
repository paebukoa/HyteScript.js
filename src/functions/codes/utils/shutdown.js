module.exports = async d => {
    await d.client.destroy();
    process.exit();
};