module.exports = class Time {
    static replaceLast;

    static parseTime(time) {
        let data = {
            miliseconds: 0,
            type: 'number',
            error: false,
            number: '',
            numType: '',
            first: true
        }

        let numTypes = {
            ms: 1,
            s: 1000,
            sec: 1000,
            secs: 1000,
            m: 60000,
            min: 60000,
            mins: 60000,
            h: 3600000,
            hour: 3600000,
            hours: 3600000,
            d: 86400000,
            day: 86400000,
            days: 86400000,
            w: 604800000,
            week: 604800000,
            weeks: 604800000,
            mo: 2628000000,
            mon: 2628000000,
            mons: 2628000000,
            y: 31536000000,
            year: 31536000000,
            years: 31536000000
        }

        let types = {
            number(n) {
                if (isNumber(n)) data.number += n
                else if (data.first) data.error = true
                else {
                    data.type = 'numType'
                    data.numType += n
                }
            },

            numType(n) {
                if (isNumber(n) || [' ', '\n'].includes(n)) {
                    data.type = 'number'
                    let multiplier = numTypes[data.numType]
                    if (!multiplier) data.error = true
                    else {
                        data.miliseconds += Number(data.number) * multiplier
                        data.number = ''
                        data.numType = ''
                    }

                    if (isNumber(n)) data.number += n
                } else data.numType += n
            }
        }

        let chars = [...time]

        for (let char of chars) {
            let parse = types[data.type]
            parse(char)

            if (data.error) return {error: true}
            
            data.first = false
        }

        if (data.type == 'number' && data.number !== '') data.error = true
        if (data.type = 'numType') {
            data.type = 'number'
            let multiplier = numTypes[data.numType]
            if (!multiplier) data.error = true
            else {
                data.miliseconds += Number(data.number) * multiplier
            }
        }

        return {
            ms: data.miliseconds,
            error: data.error
        };
    }

    static parseMs(ms, allowMs = false) {
        let types = {
            years: 31536000000,
            months: 2628000000,
            weeks: 604800000,
            days: 86400000,
            hours: 3600000,
            minutes: 60000,
            seconds: 1000,
            ms: 1,
        }

        let obj = {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            ms: 0
        }

        for (let type in types) {
            if (Object.prototype.hasOwnProperty.call(types, type)) {
                let typeMs = types[type]

                let result = ms / typeMs

                if (result >= 1) {
                    obj[type] = Number(result.toString().split('.')[0])
                    ms = ms - (typeMs * Number(result.toString().split('.')[0]))
                }
            }
        }

        let resultFull = []
        let resultSum = []

        let sumProps = {
            years: 'y',
            months: 'mo',
            weeks: 'w',
            days: 'd',
            hours: 'h',
            minutes: 'm',
            seconds: 's',
            ms: 'ms'
        }

        for (const prop in obj) {
            if (Object.hasOwnProperty.call(obj, prop) && (prop !== 'ms' || allowMs)) {
                const value = obj[prop]

                if (value !== 0) {
                    resultFull.push(`${value} ${value === 1 && prop !== 'ms' ? this.replaceLast(prop, 's', '') : prop}`)
                    resultSum.push(`${value}${sumProps[prop]}`)
                }
            }
        }

        obj.full = this.replaceLast(resultFull.join(', '), ',', ' and')
        obj.sum = this.replaceLast(resultSum.join(', '), ',', ' and')

        if (obj.full === '') obj.full = `${obj.ms}ms`
        if (obj.sum === '') obj.sum = `${obj.ms}ms`

        return obj;
    }
}

function isNumber(num) {
    return !isNaN(num)
}