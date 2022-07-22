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
        <el-table border class="tableall">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column prop="goods_name" label="订单编号" width="180" />
          <el-table-column
            prop="goods_number"
            label="订单价格(元)"
            width="180"
          />
          <el-table-column prop="goods_weight" label="是否付款" width="180" />
          <el-table-column prop="upd_time" label="是否发货" width="180" />
          <el-table-column prop="upd_time" label="下单时间" width="180" />
          <el-table-column prop="operation" label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      }
    }
  },
  computed: {},
  watch: {},
  created () { this.getMyList() },
  methods: {
    async getMyList () {
      const res = await getMyList(this.dataObj)
      console.log(res)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
