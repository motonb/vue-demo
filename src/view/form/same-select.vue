<template>
  <Card>

    <Form :label-width="80" style="width: 300px">

      <FormItem label="selectOne">
        <Select v-model="selectOne" style="width:200px">
          <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="selectTwo">
        <Select v-model="selectTwo" style="width:200px">
          <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="selectThree">
        <Select v-model="selectThree" style="width:200px">
          <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit()">Submit</Button>
      </FormItem>
    </Form>

  </Card>

</template>

<script>
  import {isArrRepeat} from '@/libs/tools'
  export default {
    name: "same-select",
    data () {
      return {
        selectOne:null,
        selectTwo:null,
        selectThree:null,
        list:[
          {name:1,value:1},
          {name:2,value:2},
          {name:3,value:3},
          {name:4,value:4},
        ],
        selectCheck:[]
      }
    },
    methods: {
      handleSubmit () {
        this.selectCheck = []
        this.selectCheck.push(this.selectOne)
        this.selectCheck.push(this.selectTwo)
        this.selectCheck.push(this.selectThree)

        if (isArrRepeat(this.selectCheck)){
          this.$Message.error('chongfu!');
        }else {
          this.$Message.success('zhengque!');
        }
      }
    }
  }
</script>

<style scoped>

</style>
