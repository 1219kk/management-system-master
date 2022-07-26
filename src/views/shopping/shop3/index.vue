<template>
  <el-card style="margin: 20px">
    <el-button type="primary" style="margin: 10px">添加分类</el-button>
    <el-table
      :data="addCategoriesTable"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="#" />
      <el-table-column prop="cat_name" label="分类名称" />
      <el-table-column prop="cat_pid" label="是否有效">
        <i class="el-icon-success" style="font-size: 5px; color: green" />
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1" type="success">
            二级
          </el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="paramsObj.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="paramsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { getCategories } from '@/api/shop'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        pagenum: 1,
        pagesize: 4
      },
      total: null,
      addCategoriesTable: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const res = await getCategories(this.paramsObj)
      console.log(res)
      this.addCategoriesTable = res.data.data.result
      this.total = res.data.data.total
    },
    handleSizeChange (pagesize) {
      console.log(pagesize)
      this.paramsObj.pagesize = pagesize
      this.addCategoriesTable()
    },
    handleCurrentChange (pagenum) {
      console.log(pagenum)
      this.paramsObj.pagenum = pagenum
      this.addCategoriesTable()
    }

  }
}

</script>

<style scoped lang='scss'>
::v-deep .el-icon-arrow-right:before {
  content: "\e6d9";
}

::v-deep .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e6d8" !important;
}

::v-deep .el-table__expand-icon--expanded {
  -webkit-transform: rotate(0deg);

  transform: rotate(0deg);
}
::v-deep .el-table__expand-icon {
  border: 1px solid #e7e7e7;
  padding: 1px;
}
</style>
