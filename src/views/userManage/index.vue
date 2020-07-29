<template>
  <div class="app-container">
    <com-search :searchData="searchData">
      <el-button @click="getList">查询</el-button>
      <el-button @click="openBool = !openBool">新增</el-button>
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
    <com-add-pop :addParams="addParams" :addRules="addRules" :openBool="openBool">
      <el-button size="mini" @click="openBool=!openBool">取消</el-button>
      <el-button size="mini" type="primary" @click="addSysUser">新增</el-button>
    </com-add-pop>
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
        { label: "用户名", param: "userName", width: "120px" },
        { label: "用户类型", param: "userType", width: "80px" },
        { label: "创建时间", param: "createTime", width: "120px" },
        { label: "真实姓名", param: "realName", width: "120px" },
        { label: "联系电话", param: "phone", width: "120px" },
        { label: "邮箱", param: "email", width: "120px" },
        { label: "所属公司", param: "companyName", width: "120px" },
      ],
      searchData: [
        {
          id: 0,
          type: "text",
          label: "用户名",
          value: "",
          relative: "userName",
        },
        {
          id: 1,
          type: "text",
          label: "真实姓名",
          value: "",
          relative: "realName",
        },
        {
          id: 2,
          type: "select",
          label: "所属公司",
          value: "",
          children: [],
          relative: "companyName",
        },
      ],
      openBool: false,
      addParams: [
        {
          id: 0,
          type: "text",
          label: "用户名",
          userName: "",
          relative: "userName",
        },
        {
          id: 1,
          type: "text",
          label: "真实姓名",
          realName: "",
          relative: "realName",
        },
        {
          id: 2,
          type: "text",
          label: "联系电话",
          phone: "",
          relative: "phone",
        },
        {
          id: 3,
          type: "text",
          label: "所属公司",
          companyName: "",
          relative: "companyName",
        },
        {
          id: 4,
          type: "text",
          label: "邮箱",
          email: "",
          relative: "email",
        },
        {
          id: 5,
          type: "text",
          label: "密码",
          password: "",
          relative: "password",
        },
      ],
      addRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {};
      this.searchData.map((it) => {
        params[it.relative] = it.value;
      });
      this.$post(this.$api.user.getSysUserPage, params).then((res) => {
        if (res.code === "000" && res.data) {
          this.tableData = res.data.list;
          this.pagination.total = res.data.total;
        }
      });
    },
    // 列表按钮功能
    handleButton(val) {
      console.log("当前" + val.methods + "操作");
      switch (val.methods) {
        case "del": //修改
          this.del(val.row.id);
          break;
        default:
          break;
      }
    },
    // 选择项发生变化时触发
    handleSelectionChange(val) {
      this.mulSelect = [...val];
    },
    //新增用户
    addSysUser() {
      const params = {};
      this.addParams.map((it) => {
        params[it.relative] = it.value;
      });
      this.$post(this.$api.user.addSysUser, params).then((res) => {
        if (res.code === "000" && res.data) {
          this.$message({
            type: "success",
            message: res.msg,
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    //删除用户
    del(row) {},
  },
};
</script>
