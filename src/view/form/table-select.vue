<template>
  <Table :columns="columns" :data="tableData"></Table>

</template>

<script>
  export default {
    name: "table-select",
    data () {
      return {
        columns: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address',
            align: 'center',
            render: (h, params) => {
              return h('Select', {
                  props:{
                    value: this.tableData[params.index].selectValue,
                  },
                  on: {
                    'on-change':(event) => {
                      this.tableData[params.index].selectValue= event;
                    }
                  },
                },
                this.options.map(function(option){
                  return h('Option', {
                    props: {value: option.value}
                  }, option.name);
                })
              );
            },
          }
        ],
        options: [{name:'option1',value:1},{name:'option2',value:2}],
        tableData: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            selectValue: 1,
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
