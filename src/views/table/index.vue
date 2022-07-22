<template>
  <div class="table-all">
    <div class="istable">
      <!-- 搜索框 button-->
      <el-form :inline="true" class="table-form">
        <el-form-item>
          <el-input
            v-model="paramsObj.query"
            clearable
            placeholder="请输入内容"
            class="form-width"
            @keyup.enter.native="getTableList"
          >
            <template slot="append">
              <el-button icon="el-icon-search" @click="getTableList" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <template>
            <el-button type="primary" @click="handleAdd"> 添加用户 </el-button>
          </template>
        </el-form-item>
      </el-form>
      <!-- table -->
      <!-- getroleList  数据 -->
      <el-table :data="getroleList" border class="tableall">
        <el-table-column type="index" width="50" label="#" />
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="mobile" label="电话" width="180" />
        <el-table-column prop="role_name" label="角色" width="180" />
        <el-table-column prop="type" label="状态" width="180">
          <template slot-scope="{ row }">
            <!-- active-value  打开
          inactive-value 关闭-->
            <el-switch
              v-model="row.mg_state"
              :active-value="true"
              :inactive-value="false"
              @change="changeState(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            />
            <el-button type="danger" icon="el-icon-delete" />
            <el-button type="warning" icon="el-icon-setting" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end">
        <el-pagination
          :current-page="paramsObj.pagenum"
          :page-sizes="[2, 3, 4, 5, 6]"
          :page-size="paramsObj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <!-- 新增修改 -->
      <el-dialog
        :title="type === 'add' ? '新增' : '编辑'"
        :visible.sync="addDialogVisible"
      >
        <el-form
          v-if="addDialogVisible"
          ref="myForm"
          label-width="80px"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" :disabled="type != 'add'" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="onClick">确定</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// queryUsers
import { getTableList, addUsers, editUsers, editType } from '@/api/user'
export default {
  filters: {},
  components: {},
  data () {
    return {
      // 分页
      paramsObj: {
        pagenum: 1, // 当前页码
        pagesize: 4, // 每页显示条数
        query: '' // 查询条件
      },
      total: null,
      getroleList: [],
      // 用户信息
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      type: 'add',
      // 规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '用户名在2-7之间', trigger: 'blur' }
        ],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        },
        { min: 2, max: 7, message: '密码在2-7之间', trigger: 'blur' }],

        email: [{
          required: true, message: '邮箱不能为空', trigger: 'blur'
        }],
        mobile: [{
          required: true, message: '手机号不能为空', trigger: 'blur'
        }]
      },
      addDialogVisible: false,
      searchUsers: '',

      uId: '',
      state: true

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getTableList()
    // this.searchUser()
    // this.editMyType()
  },
  methods: {
    changeState (row) {
      this.$confirm('是否处理权限?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 点击确认【confirmButtonText】
        .then(() => {
          editType({
            id: row.id,
            type: row.mg_state
          }).then(res => {
            const { meta } = res.data
            const { msg, status } = meta
            // let status = res.data.meta.status
            // let msg = res.data.meta.msg
            if (status === 200) {
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
              row.mg_state = !row.mg_state
            }
          })
        })
        // 点击取消【cancelButtonText】
        .catch(() => {
          row.mg_state = !row.mg_state
        })
    },
    // async editMyType () {
    //   const res = await editType(this.dataType)
    //   console.log(res)
    // },

    async getTableList () {
      const res = await getTableList(this.paramsObj)
      console.log(res)
      this.getroleList = res.data.data.users
      this.total = res.data.data.total
    },
    // pageSize 改变时会触发	每页条数
    handleSizeChange (pagesize) {
      // console.log(`每页 ${val} 条`)
      console.log(pagesize)
      this.paramsObj.pagesize = pagesize
      this.getTableList()
    },
    // currentPage 改变时会触发	当前页
    handleCurrentChange (pagenum) {
      // console.log(`当前页: ${val}`)
      console.log(pagenum)
      this.paramsObj.pagenum = pagenum
      this.getTableList()
    },
    // 添加数据 二次校验
    onClick () {
      this.$refs.myForm.validate(async valid => {
        if (!valid) return this.$message.error('表单数据非法')
        if (this.type === 'add') {
          await addUsers(this.form)
        } else {
          await editUsers(this.form)
        }
        // 重置
        this.getTableList()
        console.log('发送ajax')
        this.addDialogVisible = false
      })
    },
    // 对该表单项进行重置，将其值重置为初始值并移除校验结果
    // resetFields 重置所有
    // 编辑
    handleEdit (index, row) {
      this.type = 'edit'
      this.form = row
      this.addDialogVisible = true
    },
    handleAdd () {
      this.form = {}
      this.type = 'add'
      this.addDialogVisible = true
    }

  }
}
</script>

<style scoped lang='scss'>
.form-width {
  width: 400px;
}

::v-deep.table-all {
  width: 1277.2px;
  height: 297;
  margin: 20px;
  background-color: #ffffff;
}
.tableall {
  width: 1000px;
}
.istable {
  padding: 30px;
}
</style>
