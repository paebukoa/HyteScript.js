String.prototype.escape = function () {
    return this
    .replaceAll("#", "%TAG%")
    .replaceAll("(", "%LP%")
    .replaceAll("|", "%BAR%")
    .replaceAll(")", "%RP%")
    .replaceAll("!", "%EXC%")
    .replaceAll(",", "%COMMA%")
    .replaceAll("{", "%LB%")
    .replaceAll("}", "%RB%")
    .replaceAll("-", "%MINUS%")
    .replaceAll("_", "%UNDERLINE%")
    .replaceAll("&", "%AND%")
    .replaceAll("?", "%INT%")
    .replaceAll("=", "%EQUAL%")
    .replaceAll(">", "%GREATER%")
    .replaceAll("<", "%SMALLER%")
};

String.prototype.unescape = function () {
    return this
    .replaceAll("%TAG%", "#")
    .replaceAll("%LP%", "(")
    .replaceAll("%BAR%", "|")
    .replaceAll("%RP%", ")")
    .replaceAll("%EXC%", "!")
    .replaceAll("%COMMA%", ",")
    .replaceAll("%LB%", "{")
    .replaceAll("%RB%", "}")
    .replaceAll("%MINUS%", "-")
    .replaceAll("%UNDERLINE%", "_")
    .replaceAll("%AND%", "&")
    .replaceAll("%INT%", "?")
    .replaceAll("%EQUAL%" , "=")
    .replaceAll("%GREATER%", ">")
    .replaceAll("%SMALLER%", "<")
    .replaceAll("%SLASH%", "/")
};

String.prototype.escapeBar = function () {
    return this  
    .replaceAll("|", "%_$_RDBAR_$_%");
};

String.prototype.unescapeBar = function () {
    return this
    .replaceAll("%_$_RDBAR_$_%", "|");
};

String.prototype.replaceLast = function (search, replacer) {
    let replacing = this.split(search);
    let final = replacing.pop();
    return replacing.join(search) + replacer + final;
};