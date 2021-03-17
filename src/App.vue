<template>
  <div id="app">
    <div class="container w-full md:max-w-3xl mx-auto py-10">
      <div class="w-full px-4 md:px-6 text-gray-800 leading-normal">
        <Table :activities="activities" v-on:addActivity="addActivity" v-on:removeActivity="removeActivity" />
        <CompletionDate :class="{hidden: !showCompletionDate}" :date="completionDate"/>
        <Chart :class="{hidden: !showChart}" :chartData="chartData" :lastRealValue="lastRealValue" :range="range" />
      </div>
    </div>
  </div>
</template>

<script>
import Table from './components/Table'
import Chart from './components/Chart'
import CompletionDate from './components/CompletionDate'
import ActivityService from './services/activity-service'

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
        range: null,
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
      const calculationResult = ActivityService.calculate(this.activities)
      
      this.chartData = calculationResult.allData
      this.range = calculationResult.range
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

