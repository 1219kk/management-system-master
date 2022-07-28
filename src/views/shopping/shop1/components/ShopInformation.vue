<template>
  <div>
    <el-form :model="form" :rules="rules">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="form.goods_name" />
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="form.goods_price" />
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model="form.goods_weight" />
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input v-model="form.goods_number" />
      </el-form-item>
      <div class="block">
        <el-form-item label="商品分类" prop="goods_cat">
          <el-cascader
            v-model="value"
            :options="options"
            :props="addprops"
            @change="handleChange"
          />
        </el-form-item>
      </div>
    </el-form>
    <!--
      级联选择器
     -->
  </div>
</template>

<script>
import { getCategories, addGoods } from '@/api/shop'
export default {
  filters: {},
  components: {},
  data () {
    return {
      activeName: 'first',
      value: [],
      options: [],
      children: null,
      addprops: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      dataObj: {
        cat_id: '',
        cat_name: '',
        cat_level: ''
      },
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { this.getCategories() },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    async getCategories () {
      const res = await getCategories(this.dataObj)
      console.log(res)
      this.options = res.data.data
    },
    async addGoods () {
      const res = await addGoods(this.form)
      console.log(res)
    }

  }
}
</script>

<style scoped lang='scss'>
</style>
