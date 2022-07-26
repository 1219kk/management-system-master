<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <el-button type="primary" class="rolBtn"> 添加角色</el-button>
        <el-table border :data="getRoleList">
          <el-table-column type="expand" label="#" />
          <el-table-column type="index" label="#" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="roleDesc" label="角色描述" />
          <el-table-column prop="describe" label="操作">
            <template v-slot="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini">
                编辑
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row.id)"
              >
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
import { getRoles, delRoles } from '@/api/role'
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
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delRoles(id)
        this.getRoles()
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
    }
  }
}
</script>

<style scoped lang='scss'>
.rolBtn {
  margin-bottom: 15px;
}
</style>
