<template>
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      :class="`fab fa-twitter text-4xl text-primary ${
        loading ? 'animate-bounce' : ''
      }`"
    ></i>
    <span class="text-2xl font-bold">트위떠 회원가입</span>
    <input
      v-model="username"
      type="email"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="이메일"
    />
    <input
      v-model="email"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="아이디"
    />
    <input
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="비밀번호"
    />
    <button
      @click="onRegister"
      class="w-96 rounded bg-primary text-white py-4 hover:bg-dark"
    >
      회원가입
    </button>
    <button class="text-primary">계정이 이미 있으신가요 로그인하기</button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    // 변수 ref(초기값) usestate 와 동일
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    //회원가입 클릭 시 실행되는 함수
    const onRegister = () => {
      console.log(username.value, email.value, password.value);
    };

    return {
      username,
      email,
      password,
      loading,
      onRegister,
    };
  },
};
</script>
<style></style>
