module.exports = {
    escape(text) {
        return text
        .replaceAll("+", "%PLUS%")
        .replaceAll("(", "%LP%")
        .replaceAll(")", "%RP%")
        .replaceAll("/", "%SLASH%")
        .replaceAll(",", "%COMMA%")
        .replaceAll("<", "%LESS%")
        .replaceAll(">", "%GREATER%")
        .replaceAll("=", "%EQUAL%")
        .replaceAll("&&", "%AND%")
        .replaceAll("||", "%OR%");
    },

    unescape(text) {
        return text
        .replaceAll("%PLUS%", "+")
        .replaceAll("%LP%", "(")
        .replaceAll("%RP%", ")")
        .replaceAll("%SLASH%", "/")
        .replaceAll("%COMMA%", ",")
        .replaceAll("%LESS%", "<")
        .replaceAll("%GREATER%", ">")
        .replaceAll("%EQUAL%", "=")
        .replaceAll("%AND%", "&&")
        .replaceAll("%OR%", "||");
    }
};