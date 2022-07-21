<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <el-button type="primary" class="rolBtn"> 添加角色</el-button>
        <el-table border :data="getRoleList">
          <el-table-column type="expand" label="#" width="100px" />
          <el-table-column type="index" label="#" width="100px" />
          <el-table-column prop="roleName" label="角色名称" width="265px" />
          <el-table-column prop="roleDesc" label="角色描述" width="261px" />
          <el-table-column prop="describe" label="操作" width="500px">
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
import { getRoles } from '@/api/role'
export default {
  filters: {},
  components: {
  },
  data () {
    return {
      paramsObj: {
        roleName: '',
        roleDesc: ''
      },
      getRoleList: []
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.getRoles()
  },
  methods: {
    async getRoles () {
      const res = await getRoles(this.paramsObj)
      console.log(res)
      this.getRoleList = res.data.data
    }
  }
}
</script>

<style scoped lang='scss'>
.rolBtn {
  margin-bottom: 15px;
}
</style>
