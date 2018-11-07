<template>
  <div>
    <Table :loading="loading" :columns="columns" :data="rows"></Table>
    <div class="page-bar">
      <Page
        :current="page"
        :total="count"
        :page-size="pageSize"
        show-elevator
        show-sizer
        show-total
        @on-change="changePage"
        @on-page-size-change="changeSize">
      </Page>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/axios'
export default {
  name: "page-table",
  props: {
    columns: {
      required: true,
      type: Array
    },
    getMethod: {
      required: true,
      type: Function
    },
    getUrl: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      rows: [], // 获取的list数据
      count: 0, // 数据总条数
      page: 1, // 当前页数,
      pageSize: 10 // 每页显示条数
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      let params = {}
      params.pageIndex = this.page
      params.pageSize = this.pageSize
      axios.request({
        url: this.getUrl,
        params,
        method: 'get'
      }).then(res => {
        this.loading = false
        let data = res.data
        console.log('page-table', data)
        if (data.message === 'success') {
          this.rows = data.data.list
          this.count = data.data.count
        }
      })
    },
    changePage (page) {
      this.page = page
      this.getData()
    },
    changeSize (size)
    {
      this.page = 1
      this.pageSize = size
      this.getData()
    }
  }
}
</script>

<style scoped>
.page-bar {
  text-align: right;
}
</style>
