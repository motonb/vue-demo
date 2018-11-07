<template>
  <div>
    <Card>
      <page-table :get-url="url" :columns="columns"></page-table>
    </Card>
  </div>
</template>

<script>
  import pageTable from '@/components/page-table'
  export default {
    components: {
      pageTable
    },
    data () {
      return {
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 75,
            align: 'center'
          },
          {
            title: '服务名称',
            key: 'serverName',
            align: 'center'
          },
          {
            title: '账户名',
            key: 'account',
            align: 'center'
          },
          {
            title: 'IP号',
            key: 'ip',
            align: 'center'
          },
          {
            title: '端口',
            key: 'port',
            align: 'center'
          },
          {
            title: '协议',
            key: 'protocol',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
          }
        ],
        url: this.$path.getAccessConfigList
      }
    }
  }
</script>

<style scoped>

</style>
