module.exports = {
    description: 'Kills client and exits current process.',
    run: async d => {
        await d.client.destroy();
        process.exit();
    }
};