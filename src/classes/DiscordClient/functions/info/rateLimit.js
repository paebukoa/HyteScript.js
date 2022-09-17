module.exports = {
    run: async (d, property) => {
        if (!['rateLimit'].includes(d.eventType)) return new d.error("notAllowed", d)

        let properties = {
            mstimeout: d.rateLimit.timeout,
            limit: d.rateLimit.limit,
            method: d.rateLimit.method,
            path: d.rateLimit.path,
            route: d.rateLimit.route,
            isglobal: d.rateLimit.global ? 'true' : 'false'
        }

        if (!properties[property.toLowerCase()]) return new d.error("invalid", d, 'property', property)

        return properties[property.toLowerCase()]
    }
};