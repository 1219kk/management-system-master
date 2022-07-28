<template>
  <div>
    <el-card style="margin: 20px">
      <el-alert title="添加商品信息" center :closable="false" show-icon />
      <el-steps
        :active="activeIndex - 0"
        finish-status="success"
        align-center
        style="margin: 10px 0"
      >
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>

      <el-tabs
        v-model="activeIndex"
        :tab-position="tabPosition"
        tabPosition="left"
      >
        <el-tab-pane label="基本信息">
          <ShopInformation />
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <ShopParameters />
        </el-tab-pane>
        <el-tab-pane label="商品属性"><ShopAttributes /></el-tab-pane>
        <el-tab-pane label="商品图片"><ShopImage /></el-tab-pane>
        <el-tab-pane label="商品内容"><ShopContent /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShopInformation from './ShopInformation.vue'
import ShopParameters from './ShopParameters.vue'
import ShopAttributes from './ShopAttributes.vue'
import ShopImage from './ShopImage.vue'
import ShopContent from './ShopContent.vue'
export default {
  filters: {},
  components: { ShopInformation, ShopParameters, ShopAttributes, ShopImage, ShopContent },
  data () {
    return {
      activeIndex: '0',
      tabPosition: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {

  }
}
</script>

<style scoped lang='scss'>
</style>
