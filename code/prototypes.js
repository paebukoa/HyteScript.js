class Functions {
    toEscape(text) {
        return text.replaceAll(">", "%GREATER%")
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
    }

    toUnescape(text) {
        return text.replaceAll("%GREATER%", ">")
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
}

module.exports = { Functions };