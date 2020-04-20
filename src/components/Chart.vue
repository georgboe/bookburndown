<template>
  <div ref="chart" class="flex p-2 lg:p-6 mt-10 rounded shadow-lg bg-white h-auto"></div>
</template>
<script>
import Highcharts from "highcharts";

export default {
  name: "Chart",
  props: ["chartData", "lastRealValue"],
  watch: {
    chartData(val) {
      Highcharts.chart(this.$refs.chart, {
        colors: ["#252f3f"],
        title: {
          text: "Burndown"
        },
        chart: {
          className: "font-sans",
          style: {
            fontFamily: "inherit"
          }
        },
        legend: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            month: "%e. %b",
            year: "%b"
          },
          title: {
            text: "Date"
          }
        },
        yAxis: {
          title: {
            text: "Percent"
          },
          min: 0,
          max: 100
        },

        series: [
          {
            name: "",
            marker: {
              enabled: false
            },
            data: val,
            zoneAxis: "x",
            zones: [
              {
                value: this.lastRealValue
              },
              {
                dashStyle: "dot"
              }
            ]
          }
        ],
        credits: {
          enabled: false
        }
      });
    }
  }
};
</script>