<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-alert
          title="注意：只允许为第三级分类设置相关参数！"
          type="warning"
          show-icon
          :closable="false"
          style="padding: 10px; margin: 10px"
        />
        <!-- 级联选择器 -->
        <div class="block">
          <span class="demonstration" style="padding: 10px">选择商品分类:</span>
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
          />
        </div>
        <template>
          <el-tabs v-model="activeName">
            <el-tab-pane label="动态参数" name="first">
              <DynamicParameter />
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="second">
              <StaticProperties />
              <el-tab-pane />
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import DynamicParameter from './components/DynamicParameter.vue'
import StaticProperties from './components/StaticProperties.vue'
export default {
  filters: {},
  components: { DynamicParameter, StaticProperties },
  data () {
    return {
      activeName: 'first',
      value: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }]
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
