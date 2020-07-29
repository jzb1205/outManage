<template>
  <!-- 删除确认组件 -->
  <el-dialog
    v-drag-dialog
    title="提示"
    :visible.sync="delPopBool"
    width="30%"
    :before-close="delClose"
  >
    <p class="content">{{noticeText}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('delClose',false)">取 消</el-button>
      <el-button size="mini" type="primary"  @click="$emit('delClose',true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props:{
        //删除bool
        delPopBool:{
            type:Boolean,
            default:false
        },
        //删除提示文本
        noticeText:{
            type:String,
            default:''
        }
    },
    data() {
        return {}
    },
    methods:{
        delClose(){
            this.$emit('delClose',false)
        }
    }
}
</script>

<style lang="scss" scoped>
  .content{
    text-align: center;
    margin: 20px auto;
    font-size: 20px;
  }
</style>
