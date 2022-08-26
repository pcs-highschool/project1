 <template>
    <div>
        <h4 class="text-2xl">UserList</h4>
        <br>
        <h1 class="text-3xl">{{ userId }}</h1>
        <br>
        <hr>
        <div v-if="check == null" class="mx-auto max-w-[1000px] my-20">
            <img class="mx-auto w-[300px] mt-10" src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
                alt="">
            <h4 class="text-lg">데이터를 들고 읽는 중입니다..</h4>
        </div>

        <div v-else-if="check.length < 1" class="mx-auto max-w-[1000px] my-20">
            <img class="max-w-[200px] mx-auto" src="https://cdn-icons-png.flaticon.com/512/4539/4539476.png" alt="">
            <h4>연결 오류!</h4>
        </div>

        <div v-else class="mx-auto max-w-[1000px] my-20">
            <ul id="tab" class="flex justify-around  text-lg border-b-2 max-w-[280px] mb-10 cursor-pointer font-bold">
                <li class="hover:text-orange-400 " @click="complete = 0;" :class="{ 'selecte': complete == 0 }">전체</li>
                <li class="hover:text-orange-400" @click="complete = 1;" :class="{ 'selecte': complete == 1 }">작성중</li>
                <li class="hover:text-orange-400" @click="complete = 2;" :class="{ 'selecte': complete == 2 }">완료</li>
            </ul>
            <ul v-if="complete == 0">
                <li v-for="lst in UserList" :key="lst" class="h-[50px] border-b-2 my-3 hover:shadow-lg">
                    <router-link :to="{ name: 'Detail', params: { userid: lst.userId, id: lst.id } }"
                        class="flex justify-between text-lg ease-in-out hover:font-bold">
                        <h3 class="flex pt-1">
                            <h3 class=" mr-5">| {{ lst.id }} |</h3> {{ lst.title }}
                        </h3>
                        <p class="pr-10"> &#8640;</p>
                    </router-link>
                </li>

            </ul>
            <ul v-else-if="complete == 1">
                <li v-for="lst in writeList" :key="lst" class="h-[50px] border-b-2 my-3 hover:shadow-lg">
                    <router-link :to="{ name: 'Detail', params: { userid: lst.userId, id: lst.id } }"
                        class="flex justify-between text-lg ease-in-out hover:font-bold">
                        <h3 class="flex pt-1">
                            <h3 class=" mr-5">| {{ lst.id }} |</h3> {{ lst.title }}
                        </h3>
                        <p class="pr-10"> &#8640;</p>
                    </router-link>
                </li>

            </ul>
            <ul v-else>
                <li v-for="lst in finishList" :key="lst" class="h-[50px] border-b-2 my-3 hover:shadow-lg">
                    <router-link :to="{ name: 'Detail', params: { userid: lst.userId, id: lst.id } }"
                        class="flex justify-between text-lg ease-in-out hover:font-bold">
                        <h3 class="flex pt-1">
                            <h3 class=" mr-5">| {{ lst.id }} |</h3> {{ lst.title }}
                        </h3>
                        <p class="pr-10"> &#8640;</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <router-link :to="{ name: 'home' }"
            class="inline-block mb-10 py-2 px-5 border-4 border-slate-400 bg-slate-400 transition duration-150 ease-out hover:ease-in text-white hover:bg-white hover:text-black">
            뒤로
            가기</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: this.$route.params.userid,
            list: this.$datas[0],
            check: null,
            UserList: [],
            complete: 0,
            writeList: [],
            finishList: [],
        }
    },
    mounted() {
        this.Loading()
        this.UserIdFilter
        this.writeFilter
        this.finishFilter

    },
    methods: {
        CalssAdd() {
            () => {
                this.classList.add('selecte');
            }
        },
        Loading() {
            if (this.list.length < 1) {
                return this.check = []
            }
            else {
                return this.check = this.list
            }
        }
    },
    computed: {
        UserIdFilter() {
            return this.list.filter(
                (res) => {
                    let groupKey = res.userId
                    if (groupKey == this.userId) {
                        this.UserList.push(res);
                    }
                });
        },
        writeFilter() {
            return this.UserList.filter(
                (res) => {
                    let groupKey = res.completed
                    if (groupKey == true) {
                        this.writeList.push(res);
                    }
                });
        },
        finishFilter() {
            return this.UserList.filter(
                (res) => {
                    let groupKey = res.completed
                    if (groupKey == false) {
                        this.finishList.push(res);
                    }
                });
        },

    },

}
</script>

<style>
#tab li {
    position: relative;
    width: 80px;
}

#tab li::before {
    position: absolute;
    content: "";
    width: 0%;
    height: 2px;
    left: 0;
    /* margin-left: -40px; */
    background-color: orange;
    bottom: -3px;
    transition: all 0.2s;

}

#tab li:hover::before {
    width: 110%;
}

.selecte {
    width: 110%;
    border-bottom: 3px solid orange;
    margin-bottom: -2px;

    color: orange;
}
</style>