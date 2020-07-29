<template>
  <div class="app-container">
    <h3>基础信息</h3>
    <el-form ref="form" :model="form" label-width="80px" class='detailForm'>
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="事件状态">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否超时">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="处理公司">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <h3>处理人</h3>
    <el-form ref="form" :model="form" label-width="80px" class='detailForm'>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px" class='detailForm'>
        <el-button type="primary" @click="onSubmit">接单</el-button>
        <el-button type="primary" @click="onSubmit">处理完成</el-button>
        <el-button type="primary" @click="onSubmit">审核通过</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {},
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container{
  padding:20px 10%;
  .detailForm{
    width:40%;
    padding:20px;
    /deep/.el-input--mini .el-input__inner,
    /deep/.el-textarea__inner{
      min-width: 150px;
      max-width: 250px;
    }
  }
}
</style>
