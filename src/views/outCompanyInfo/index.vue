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
    <com-pagination
      :rows="pagination.rows"
      :page="pagination.page"
      :total="pagination.total"
      @getList="getList"
    ></com-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pagination: {
        total: 0,
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
        { label: "公司名称", param: "companyName", width: "120px" },
        { label: "公司代码", param: "companyCode", width: "120px" },
        { label: "备注", param: "remark", width: "100px" }
      ],
      searchData: [
        {
          id: 0,
          type: "text",
          label: "公司名称",
          value: "",
          relative: "companyName"
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
      console.log("当前" + val.methods + "操作");
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
    del() {}
  }
};
</script>
