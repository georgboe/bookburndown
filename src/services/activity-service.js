import { LinearRegression, Point } from './linear'
import StandardDeviation from './stddev'
import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays'
import addMinutes from 'date-fns/addMinutes'

export default class ActivityService {

  static calculate(activities) {
    
    const startDate = this.getStartDate(activities)
    const points = this.getActualEvents(startDate, activities)
    const trendLineValues = this.getTrendLineValues(points)
    const stdDevRange = this.getStdDevRange(startDate, points, trendLineValues)
    
    let allData = [].concat(points).concat(trendLineValues)
    let completionDate = this.getCompletionDate(startDate, trendLineValues)
    const lastRealValue = this.getLastRealValue(startDate, points)

    const allDataMapped = allData.map(point => new Point(addDays(startDate, point.x).getTime(), point.y))

    return {
      allData: allDataMapped,
      range: stdDevRange,
      lastRealValue: lastRealValue,
      completionDate: completionDate
    }
  }

  static getStartDate(activities) {
    const startDate = parseISO(activities[0].date)
    return addMinutes(startDate, -startDate.getTimezoneOffset())
  }

  static getActualEvents(startDate, activities) {
    let points = activities.map(x => {
      let date = parseISO(x.date)
      date = addMinutes(date, -date.getTimezoneOffset())
      return new Point(differenceInDays(date , startDate), 100 - x.value)
    })
    return points
  }

  static getTrendLineValues(points) {
    let trendLineValues = LinearRegression.linearRegressionLSE(points)
    return trendLineValues
  }

  static getStdDevRange(startDate, points, trendLineValues) {
    let stddev = StandardDeviation.stddev(points)
    let range = trendLineValues.map((x, i) => [x.x, Math.max(x.y - (stddev * (i + 1)), 0), Math.min(points[points.length - 1].y, x.y + (stddev * (i + 1)))])

    const lrv = points[points.length - 1]
    range.unshift([lrv.x, lrv.y, lrv.y])
    
    for (const arr of range) {
      arr[0] = addDays(startDate, arr[0]).getTime()
    }
    
    return range
  }

  static getCompletionDate(startDate, trendLineValues) {
    if (trendLineValues.length > 0) {
      let daysToCompletion = trendLineValues[trendLineValues.length - 1].x
      return addDays(startDate, daysToCompletion)
    }
    return null
  }

  static getLastRealValue(startDate, points) {
    const lrv = points[points.length - 1]
    return addDays(startDate, lrv.x).getTime()
  }
}