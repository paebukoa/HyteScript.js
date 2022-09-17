const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property = "id", userId = d.author?.id) => {
        const userData = d.client.users.cache.get(userId);

        if (property === "exists") return userData ? true : false;

        if (!userData) return new d.error("invalid", d, "user ID", userId);

        return getProperty('user', userData, property)
    }
}

