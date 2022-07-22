<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <el-table border :data="getManageList">
          <el-table-column type="index" label="#" width="100px" />
          <el-table-column prop="authName" label="权限名称" width="265px" />
          <el-table-column prop="path" label="路径" width="261px" />
          <el-table-column prop="level" label="权限等级" width="500px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level == 0"> 等级一 </el-tag>
              <el-tag v-else-if="scope.row.level == 1" type="success">
                等级二
              </el-tag>
              <el-tag v-else type="warning">等级三</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getList, getMenus } from '@/api/manage'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        authName: '',
        path: '',
        level: ''

      },
      getManageList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getMenus()
    this.getList()
  },
  methods: {
    async getMenus () {
      const res = await getMenus()
      console.log(res)
      // this.getManageList = res.data.data.data
    },
    async getList () {
      const res = await getList(this.paramsObj)
      console.log(res)
      this.getManageList = res.data.data
      this.level = res.data.data.level
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
