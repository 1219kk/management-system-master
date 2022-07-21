<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <el-table border :data="getManageList">
          <el-table-column type="index" label="#" width="100px" />
          <el-table-column prop="authName" label="权限名称" width="265px" />
          <el-table-column prop="path" label="路径" width="261px" />
          <el-table-column prop="describe" label="权限等级" width="500px">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini">
                编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">
                删除
              </el-button>
              <el-button type="warning" icon="el-icon-star-off" size="mini">
                分配权限
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getMenus } from '@/api/manage'
export default {
  filters: {},
  components: {},
  data () {
    return {
      authName: '',
      getManageList: []
    }
  },
  computed: {},
  watch: {},
  created () { this.getMenus() },
  methods: {
    async getMenus () {
      const res = await getMenus(this.authName)
      console.log(res)
      this.getManageList = res.data.data.data
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
