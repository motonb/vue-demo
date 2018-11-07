<template>
  <Card>

    <p>采用 echarts</p>
    <p><a href="http://echarts.baidu.com/" target="_blank">官方文档</a></p>
    <Divider/>

    <div id="chart"></div>
    <div id="pie-chart" ref="pieChart"></div>

  </Card>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echarts',
  data () {
    return {
      pcd: [],

      option: {}, // 如果当前页面只有一个图表 可以用option命名 如果有多个 采用 图表内容-图表类型-option 命名： water-pie-option
      chart: {}, // 同上

      pieOption: {}, // 饼图参数
      pieChart: {}, // 饼图实例

      lineOption: {},
      lineChart: {}
    }
  },
  mounted () {
    this.initChart()

    // 用定时器模拟后端请求
    const timer = setTimeout(() => {
      this.getChartData()
    }, 1500)
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
  methods: {
    getChartData () {
      this.option.series[0].data = [10, 52, 200, 334, 390, 330, 220]
      this.chart.setOption(this.option)

      this.pieOption.series[0].data = [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
      this.pieChart.setOption(this.pieOption)
    },
    initChart () {
      let $this = this
      this.option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption(this.option)

      this.pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          formatter: function (name) {
            let value = ''
            $this.pieChart.getOption().series[0].data.forEach(e => {
              if (e.name === name) {
                value = e.value
              }
            })
            return name + value
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [

            ]
          }
        ]
      }
      this.pieChart = echarts.init(document.getElementById('pie-chart'))
      this.pieChart.setOption(this.pieOption)
    }
  }
}
</script>

<style scoped>
  #chart {
    width: 100%;
    height: 400px;
  }
  #pie-chart {
    width: 50%;
    height: 500px;
  }
</style>
