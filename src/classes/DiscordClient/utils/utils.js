const BaseUtils = require('../../../utils/BaseUtils');
const Properties = require('./classes/properties');

module.exports = class Utils extends BaseUtils {
    static Functions = require('./classes/functions')
    static Events = require('./classes/events')
    static commandTypes = require('./types/commandTypes')
    static error = require('./classes/error')
    static Command = require('./classes/command')

    static async parseMessage(d, message, removeEmpty = true) {
        let oldMessage = BaseUtils.clone(d.data.message)
        d.data.message.reset()

        let parsedMessage = await message.parse(d)
        
        if (parsedMessage.error) return {error: true}
        
        d.data.message = oldMessage

        if (parsedMessage.message.content == '' && removeEmpty) delete parsedMessage.message.content
        if (parsedMessage.message.embeds[0] == undefined && removeEmpty) delete parsedMessage.message.embeds
        if (parsedMessage.message.components[0] == undefined && removeEmpty) delete parsedMessage.message.components

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