<template>
  <el-card style="margin: 20px">
    <el-button type="primary" style="margin: 10px">添加分类</el-button>
    <el-table
      :data="tableData1"
      style="width: 100%; margin: 10px"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      tableData1: [{
        id: 1,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }]
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 11,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 21,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              hasChildren: true
            }]
          }, {
            id: 12,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 13,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 100)
    }
  }
}

</script>

<style scoped lang='scss'>
</style>
