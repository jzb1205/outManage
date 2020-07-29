<template>
  <div class="app-container">
    <com-search :searchData="searchData" @click="backSearchData">
      <el-button @click="getList">查询</el-button>
      <!-- <el-button icon="el-icon-upload" @click="imagecropperShow=true">上传</el-button> -->
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
  components: {
  },
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
        { label: "文件名", param: "name", width: "120px" },
        { label: "类型", param: "type", width: "120px" },
        { label: "路径", param: "path", width: "120px" },
        { label: "文件后缀", param: "suffix", width: "120px" },
        { label: "文件真实名称", param: "realName", width: "120px" },
        { label: "上传时间", param: "createTime", width: "120px" },
        { label: "上传人", param: "creator", width: "160px" },
        { label: "备注", param: "remark", width: "100px" },
        {
          label: "操作",
          action: true,
          width: 120,
          options: [
            {
              label: "删除",
              type: "primary",
              icon: "el-icon-view",
              methods: "del"
            }
          ]
        }
      ],
      mulSelect:[],
      searchData: [
        {
          id: 0,
          type: "text",
          label: "文件名",
          value: "",
          relative:'name'
        }
      ],
      imagecropperShow: false,
      imagecropperKey: 0
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
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
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
