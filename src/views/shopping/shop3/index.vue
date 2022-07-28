<template>
  <el-card style="margin: 20px">
    <el-button type="primary" style="margin: 10px" @click="handleAdd">
      添加分类
    </el-button>
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
    <!-- 添加分类 -->
    <el-dialog :visible.sync="addCategorie" title="添加">
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name" />
        </el-form-item>
        <!-- <el-form-item label="是否有效" prop="cat_pid">
          <el-input v-model="form.cat_pid" />
        </el-form-item> -->
        <el-form-item label="排序" prop="cat_level">
          <el-input v-model="form.cat_level" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick">确定</el-button>
        <el-button @click="addCategorie = false">取消</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { getCategories, addCategories } from '@/api/shop'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        type: null,
        pagenum: 1,
        pagesize: 4
      },
      total: null,
      addCategoriesTable: [],
      addCategorie: false,
      form: {
        cat_name: '',
        // cat_pid: '',
        cat_level: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '请填写分类名称', tirgger: 'blur' }
        ],
        // cat_pid: [
        //   { required: true, message: '请填写是否有效', tirgger: 'blur' }
        // ],
        cat_level: [
          { required: true, message: '请填写排序情况', tirgger: 'blur' },
          { min: 1, max: 1, message: '请填写0,1,2描述情况', tirgger: 'blur' }
        ]

      }

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
      this.getCategories()
    },
    handleCurrentChange (pagenum) {
      console.log(pagenum)
      this.paramsObj.pagenum = pagenum
      this.getCategories()
    },
    onClick () {
      this.$refs.myForm.validate(async valid => {
        if (!valid) return this.$message.error('表单数据非法')
        await addCategories(this.form)
        // 重置
        this.getCategories()
        this.addCategorie = false
      })
    },
    handleAdd () {
      this.form = {}
      this.addCategorie = true
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
