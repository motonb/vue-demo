<template>
  <Menu ref="menu" :active-name="activeName"  mode="horizontal" @on-select="handleSelect" >
    <div class="layout-nav">
      <template v-for="item in menuList">
        <menu-item :name="item.name" :key="`menu-${item.name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </div>
  </Menu>
</template>

<script>
  import mixin from './../../side-menu/mixin'

  export default {
    name: 'header-menu',
    mixins: [ mixin ],
    computed: {
      menuList () {
        return this.$store.getters.menuList
      }
    },
    methods: {
      handleSelect (name) {
        this.$emit('on-select', name)
        this.menuList.forEach (e => {
          if(e.name === name){
            this.$router.push(
              {
                name: e.children[0].name
              }
            )
          }
        })

      },
      getOpenedNamesByActiveName (name) {
        return this.$route.matched.map(item => item.name).filter(item => item !== name)
      }
    },
    props: {
      activeName: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './header-menu.less';
</style>
