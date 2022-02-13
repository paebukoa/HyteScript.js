module.exports = {
    escape(text) {
        return text
        .replaceAll(">", "%GREATER%")
        .replaceAll("(", "%LP%")
        .replaceAll(")", "%RP%")
        .replaceAll("=", "%EQUAL%")
        .replaceAll("<", "%LESS%")
        .replaceAll("/", "%BS%")
        .replaceAll(",", "%COMMA%")
        .replaceAll("&&", "%AND%")
        .replaceAll("||", "%OR%")
        .replaceAll(":", "%COLON%")
        .replaceAll(";", "%SEMI%")
        .replaceAll("$", "%CHAR%");
    },

    unescape(text) {
        return text
        .replaceAll("%GREATER%", ">")
        .replaceAll("%LP%", "(")
        .replaceAll("%RP%", ")")
        .replaceAll("%EQUAL%", "=")
        .replaceAll("%LESS%", "<")
        .replaceAll("%BS%", "/")
        .replaceAll("%COMMA%", ",")
        .replaceAll("%AND%", "&&")
        .replaceAll("%OR%", "||")
        .replaceAll("%COLON%", ":")
        .replaceAll("%SEMI%", ";")
        .replaceAll("%CHAR%", "$");
    }
};