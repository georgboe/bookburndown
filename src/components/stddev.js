import drop from 'lodash/drop'

export default class StandardDeviation {
    static stddev (arr) {
        const n = arr.length - 1;
        let valueDiffences = drop(arr.map((val, index) => {
            if (index == 0) return NaN
            const previous = arr[index-1]
            return Math.abs(val.y - previous.y) / (val.x - previous.x)
        }))
        const mean = valueDiffences.reduce((a,b) => a+b)/n;
        const s = Math.sqrt(valueDiffences.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/n);
        console.log("stddev", s)
        return s
    }
}