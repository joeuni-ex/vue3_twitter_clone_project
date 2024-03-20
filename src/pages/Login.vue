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
      @keyup.enter="onLogin"
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-200 focus:ring-2 focus:outline-none focus:border-primary"
      placeholder="비밀번호"
    />
    <button v-if="loading" class="w-96 rounded bg-light text-white py-4">
      로그인 중입니다.
    </button>
    <button
      v-else
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
import { ref, onMounted } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import store from "../store";
import { useRouter } from "vue-router";
export default {
  setup() {
    // 변수 ref(초기값) usestate 와 동일
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();

    onMounted(() => {
      //  console.log(store.state.user);
    });

    //회원가입 클릭 시 실행되는 함수
    const onLogin = async () => {
      if (!email.value || !password.value) {
        alert("이메일, 비밀번호를 모두 확인해 주세요.");
        return;
      }
      try {
        loading.value = true;
        const { user } = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        //get user info
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef); // users에서 user.uid로 검색한 결과 가져옴
        //console.log(docSnap.data); //검색 결과 테스트
        store.commit("SET_USERS", docSnap.data()); //store의 SET_USERS에 상태 저장하기
        //console.log(store.state.user);

        router.replace("/"); //뒤로가기 클릭하면 로그인 페이지로 이동못하게함
      } catch (e) {
        switch (e.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다");
            break;
          case "auth/wrong-password":
            alert("비밀번호가 틀립니다.");
            break;
          case "auth/user-not-found":
            alert("등록되지 않은 이메일입니다.");
            break;
          default:
            alert(e.message);
            break;
        }
      } finally {
        loading.value = false;
      }
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
