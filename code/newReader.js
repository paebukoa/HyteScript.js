class reader {
    constructor(data, code) {

        this.data = data;
        this.data.splits = [];
        this.data.vars = {};
        this.data.embeds = [];
        this.data.result = code;
        
        const lines = code.split("\n");

        lines.map((line, index) => {

            if(!line.includes(">")) return;

            const lineFuncs = line
            .split(">")
            .slice(1)
            .reverse();

            lineFuncs.map((f, i) => {

                const foundFuncs = data.funcs.filter(x => f.toLowerCase().startsWith(x.name.toLowerCase()));

                if (foundFuncs === []) return;

                this.data.inside = {
                    inside: '',
                    splits: ['']
                }

                if (f.toLowerCase().startsWith(`${foundFuncs[0].name.toLowerCase()}(`)) {
                    this.data.inside = {
                        inside: f.split(`${foundFuncs[0].name.toLowerCase()}(`).slice(1).join(`${foundFuncs[0].name.toLowerCase()}(`),
                        splits 
                    }
                }
                
                this.data.funcLine = index;
                this.data.func = foundFuncs[0].name;

                foundFuncs[0].run(this.data);

            });
        
        });
        
    }
}