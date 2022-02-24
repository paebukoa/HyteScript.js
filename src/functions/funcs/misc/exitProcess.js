module.exports = async d => {
    try {
        process.on("exit", () => {
            console.log("|--------------- PROCESS  EXITED ---------------|");
        });
        process.exit();
    } catch (e) {
        return d.error.functionError(d, `Failed to exit process: ${e}`);
    };
};