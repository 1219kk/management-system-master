<template>
  <div>
    <el-button type="primary">添加参数</el-button>
    <!-- :data="getroleList" -->
    <el-table border>
      <el-table-column type="expand" label="" />
      <el-table-column type="index" label="#" />
      <el-table-column prop="attr_name" label="分类名称" />
      <el-table-column prop="mobile" label="操作" />
    </el-table>
  </div>
</template>

<script>
// import { getAttributes } from '@/api/shop'
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped>
</style>
