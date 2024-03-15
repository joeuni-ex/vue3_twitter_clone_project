<template>
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      :class="`fab fa-twitter text-4xl text-primary ${
        loading ? 'animate-bounce' : ''
      }`"
    ></i>
    <span class="text-2xl font-bold">트위떠 로그인</span>
    <input
      v-model="email"
      type="email"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="이메일"
    />

    <input
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="비밀번호"
    />
    <button
      @click="onLogin"
      class="w-96 rounded bg-primary text-white py-4 hover:bg-dark"
    >
      로그인
    </button>
    <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입하기</button>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    // 변수 ref(초기값) usestate 와 동일
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    //회원가입 클릭 시 실행되는 함수
    const onLogin = () => {
      console.log(email.value, password.value);
    };

    return {
      email,
      password,
      loading,
      onLogin,
    };
  },
};
</script>
<style></style>
import { RouterLink } from "vue-router";
