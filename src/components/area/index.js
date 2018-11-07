import alSelector from './al-selector.vue'
import alCascader from './al-cascader.vue'

const iviewArea = {
    alSelector,
    alCascader
}

const install = function (Vue, opts = {}) {
    Vue.component(alSelector.name, alSelector)
    Vue.component(alCascader.name, alCascader)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default Object.assign(iviewArea, {install})
