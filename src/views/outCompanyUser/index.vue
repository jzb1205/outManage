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
        page: 1,
      },
      tableData: [],
      tableConfig: {
        selection: false,
        index: true,
        loading: false,
      },
      tableLabel: [
        { label: "姓名", param: "name", width: "120px" },
        { label: "身份证号码", param: "id_card", width: "120px" },
        { label: "入职时间", param: "entry_time", width: "100px" },
        { label: "工作状态", param: "work_status", width: "100px" },
        { label: "离职时间", param: "departure_time", width: "100px" },
        { label: "离职理由", param: "departure_reason", width: "100px" },
        { label: "性别", param: "sex", width: "100px" },
        { label: "年龄", param: "age", width: "100px" },
        { label: "正式参加工作的时间", param: "work_time", width: "100px" },
        { label: "学历", param: "degree", width: "100px" },
        { label: "所属公司名称", param: "company", width: "100px" },
      ],
      searchData: [
        {
          id: 0,
          type: "text",
          label: "姓名",
          value: "",
          relative: "name",
        },
        {
          id: 1,
          type: "select",
          label: "所属公司",
          value: "",
          relative: "company",
          children: [],
        },
        {
          id: 2,
          type: "select",
          label: "工作状态",
          value: "",
          relative: "workStatus",
          children: [
            {
              value: "",
              label: "全部",
            },
            {
              value: 0,
              label: "在职",
            },
            {
              value: 1,
              label: "离职",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        page: this.pagination.page,
        rows: this.pagination.rows,
      };
      this.searchData.map((it) => {
        params[it.relative] = it.value;
      });
      this.$post(this.$api.outInfo.getOutPersonInfoPage).then((res) => {
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
    del() {},
  },
};
</script>
