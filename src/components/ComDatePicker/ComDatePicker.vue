<template>
  <!-- 日期控件 -->
  <el-form-item :label="label" :prop="dateBool?formInline.dateName:''">
    <el-date-picker
      size="mini"
      v-model="date.startData"
      type="date"
      value-format="yyyy-MM-dd"
      :picker-options="startDatePicker"
      :placeholder="startPlaceHolder"
    >
    </el-date-picker>
    <span>-</span>
    <el-date-picker
      size="mini"
      v-model="date.endData"
      type="date"
      :picker-options="endDatePicker"
      value-format="yyyy-MM-dd"
      :placeholder="endPlaceHolder"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            defaullt:''
        },
        // 时间是否必填
        formInline:{
            type:Object,
            defaullt:{}
        },
        //开始时间
        startData:{
            type:String,
            defaullt:''
        },
        //结束时间
        endData:{
            type:String,
            defaullt:''
        },
        //开始时间占位符
        startPlaceHolder:{
            type:String,
            default:'选择开工日期'
        },
        //结束时间占位符
        endPlaceHolder:{
            type:String,
            default:'选择完工时间'
        },
    },
    data(){
        return {
            date:{
                startData:'',
                endData:'',
            },
            dateBool:false,
            startDatePicker: this.beginDate(),
            endDatePicker: this.processDate(),
        }
    },
    mounted(){
        console.log(this.formInline)
        this.dateBool=this.formInline&&this.formInline.dateBool 
        this.date.startData = this.startData
        this.date.endData = this.endData
    },
    watch:{
        'date.startData'(){
            this.$emit('getDate',this.date)
        },
        'date.endData'(){
            this.$emit('getDate',this.date)
        },
        'endData'(){ //重置
            this.date.startData = this.startData
            this.date.endData = this.endData
        },
        'startData'(){ //重置
            this.date.startData = this.startData
            this.date.endData = this.endData
        },
    },
    methods:{
        beginDate(){
            let that = this
            return {
                disabledDate(time){
                    if (that.date.endData) {
                        return new Date(that.date.endData).getTime() < time.getTime()
                    } 
                },
                // disabledDate1:(time)=>{
                //     if (that.date.endData) {
                //         return new Date(that.date.endData).getTime() < time.getTime()
                //     } 
                // }
            }
        },
        processDate() {
            let that = this
            return {
                disabledDate(time) {
                    if (that.date.startData) {
                        return new Date(that.date.startData).getTime() > time.getTime()
                    } 
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:calc((100% - 10px)/2);
}
</style>
