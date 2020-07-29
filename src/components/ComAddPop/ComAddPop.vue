<template>
  <el-dialog
    title="提示"
    :visible.sync="openBool"
    width="30%"
    :modal='false'
  >
    <el-form ref="form" :model="addParams" :rules="addRules" :inline="true" label-width="120px">
      <el-form-item v-for="(it,i) in addParams" :key="it.id" :label='it.label' :prop='it.relative' >
        <el-input  v-model="addParams[i][it.value]" :placeholder="it.label"></el-input>
      </el-form-item>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    addParams: {
      type: Array,
      default: () => []
    },
    addRules: {
      type: Object,
      default: () => {}
    },
    openBool: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      condition: []
    };
  },
  created() {
    this.condition = [...this.addParams];
  },
  watch: {
    addParams: {
      handler() {
        this.condition = [...this.addParams];
        this.$emit("backAddParams", this.condition);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
