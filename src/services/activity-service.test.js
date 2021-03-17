// const activityService = require('./activity-service.js');
import ActivityService from './activity-service'
import {Point} from './linear'

test('gives correct answer', () => {
  var activities = [
    {"date":"2021-02-09","value":"5"},
    {"date":"2021-02-10","value":"10"},
    {"date":"2021-02-11","value":"15"},
    {"date":"2021-02-12","value":"30"}
  ]

  const result = ActivityService.calculate(activities)

  expect(result.allData).toStrictEqual([
    new Point(1612828800000, 95),
    new Point(1612915200000, 90),
    new Point(1613001600000, 85),
    new Point(1613088000000, 70),
    new Point(1613174400000, 62),
    new Point(1613260800000, 54),
    new Point(1613347200000, 46),
    new Point(1613433600000, 38),
    new Point(1613520000000, 30),
    new Point(1613606400000, 22),
    new Point(1613692800000, 14),
    new Point(1613779200000,  6),
    new Point(1613865600000, 0)
  ])

  expect(result.range).toStrictEqual([
    [
      1613088000000,
      70,
      70,
    ],
    [
      1613174400000,
      57.28595479208968,
      66.71404520791032,
    ],
    [
      1613260800000,
      44.571909584179366,
      63.428090415820634,
    ],
    [
      1613347200000,
      31.857864376269053,
      60.14213562373095,
    ],
    [
      1613433600000,
      19.143819168358736,
      56.85618083164127,
    ],
    [
      1613520000000,
      6.4297739604484185,
      53.570226039551585,
    ],
    [
      1613606400000,
      0,
      50.284271247461895,
    ],
    [
      1613692800000,
      0,
      46.99831645537221,
    ],
    [
      1613779200000,
      0,
      43.71236166328253,
    ],
    [
      1613865600000,
      0,
      42.426406871192846,
    ],
  ])

  expect(result.lastRealValue).toBe(1613088000000)
  expect(result.completionDate).toStrictEqual(new Date(Date.UTC(2021, 1, 21)))
});