module.exports = class HscLog {
    static logErrors = true

    static error(message, exitProcess = true) {
        console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[31mERROR\x1b[0m | ${message}\x1b[0m`)
        if (exitProcess) process.exit()
    }

    static info(message) {
        console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[36mINFO\x1b[0m | ${message}\x1b[0m`)
    }
    static warn(message) {
        console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[33mWARN\x1b[0m | ${message}\x1b[0m`)
    }
    static debug(message) {
        console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[35mDEBUG\x1b[0m | ${message}\x1b[0m`)
    }
}