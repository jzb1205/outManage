
<template>
  <div class="app-container">
    <com-search :searchData="searchData">
      <el-button @click="getList">查询</el-button>
      <el-button @click="getList">新增</el-button>
    </com-search>
    <!-- 列表 -->
    <com-table
      :tableConfig="tableConfig"
      :table-data="tableData"
      :table-label="tableLabel"
      @handleButton="handleButton"
      @handleSelectionChange="handleSelectionChange"
    />
    <com-pagination :rows="pagination.rows" :page="pagination.page" :total="pagination.total" @getList="getList"></com-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pagination:{
        total:0,
        rows: 10,
        page: 1
      },
      tableData: [],
      tableConfig: {
        selection: false,
        index: true,
        loading: false
      },
      tableLabel: [
        { label: "设备名称", param: "name", width: "120px" },
        { label: "数量", param: "model", width: "120px" },
        { label: "出入库时间", param: "createTime", width: "120px" },
        { label: "出入库标识", param: "ioTag", width: "120px" },
        { label: "操作人员", param: "operator", width: "120px" },
        { label: "接收人", param: "receiver", width: "120px" },
        { label: "接收单位", param: "getUnit", width: "160px" },
        { label: "remark", param: "remark", width: "100px" },
        {
          label: "操作",
          action: true,
          width: 120,
          options: [
            {
              label: "修改",
              type: "primary",
              icon: "el-icon-view",
              methods: "modify"
            },
            {
              label: "删除",
              type: "primary",
              icon: "el-icon-view",
              methods: "del"
            }
          ]
        }
      ],
      searchData: [
        {
          id: 0,
          type: "text",
          label: "设备名称",
          value: "",
          relative:'name'
        },
        {
          id: 1,
          type: "date",
          label: "出入库时间",
          value: "",
          relative:'createTime'
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        page: this.pagination.page,
        rows: this.pagination.rows
      }
      this.searchData.map(it=>{
        params[it.relative] = it.value
      })
      this.$post(this.$api.outInfo.getCompanyInfoPage).then((res) => {
        if (res.code === "000" && res.data) {
          this.tableData = [...res.data.list];
          this.pagination.total = res.data.total;
        }
      });
    },
    // 列表按钮功能
    handleButton(val) {
      console.log('当前'+val.methods+'操作')
      switch (val.methods) {
        case "del": //修改
          this.del(val.row);
          break;
        default:
          break;
      }
    },
    // 选择项发生变化时触发
    handleSelectionChange(val) {
      this.mulSelect = [...val];
    },
    del(){
    }
  }
};
</script>
