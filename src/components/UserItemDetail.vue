<template>
    <div>
        <h4 class="text-2xl">UserList_Detail</h4>
        <br>
        <h1 class="text-3xl">{{ Id }}</h1>
        <br>
        <hr>
        <div v-if="listUser.length < test || 0 > test" class="mx-auto max-w-[1000px] my-32 mt-100px flex ">
            <button v-if="listUser.length < test" class="w-[300px]  text-3xl mt-32"
                @click="beforeClick">&#5589;</button>
            <div>
                <img class=" max-w-[200px] mx-20" src="https://cdn-icons-png.flaticon.com/512/4539/4539476.png" alt="">
                <h4>유저가 읎습니다!</h4>
            </div>
            <button v-if="0 > test" class="w-[300px] text-3xl mt-32" @click="afterClick"> &#5586;</button>

        </div>
        <div v-else class="mx-auto max-w-[1000px] my-20 flex">
            <button class="w-[300px] text-3xl" @click="beforeClick">&#5589;</button>
            <div class="w-[500px] h-[500px] bg-gray-100 box-border p-10">
                <h3 class="font-bold text-2xl mt-20">Title</h3>
                <h2 class="font-lg text-xl pt-10">{{ IdList.title }}</h2>
            </div>
            <button class="w-[300px] text-3xl" @click="afterClick"> &#5586;</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: this.$route.params.userid,
            list: this.$datas[0],
            Id: this.$route.params.id,
            listUser: [],
            IdList: [],
            test: 1,
            Ids: [],
        }
    },
    mounted() {
        this.UserIdFilter.filter(
            (res) => {
                let Idkey = res.id
                // console.log(res.id)
                if (Idkey == this.Id) {
                    this.IdList = res
                }
                console.log(this.IdList)
                return true
            }

        );
        this.nowClick()
    },
    computed: {
        UserIdFilter() {
            return this.list.filter(
                (res) => {
                    let groupKey = res.userId
                    if (groupKey == this.userId) {
                        this.listUser.push(res);
                        this.Ids.push(res.id)
                        return this.listUser
                    }
                });
        },
    },
    methods: {
        nowClick() {
            this.test = this.Ids.indexOf(Number(this.Id))
            // console.log(this.Ids)
            console.log(this.test)
        },
        afterClick() {
            this.IdList = this.listUser[this.test++]
            this.Id = this.IdList.id
            console.log(this.IdList)
        },
        beforeClick() {
            this.IdList = this.listUser[this.test--]
            this.Id = this.IdList.id
            console.log(this.IdList)
        },
    },

}
</script>

<style>
</style>