import minBy from "lodash/minBy"

class LinearRegression {

    static linearRegressionLSE(series) {

        let q = series.length

        if (q === 0 || minBy(series, 'y').y <= 0) {
            return []
        }

        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;

        /*
         * We'll use those variables for faster read/write access.
         */
        var x = 0;
        var y = 0;
        var values_length = series.length;

        /*
         * Nothing to do.
         */
        if (values_length === 0) {
            return [];
        }


        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (var v = 0; v < values_length; v++) {
            x = series[v].x;
            y = series[v].y;
            sum_x += x;
            sum_y += y;
            sum_xx += x * x;
            sum_xy += x * y;
            count++;
        }

        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
        var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
        var b = (sum_y / count) - (m * sum_x) / count;

        let r = []

        let startValue = Math.min(b, series[series.length - 1].y)
        console.log(`${m}x+${startValue}`)

        let val = startValue
        let pointDay = series[series.length - 1].x + 1
        let counter = 0
        while(val > 0) {
            val += m
            r.push(new Point(pointDay, Math.max(val, 0)))
            pointDay++
            counter++
            if (counter > 1000) {
                console.log('Yeah, something went wrong')
                break
            }
        }

        return r
    }

}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


export { LinearRegression, Point }