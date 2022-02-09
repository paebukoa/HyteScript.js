class reader {
    constructor(data, code) {
        this.exec = {
            result: data.cmd.name,
            error: false
        }
    }
}

module.exports = reader;