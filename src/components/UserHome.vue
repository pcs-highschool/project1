<template>
  <div>
    <!-- datas: {{ this.userList[10] }} -->
    <div v-if="this.userList == null">
      <h4 class="text-2xl">UserList</h4>
      <br>
      <hr>
      <img class="mx-auto w-[300px] mt-10" src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="">
      <h4 class="text-lg">데이터를 들고 읽는 중입니다..</h4>
    </div>

    <div v-else-if="userList.length < 1">
      <h4 class="text-2xl">UserList</h4>
      <br>
      <hr>
      <img class="max-w-[200px] mx-auto" src="https://cdn-icons-png.flaticon.com/512/4539/4539476.png" alt="">
      <h4>연결 오류!</h4>
    </div>

    <div v-else>
      <h4 class="text-2xl">UserList</h4>
      <br>
      <hr>
      <div v-for="(lst, idx) in filter" :key="idx" class="max-w-[900px] mx-auto">
        <router-link :to="{ name: 'item', params: { userid: lst.userId } }"
          class="px-20 py-10 rounded-lg float-left	bg-slate-100 shadow-md	m-10 hover:bg-slate-400 hover:text-white transition hover:shadow-lg">
          ID <span class="text-xl">{{ lst.userId }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: null,
      userIdList: [],

    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      let self = this;
      this.$axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(function (res) {
          if (res.status !== 200) {
            alert('통신에러!');
            self.userList = [];
          } else {
            self.userList = res.data;
            if (self.$datas.length > 0) {
              return 0
            }
            else {
              self.$datas.push(self.userList)
              console.log(self.$datas)
            }
          }
        })
    }
    //   fetchData() {
    //     const promise = this.$axios.get('https://jsonplaceholder.typicode.com/todos')
    //     const dataPromise = promise.then((res) => {
    //       if (res.status !== 200) {
    //         alert('통신에러!');
    //       } else {
    //         return res.data;
    //       }
    //     })
    //     return dataPromise
    //   },
    // },
    // async beforeMount() {
    //   await console.log('before fetchData')
    //   this.$datas = await this.fetchData().then(datas => datas)
    //     .catch(err => console.log(err))
    //   await console.log('after fetchData')
    //   await console.log(this.$datas)
    //   this.userList = this.$datas
    //   console.log('beforeMount::this.userList: ', this.userList)
    //   this.pushData()

  },
  computed: {
    filter() {
      return this.userList.filter(
        (res) => {
          let groupKey = res.userId
          if (this.userIdList.indexOf(groupKey) === -1) {
            this.userIdList.push(groupKey);
            return true
          } else {
            return false
          }
        });
    }
  },
}
</script>

<style>
</style>