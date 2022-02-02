module.exports = async d => {
    try {
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        process.exit();
    } catch (e) {
        d.error.set.newError(d, 'function', `Failed to reboot client: ${e}`);
        return;
    }
}