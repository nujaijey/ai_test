<template>
    <div style="margin:20px">
        <!-- 顶部选择栏 -->
        <v-tabs background-color="indigo" dark :value="2">
            <v-tab @click="$router.push({name:'task'})">Task管理</v-tab>
            <v-tab @click="$router.push({name:'jenkins'})">Jenkins管理</v-tab>
            <v-tab @click="$router.push({name:'testcase'})">Testcase管理</v-tab>
            <v-tab @click="$router.push({name:'report'})">Report管理</v-tab>
        </v-tabs>

        <!-- 添加测试用例对话框 -->
        <v-dialog v-model="addDialog" max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">添加测试用例</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" >
                                <v-text-field label="用例名称*" required  v-model="addItem.caseName"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select :items="['文本', '文件']" label="用例类型*" required v-model="addItem.caseType"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="用例数据*" required v-model="addItem.caseData"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="备注" required v-model="addItem.remark"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>带*号为必填项</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="addDialog = false"> 取消 </v-btn>
                <v-btn color="blue darken-1" text  @click='addCase()'> 添加 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 修改测试用例对话框 -->
        <v-dialog v-model="editDialog" max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">修改测试用例</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" >
                                <v-text-field label="用例名称*" required  v-model="editItem.caseName"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select :items="['文本', '文件']" label="用例类型*" required v-model="editItem.caseType"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="用例数据*" required v-model="editItem.caseData"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="备注" required v-model="editItem.remark"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>带*号为必填项</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="editDialog = false"> 取消 </v-btn>
                <v-btn color="blue darken-1" text  @click='editCase()'> 修改 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        
        <v-btn style="margin:10px" color="success" @click="addDialog = true">添加用例</v-btn>
        <v-btn  color="primary" @click="editDialog = true">修改用例</v-btn>

        <v-data-table
        v-model="selected"
        :headers="headers"
        :items="tableData"
        show-select
        hide-default-footer
        >
            <template v-slot:[`item.action`]="{item}">
                <v-btn small color="primary" @click="editItem(item)">修改</v-btn>
                <v-btn small color="error" @click="deleteItem(item)">删除</v-btn>
            </template>
        </v-data-table>
         <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getCaseList()" total-visible="7"></v-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            addDialog: false,
            editDialog: false,
            headers:[
                {text:"id",value:"id"},
                {text:"用例名称",value:"caseName"},
                {text:"用例数据",value:"caseData"},
                {text:"操作",value:"action"}
            ],
            selected:[],
            tableData:[],
            addItem:{
                caseName:'',
                caseData:'',
                remark:'',
                caseType:''
            },
            editItem:{
                caseName:'',
                caseData:'',
                remark:'',
                caseType:''
            },
            currentPage:1,
            pageLength:0,
            
        }
    },
    // created页面加载完成后进行
    created(){
        this.getCaseList()
    },
    methods:{
        addCase(){
            // 声明变量
            let add_test_data={
                caseName : this.addItem.caseName,
                caseData : this.addItem.caseData,
                remark : this.addItem.remark
            }
            // 调用接口
            this.$api.testcase.createCase(add_test_data).then(res => {
                console.log(res)
                this.addDialog=false
            });
        },
        getCaseList(){
            let get_case_list_data={
                pageNum:this.currentPage,
                pageSize:10
            }
            this.$api.testcase.getCaseList(get_case_list_data).then(res => {
                console.log(res)
                this.tableData=res.data.data.data
                this.pageLength=Math.ceil(res.data.data.recordsTotal/get_case_list_data.pageSize)
            
            })
        }
    }
}
</script>
<style scoped>

</style>