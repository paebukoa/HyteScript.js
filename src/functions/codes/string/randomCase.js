module.exports = async d => {
    let [string] = d.func.params.splits;

    if (string == undefined) return;

    let chars = [...string];
    let cases = [
        char => {return char.toLowerCase()}, 
        char => {return char.toUpperCase()}
    ];

    return chars.map(char => {
        let randomIndex = Math.round(Math.random() * 1);

        let caser = cases[randomIndex];
        
        return caser(char);
    }).join("");
};