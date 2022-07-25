<template>
  <div>
    <div>
      <el-card style="margin: 20px">
        <el-form style="width: 500px">
          <el-form-item>
            <el-input clearable placeholder="请输入内容">
              <template slot="append">
                <el-button icon="el-icon-search" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item />
        </el-form>
        <el-table border class="tableall" :data="getMylist">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column prop="order_number" label="订单编号" width="180" />
          <el-table-column
            prop="order_price"
            label="订单价格(元)"
            width="180"
          />
          <el-table-column prop="order_pay" label="是否付款" width="180">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.order_pay == 0"
                type="danger"
                effect="dark"
              >
                未支付
              </el-tag>
              <el-tag v-else type="success" effect="dark"> 已支付 </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" width="180" />
          <el-table-column
            prop="update_time"
            label="下单时间"
            width="180"
            :formatter="formatDate"
          />
          <el-table-column prop="operation" label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="dataObj.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="dataObj.pagesize"
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
import { getMyList } from '@/api/list'
export default {
  filters: {},
  components: {},
  data () {
    return {
      dataObj: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      total: null,
      getMylist: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getMyList()
  },
  methods: {
    async getMyList () {
      const res = await getMyList(this.dataObj)
      console.log(res)
      this.getMylist = res.data.data.goods
      this.total = res.data.data.total
    },
    // 当前时间
    formatDate (row) {
      const date = new Date(row['update_time'] * 1000)
      console.log(date)
      console.log(row)
      console.log(row['update_time'])
      const Y = date.getFullYear() + '-'
      const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      // const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      // const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D
    },
    handleSizeChange (pagesize) {
      console.log(pagesize)
      this.dataObj.pagesize = pagesize
      this.getMyList()
    },
    handleCurrentChange (pagenum) {
      console.log(pagenum)
      this.dataObj.pagenum = pagenum
      this.getMyList()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
