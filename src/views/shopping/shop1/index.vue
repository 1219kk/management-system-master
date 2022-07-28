<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <!-- 搜索框 button-->
        <el-form :inline="true">
          <el-form-item>
            <el-input clearable placeholder="请输入内容">
              <template slot="append">
                <el-button icon="el-icon-search" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <template>
              <el-button type="primary" @click="back">添加商品</el-button>
            </template>
          </el-form-item>
        </el-form>
        <!-- table -->
        <!-- getroleList  数据 -->
        <el-table :data="getgoodList" border class="tableall">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column prop="goods_name" label="商品名称" width="180" />
          <el-table-column
            prop="goods_number"
            label="商品价格(元)"
            width="180"
          />
          <el-table-column prop="goods_weight" label="商品重量" width="180" />
          <el-table-column
            prop="upd_time"
            label="创建时间"
            width="180"
            :formatter="formatDate"
          />
          <el-table-column prop="goods_id" label="操作">
            <template v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editHandle(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row.goods_id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="paramsObj.pagenum"
          :page-sizes="[20, 30, 40, 50]"
          :page-size="paramsObj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
    <el-dialog title="编辑" :visible.sync="editDialog">
      <el-form ref="myForm" :model="form" :rules="rules" label-width="110px">
        <el-form-item prop="goods_name" label="商品名称">
          <el-input v-model="form.goods_name" />
        </el-form-item>
        <el-form-item prop="goods_price" label="商品价格(元)">
          <el-input v-model="form.goods_price" />
        </el-form-item>
        <el-form-item prop="goods_weight" label="商品重量">
          <el-input v-model="form.goods_weight" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick">确定</el-button>
        <el-button @click="editDialog = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getGoods, delGoods, editGoods } from '@/api/shop'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        query: '',
        pagenum: 1, // 当前页
        pagesize: 4// 总页数
      },
      getgoodList: [],
      total: null,
      form: {
        id: '',
        goods_number: '',
        goods_name: '',
        goods_price: '',
        goods_weight: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '不能为空', trugger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '不能为空', trugger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '不能为空', trugger: 'blur' }

        ]
      },
      editDialog: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getGoods()
  },
  methods: {
    async getGoods () {
      const res = await getGoods(this.paramsObj)
      console.log(res)
      this.getgoodList = res.data.data.goods
      this.total = res.data.data.total
    },
    handleSizeChange (pagesize) {
      console.log(pagesize)
      this.paramsObj.pagesize = pagesize
      this.getGoods()
    },
    handleCurrentChange (pagenum) {
      console.log(pagenum)
      this.paramsObj.pagenum = pagenum
      this.getGoods()
    },
    // 删除
    del (goods_id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(this.id)
        await delGoods(goods_id)
        this.getGoods()
        // if (this.getgoodList.length === 1 && this.paramsObj.pagenum > 1) {
        //   this.paramsObj.pagenum--
        // }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 当前时间
    formatDate (row) {
      const date = new Date(row['upd_time'] * 1000)
      console.log(date)
      console.log(row)
      console.log(row['upd_time'])
      const Y = date.getFullYear() + '-'
      const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      // const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      // const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D
    },
    // 页面跳转
    back () {
      this.$router.push({ name: 'Steps' })
    },
    // 编辑
    editHandle (row) {
      this.form = row
      this.form.id = row.goods_id
      this.editDialog = true
      this.getGoods()
    },
    onClick () {
      this.$refs.myForm.validate(async valid => {
        if (!valid) return this.$message.error('表单数据非法')
        await editGoods(this.form)
        // 重置
        this.getGoods()
        console.log('发送ajax')
        this.editDialog = false
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.app-container {
  width: 100%;
}
</style>
