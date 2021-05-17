<template>
    <div>
        <v-tabs
            fixed-tabs
            background-color="indigo"
            dark
            :value="0"
            >
            <v-tab @click="$router.push({name:'task'})">Task管理</v-tab>
            <v-tab @click="$router.push({name:'jenkins'})">Jenkins管理</v-tab>
            <v-tab @click="$router.push({name:'testcase'})">Testcase管理</v-tab>
            <v-tab @click="$router.push({name:'report'})">Report管理</v-tab>
        </v-tabs>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style scoped>

</style>