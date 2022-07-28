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
            :props="addprops"
            expand-trigger="hover"
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
import { getCategories } from '@/api/shop'
export default {
  filters: {},
  components: { DynamicParameter, StaticProperties },
  data () {
    return {
      activeName: 'first',
      value: [],
      options: [],
      children: null,
      addprops: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      dataObj: {
        type: '',
        pagenum: 1,
        pagesize: ''
      }

    }
  },
  computed: {},
  watch: {},
  created () { this.getCategories() },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    async getCategories () {
      const res = await getCategories(this.dataObj)
      console.log(res)
      this.options = res.data.data
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
