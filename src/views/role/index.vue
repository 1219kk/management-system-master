<template>
  <div>
    <div class="isrole">
      <template>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="index" label="#" width="30" />
          <el-table-column prop="index" label="#" width="30" />
          <el-table-column prop="role" label="角色名称" width="180" />
          <el-table-column prop="describe" label="角色描述" width="180" />
          <el-table-column prop="describe" label="操作" width="180" />
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
