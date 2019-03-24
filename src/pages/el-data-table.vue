<template>
  <div class="wrapper">
    <el-data-table
      v-bind="tableConfig"
      :onEdit="onEdit"
      :onDelete="onDelete"
      :onNew="onNew"
    >
    </el-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import ElDataTable from 'el-data-table'
import ElFormRenderer from '@femessage/el-form-renderer'
import axios from 'axios'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Loading,
  Pagination,
  Table,
  TableColumn,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
//Vue.prototype.$axios = axios
export default {
  layout: 'blank',
  data() {
    return {
      tableConfig: {
        url: 'http://localhost:8080',
        columns: [
          {
            type: 'selection',
            selectable: (row, index) => row.status === 'normal'
          },
          {prop: 'code', label: '品牌编号'},
          {prop: 'name', label: '品牌名称'},
          {prop: 'alias', label: '品牌别名'},
          {
            prop: 'logoUrl',
            label: '品牌Logo',
            width: '150px'
          },
          {
            prop: 'status',
            label: '状态',
            formatter: row => (row.status === 'normal' ? '启用' : '禁用')
          }
        ],
        searchForm: [
          {
            $el: {placeholder: '请输入'},
            label: '品牌名称',
            $id: 'name',
            $type: 'input'
          }
        ],
        form: [
          {
            $type: 'input',
            $id: 'id',
            label: '商品id',
            rules: [
              {
                required: true,
                message: '请输入id',
                trigger: 'blur',
                transform: v => v && v.trim()
              }
            ],
            $el: {placeholder: '请输入'}
          },
          {
            $type: 'input',
            $id: 'alias',
            label: '别名',
            rules: [{required: true, message: '请输入别名', trigger: 'blur'}],
            $el: {
              placeholder: '请输入'
            }
          },
          {
            $type: 'input',
            $id: 'name',
            label: '名称',
            rules: [
              {
                required: true,
                message: '请输入名称',
                trigger: 'blur',
                transform: v => v && v.trim()
              }
            ],
            $el: {placeholder: '请输入'}
          },
          {
            $type: 'select',
            $id: 'status',
            label: '是否禁用',
            rules: [
              {required: true, message: '请选择是否禁用', trigger: 'blur'}
            ],
            $options: ['normal', 'forbidden'].map(f => ({label: f, value: f})),
            $el: {
              placeholder: '请选择'
            }
          }
        ]
      }
    }
  },
  methods: {
    onEdit(data, row) {
      return axios.put('http://localhost:8080', {...data, id: row.id})
    },
    onDelete: selected => {
      if (Array.isArray(selected)) {
        return axios.delete('http://localhost:8080', {
          data: selected.map(v => v.id)
        })
      } else {
        axios.delete('http://localhost:8080', {
          data: {
            id: row.id
          }
        })
      }
    }
  }
}
</script>

<style>
.wrapper {
  margin: 40px;
}
</style>
