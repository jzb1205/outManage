<template>
  <el-table
    ref="table"
    v-loading="tableConfig.loading"
    element-loading-text="Loading"
    :data="tableData"
    border
    fit
    highlight-current-row
    tooltip-effect="dark"
    style="width:100%"
    @row-click="getCurSelectData"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
    @select="select"
    @toggleRowSelection="toggleRowSelection(list)"
  >
    <el-table-column v-if="tableConfig.selection" type="selection" align="center" width="50"></el-table-column>
    <el-table-column v-if="tableConfig.index" label="序号" align="center" width="55" type="index"></el-table-column>
    <el-table-column
      v-for="(item,index) in tableLabel"
      :type="item.type ? item.type :''"
      :min-width="item.width ? item.width : ''"
      :key="index"
      :show-overflow-tooltip="!['inputNumber','input','select'].includes(item.type)"
      :align="item.align?item.align:'center'"
      :label="item.label"
      :prop="item.param"
    >
      <template slot-scope="scope">
        <!-- 功能按钮 -->
        <div v-if="item.action">
          <el-button
            class="colorBlue"
            v-for="(list,index) in item.options"
            :key="index"
            :type="list.type"
            @click="handleButton(list.methods,scope.row,scope.row)"
            size="mini"
          >{{list.label}}</el-button>
        </div>
        <!-- 可编辑 -->
        <div v-else-if="item.type==='inputNumber' && tableConfig.edit">
          <!-- min不能设置为1 -->
          <el-input-number
            @change="changeData(scope.row,'inputNumber')"
            @blur="changeData(scope.row,'inputNumber')"
            :max="scope.row[item.max]"
            :min="0"
            :precision ="item.precision"
            size="mini"
            v-model="scope.row[item.param]"
            clearable
            :disabled="tableConfig.disable"
          />
        </div>
        <div v-else-if="item.type==='input' && tableConfig.edit">
            <input type="text"  class="modifyInput"
            @change="changeData(scope.row,'input')"
            :disabled="tableConfig.disable"
            v-model="scope.row[item.param]">
        </div>
        <div v-else-if="item.type==='select' && tableConfig.edit">
          <el-select
            size="mini"
            filterable
            @change="changeData(scope.row,'select')"
            v-model="scope.row[item.param]"
            placeholder="请选择"
            clearable
            :disabled="tableConfig.disable"
          >
            <el-option
              v-for="obj in tableConfig.options"
              :key="obj.value"
              :label="obj.label"
              :value="obj.value"
            ></el-option>
          </el-select>
        </div>
        <div v-else>
          <span v-if="item.render">{{item.render(scope.row)}}</span>
          <span v-else>{{scope.row[item.param]}}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        tableLabel: {
            type: Array,
            default: () => {
                return []
            }
        },
        tableConfig: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data(){
        return {
            val:''
        }
    },
    watch: {
        tableData() {
            return this.tableData
        }
    },
    methods: {
        handleButton(methods, row) {
            // 按钮事件
            this.$emit("handleButton", { methods: methods, row: row })
        },
        handleSortChange(val) {
            // 排序
            this.$emit("handleSortChange", val)
        },
        // 复选框
        handleSelectionChange(val) {
            this.$emit("handleSelectionChange", val)
        },
        // 改变表格内容
        changeData(val, type) {
            this.$emit("changeData", val, type)
        },
        //点击当前行 获取行数据
        getCurSelectData(row) {
            this.$emit("getCurSelectData", row)
        },
        toggleRowSelection(list) {
            list.map(it => {
                setTimeout(() => {
                    this.$refs.table.toggleRowSelection(it, true)
                }, 100)
            })
        },
        select(list, row) {
            // console.log(list, row)
        }
    }
}
</script>
<style lang="scss" scoped>
// .gutter {
//   display: block !important;
//   width: 1px !important;
// }
// .el-table__row:nth-child(even) {
//   background-color: #e5f1fb;
// }
// .modifyInput{
//   width:78px;
//   height:28px;
//   border:1px solid #DCDFE6;
//   border-radius:3px;
//   text-align: center;
//   &:hover{
//     border:1px solid #409EFF;
//   }
// }
</style>