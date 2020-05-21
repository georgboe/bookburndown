<template>
  <div ref="chart" class="flex p-2 lg:p-6 mt-10 rounded shadow-lg bg-white h-auto"></div>
</template>
<script>
import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more'

HighchartsMore(Highcharts)



export default {
  name: "Chart",
  props: ["chartData", "range", "lastRealValue",],
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
          }, {
            name: 'Range',
            data: this.range,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: "#252f3f",
            fillOpacity: 0.2,
            zIndex: 0,
            marker: {
                enabled: false
            }
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