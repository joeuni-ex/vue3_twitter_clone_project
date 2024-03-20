<template>
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      :class="`fab fa-twitter text-4xl text-primary ${
        loading ? 'animate-bounce' : ''
      }`"
    ></i>
    <span class="text-2xl font-bold">트위떠 회원가입</span>
    <input
      v-model="email"
      type="email"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="이메일"
    />
    <input
      v-model="username"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="아이디"
    />
    <input
      @keyup.enter="onRegister"
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="비밀번호"
    />
    <button v-if="loading" class="w-96 rounded bg-light text-white py-4">
      회원가입중 입니다.
    </button>
    <button
      v-else
      @click="onRegister"
      class="w-96 rounded bg-primary text-white py-4 hover:bg-dark"
    >
      회원가입
    </button>
    <router-link to="/login">
      <button class="text-primary">계정이 이미 있으신가요? 로그인하기</button>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    // 변수 ref(초기값) usestate 와 동일
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();

    //회원가입 클릭 시 실행되는 함수
    const onRegister = async () => {
      if (!username.value || !email.value || !password.value) {
        alert("유저네임, 이메일, 비밀번호를 모두 확인해 주세요.");
        return;
      }
      try {
        loading.value = true; //로딩 시작
        //인증 사용자 추가 및 유저 정보만 가져오기
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        //회원가입 시 유저 정보 db 저장하기
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: username.value,
          email: email.value,
          profile_image_url: "/profile/jpeg",
          num_tweets: 0,
          followers: [],
          followings: [],
          created_at: Date.now(),
        });

        alert("회원가입에 성공하였습니다. 로그인 해주세요.");
        //회원가입 성공 시 로그인 페이지로 이동
        router.push("/login");
      } catch (e) {
        switch (e.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다");
            break;
          case "auth/week-password":
            alert("비밀번호가 너무 쉬워요");
            break;
          case "auth/email-already-in-use":
            alert("이미 가입되어 있는 이메일입니다.");
            break;
          default:
            alert("회원가입 실패");
            break;
        }
      } finally {
        loading.value = false; //로딩 종료
      }
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
