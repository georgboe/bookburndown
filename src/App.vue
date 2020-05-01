<template>
  <div id="app">
    <div class="container w-full md:max-w-3xl mx-auto py-10">
      <div class="w-full px-4 md:px-6 text-gray-800 leading-normal">
        <Table :activities="activities" v-on:addActivity="addActivity" v-on:removeActivity="removeActivity" />
        <CompletionDate :class="{hidden: !showCompletionDate}" :date="completionDate"/>
        <Chart :class="{hidden: !showChart}" :chartData="chartData" :lastRealValue="lastRealValue" />
      </div>
    </div>
  </div>
</template>

<script>
import Table from './components/Table'
import Chart from './components/Chart'
import CompletionDate from './components/CompletionDate'

import {LinearRegression, Point} from './components/linear'
import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays'
import addMinutes from 'date-fns/addMinutes'

import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'


export default {
  name: 'app',
  components: {
    Table,
    Chart,
    CompletionDate
  },
  data: function() {
    return {
        activities: [],
        lastRealValue: null,
        chartData: null,
        completionDate: null
    }
  },
  mounted () {
    this.activities = this.$storage.get('activities') || []
    this.calculate()
  },
  methods: {
    calculate () {
      if (!this.showChart) {
        return
      }
      let first = parseISO(this.activities[0].date)
      let points = this.activities.map(x => new Point(differenceInDays(parseISO(x.date), first), 100 - x.value))
      let lastRealXValue = points[points.length - 1].x
      let trendLineValues = LinearRegression.linearRegressionLSE(points)
      let allData = points.concat(trendLineValues)
      first = addMinutes(first, -first.getTimezoneOffset())
      this.lastRealValue = addDays(first, lastRealXValue).getTime()
      if (trendLineValues.length > 0) {
        let daysToCompletion = trendLineValues[trendLineValues.length - 1].x
        this.completionDate = addDays(first, daysToCompletion)
      } else {
        this.completionDate = null
      }
      
      for (const point of allData) {
        point.x = addDays(first, point.x).getTime()
      }
      this.chartData = allData
    },
    addActivity(val) {
      this.activities.push(val)
      this.sortActivities()
      this.saveActivities()
      this.calculate()
    },
    removeActivity(date) {
      this.activities = filter(this.activities, x => x.date !== date)
      this.sortActivities()
      this.saveActivities()
      this.calculate()
    },
    saveActivities() {
      this.$storage.set('activities', this.activities)
    },
    sortActivities() {
      this.activities = sortBy(this.activities, x => x.date)
    }
  },
  computed: {
    showChart() {
      return this.activities.length >= 2
    },
    showCompletionDate () {
      return this.completionDate != null
    }
  }
}
</script>

