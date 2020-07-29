<template>
  <div class="app-container">
    <com-search :searchData="searchData" @click="backSearchData">
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
      tableData: [
        {
          name:'123',
          type:'png',
          path:'./../',
          suffix:'png',
          realName:'电图',
          createTime:'20200515',
          creator:'张三',
          remark:'xxx'
        }
      ],
      tableConfig: {
        selection: false,
        index: true,
        loading: false
      },
      tableLabel: [
        { label: "设备名称", param: "name", width: "120px" },
        { label: "型号", param: "model", width: "120px" },
        { label: "库存数量", param: "total", width: "120px" },
        { label: "备注", param: "remark", width: "120px" }
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
          type: "text",
          label: "型号",
          value: "",
          relative:'model'
        }
      ],
      addParams:[
        {
          id: 0,
          type: "text",
          label: "设备名称",
          value: "",
          relative:'name'
        },
        {
          id: 1,
          type: "text",
          label: "型号",
          value: "",
          relative:'model'
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // this.loading = true;
      // getList().then(response => {
      //   this.list = response.data.items;
      //   this.loading = false;
      // });
    },
    backSearchData(val) {
      this.searchData = [...val];
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
