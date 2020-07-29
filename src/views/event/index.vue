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
        { label: "标题", param: "title", width: "120px" },
        { label: "事件状态", param: "status", width: "120px" },
        { label: "提交人", param: "submitter", width: "120px" },
        { label: "处理公司", param: "companyName", width: "120px" },
        { label: "处理人", param: "dealPerson", width: "120px" },
        { label: "处理人电话", param: "phone", width: "120px" },
        { label: "处理结果说明", param: "dealDesc", width: "120px" },
        { label: "提交时间", param: "startTime", width: "120px" },
        { label: "结束时间", param: "endTime", width: "120px" },
        { label: "审核时间", param: "auditTime", width: "120px" },
        { label: "是否超时", param: "timeoutStatus", width: "120px" },
      ],
      searchData: [
        {
          id: 0,
          type: "date",
          label: "	提交开始时间",
          value: "",
          relative: "submitStartTime",
        },
        {
          id: 1,
          type: "date",
          label: "提交结束时间",
          value: "",
          relative: "submitEndTime",
        },
        {
          id: 2,
          type: "select",
          label: "事件状态",
          value: "",
          relative: "status",
          children: [
            {
              value: "",
              label: "全部",
            },
            {
              value: 0,
              label: "已提交",
            },
            {
              value: 1,
              label: "处理中",
            },
            {
              value: 2,
              label: "完成待审核",
            },
            {
              value: 3,
              label: "已完成",
            },
          ],
        },
        {
          id: 3,
          type: "select",
          label: "处理公司",
          value: "",
          relative: "companyName",
          children: [],
        },
        {
          id: 4,
          type: "select",
          label: "是否超时",
          value: "",
          relative: "timeoutStatus",
          children: [
            {
              value: "",
              label: "全部",
            },
            {
              value: 0,
              label: "否",
            },
            {
              value: 1,
              label: "是",
            },
          ],
        },
        {
          id: 5,
          type: "text",
          label: "标题",
          value: "",
          relative: "title",
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
        rows: this.pagination.rows
      }
      this.searchData.map(it=>{
        params[it.relative] = it.value
      })
      this.$post(this.$api.event.getEventFormPage).then((res) => {
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
        case "del": // 修改
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
