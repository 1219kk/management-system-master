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
              <el-button type="primary">添加商品</el-button>
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
          <el-table-column prop="operation" label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini">
                编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">
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
  </div>
</template>
<script>
import { getGoods } from '@/api/shop'
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
      total: null
    }
  },
  computed: {},
  watch: {},
  created () { this.getGoods() },
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
    }
  }

}
</script>

<style scoped lang='scss'>
.app-container {
  width: 100%;
}
</style>
