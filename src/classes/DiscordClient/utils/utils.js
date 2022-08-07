const BaseUtils = require('../../../utils/BaseUtils')

module.exports = class Utils extends BaseUtils {
    static Command(d, command, path = 'unknown') {
        const table = new AsciiTable()

        let {type = 'default', ignorePrefix = false, executeOnDm = false, enableComments = false} = command;
        // exporting optional properties from command

        if (!['string', 'undefined', undefined].includes(typeof command.name)) errorRow('invalid name')
        else if (typeof command.code !== 'string') errorRow('invalid code')
        else if (typeof type !== 'string' || !d.commandManager[type]) errorRow('invalid type')
        else {
            function* genId() {
                let id = 0

                while (true) {
                    id++
                    yield id
                }
            }

            let id = genId().next().value

            while(d.commandManager[type].get(id) != undefined) id = id.next().value
            // generating a new id

            let compiledCode = Compiler.compile(command.code)
            command.code = compiledCode

            d.commandManager[type].set(command.name ? command.name.toLowerCase() : id, {...command, type, ignorePrefix, executeOnDm, enableComments})

            table.addRow(
                typeof command.name === 'string' ? command.name : path,
                type,
                'OK',
                'none'
            )
        }

        return {table}

        function errorRow(err) {
            table.addRow(
                typeof command.name === 'string' ? command.name : path,
                type,
                'ERROR',
                err
            )
        }
    }
    static async parseMessage(d, message) {
        let oldMessage = Utils.duplicate(d.data.message)
        d.data.message.reset()

        let parsedMessage = await message.parse(d)
        if (parsedMessage.error) return {error: true}
        
        d.data.message = oldMessage

        return parsedMessage.message
    }
    
    /**
     * Gets a property from an object.
     * @param {string} type the object type
     * @param {object} obj the object
     * @param {string} prop the property to return
     * @returns {any | undefined} the property value 
     */
     static getProperty(type, obj, prop) {
        return Properties[type](obj, prop)
    }

}