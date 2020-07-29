<template>
  <div class="ComSearch">
    <el-form ref="form" :inline="true" label-width="120px">
      <el-form-item :label="it.label" v-for="it in searchData" :key="it.id">
        <el-input v-if="it.type==='text'" v-model="it.value"></el-input>
        <el-select v-if="it.type==='select'" v-model="it.value" placeholder="请选择活动区域">
          <el-option  v-for="is in it.children" :key="is.id" :label="is.label" :value="is.value"></el-option>
        </el-select>
        <el-date-picker  v-if="it.type==='date'" type="date" placeholder="选择日期" v-model="it.value" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <slot/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      condition:[]
    };
  },
  created(){
    this.condition = [...this.searchData]
  },
  watch:{
    searchData:{
      handler(){
        this.condition = [...this.searchData]
        this.$emit('backsearchData',this.condition)
      },
      deep:true
    }
  }
};
</script>

<style scoped>
</style>
