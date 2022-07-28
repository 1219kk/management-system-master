<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style:margin-top="10px">
        <el-button type="primary" class="rolBtn" @click="addHandel">
          添加角色
        </el-button>
        <el-table border :data="getRoleList">
          <el-table-column type="expand" label="#" />
          <el-table-column type="index" label="#" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="roleDesc" label="角色描述" />
          <el-table-column prop="describe" label="操作">
            <template v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editHandel(scope.row)"
              >
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
        <!-- 编辑增加 -->
        <el-dialog
          :visible.sync="addDialogRole"
          :title="type === 'add' ? '新增' : '编辑'"
        >
          <el-form
            v-if="addDialogRole"
            ref="myForm"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item
              prop="roleName"
              label="角色名称"
              :disabled="type != 'add'"
            >
              <el-input v-model="form.roleName" />
            </el-form-item>
            <el-form-item prop="roleDesc" label="角色描述">
              <el-input v-model="form.roleDesc" />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button type="primary" @click="onClick">确定</el-button>
            <el-button @click="addDialogRole = false">取消</el-button>
          </template>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoles, delRoles, editRoles, addRoles } from '@/api/role'
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
      getRoleList: [],
      form: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 7, message: '输入在2-7之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      addDialogRole: false,
      type: 'add'
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
    // 删除
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
    },
    // 增加
    addHandel (row) {
      this.type = 'add'
      this.form = {}
      this.addDialogRole = true
    },
    // 编辑
    editHandel (row) {
      this.type = 'edit'
      this.form = row
      this.addDialogRole = true
    },
    // 点击确定
    onClick () {
      this.$refs.myForm.validate(async valid => {
        if (!valid) return this.$message.error('表单数据非法')
        if (this.type === 'add') {
          await addRoles(this.form)
        } else {
          await editRoles(this.form)
        }
        // 重置
        this.getRoles()
        console.log('发送ajax')
        this.addDialogRole = false
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
