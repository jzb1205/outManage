<template>
    <div class="comPagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:0
        },
        rows:{
            type:Number,
            default:10
        },
        page:{
            type:Number,
            default:1
        }
    },
    data () {
        return {
            pload:{
               rows:10,
               page:1
            }
        };
    },
    created () {
    },
    methods: {
        handleSizeChange(val) {
            this.pload.rows = val
            this.$emit('getList',this.pload)
        },
        handleCurrentChange(val) {
            this.pload.page = val
            this.$emit('getList',this.pload)
        }
    }
}
</script>

<style scoped>
.comPagination {
    width:430px;
    margin:10px auto;
}
</style>
