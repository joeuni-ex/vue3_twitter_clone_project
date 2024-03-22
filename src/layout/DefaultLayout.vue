vue
<template>
  <div class="flex h-screen container mx-auto">
    <!-- 사이드 섹션 -->
    <div
      class="w-20 xl:w-1/4 pt-5 xl:ml-10 flex flex-col justify-between border-r border-gray-200"
    >
      <div class="flex flex-col items-center xl:items-start">
        <!-- 트위터 로고 -->
        <i class="fab fa-twitter text-3xl text-primary xl:ml-4 mb-3"></i>
        <!-- 트위터 사이드 메뉴 -->
        <div class="flex flex-col items-start space-y-1">
          <router-link
            :to="route.path"
            :class="`hover:text-primary hover:bg-blue-50 p-2 lg:px-4 lg:py-2 rounded-full cursor-pointer ${
              router.currentRoute.value.name == route.name ? 'text-primary' : ''
            }`"
            v-for="route in routes"
            :key="route"
          >
            <div v-if="route.meta.isMenu">
              <i :class="route.icon"></i>
              <span class="ml-3 text-xl hidden xl:inline-block">{{
                route.title
              }}</span>
            </div>
          </router-link>
        </div>
        <!-- 트윗 버튼 -->
        <div class="w-full h-12 xl:pr-3 flex justify-center">
          <button
            class="mt-3 bg-primary text-white xl:w-full w-12 h-12 rounded-full hover:bg-dark"
          >
            <span class="hidden xl:block">트윗</span>
            <i class="fas fa-plus xl:hidden"></i>
          </button>
        </div>
      </div>
      <!-- 프로필 버튼 -->
      <div class="xl:mr-3 mb-3" @click="showProfileDropdown = true">
        <button
          class="hidden xl:flex mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 items-center"
        >
          <!-- 100은 이미지 사이즈임  -->
          <img
            :src="currentUser?.profile_image_url"
            class="w-10 h-10 rounded-full"
          />
          <div class="xl:ml-2 hidden xl:block">
            <div class="text-sm font-bold">{{ currentUser?.email }}</div>
            <div class="text-xs text-gray-500 text-left">
              @{{ currentUser?.username }}
            </div>
          </div>
          <i
            class="ml-auto fas fa-ellipsis-h fa-fw text-xs hidden xl:block"
          ></i>
        </button>
        <div class="xl:hidden flex justify-center">
          <img
            src="http://picsum.photos/100"
            class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
          />
        </div>
      </div>
    </div>
    <!-- 메인 섹션 -->

    <div class="flex flex-1 h-screen">
      <router-view />
    </div>
    <!-- 프로필 드롭다운 메뉴 -->
    <div
      class="absolute bottom-20 left-12 shadow rounded-lg w-70"
      v-if="showProfileDropdown"
      @click="showProfileDropdown = false"
    >
      <button
        class="hover:bg-gray-50 border-b border-gray-100 flex p-3 w-full items-center"
      >
        <img
          :src="currentUser.profile_image_url"
          class="w-10 h-10 rounded-full"
        />
        <div class="mx-4">
          <div class="font-bold text-sm">{{ currentUser.email }}</div>
          <div class="text-left text-sm text-gray-500">
            @{{ currentUser.username }}
          </div>
        </div>
        <i class="fas fa-check text-primary ml-auto"></i>
      </button>
      <button
        class="hover:bg-gray-50 p-3 w-full text-left text-sm"
        @click="onLogout"
      >
        @{{ currentUser.username }} 계정에서 로그아웃
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import router from "../router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import store from "../store";

export default {
  setup() {
    const routes = ref([]);
    const showProfileDropdown = ref(false);

    const currentUser = computed(() => store.state.user);

    onBeforeMount(() => {
      routes.value = router.options.routes.filter(
        (route) => route.meta.isMenu == true
      );
    });

    //로그아웃 함수
    const onLogout = async () => {
      await signOut(auth);
      store.commit("SET_USERS", null);
      await router.replace("./login");
    };

    return { routes, showProfileDropdown, onLogout, currentUser, router };
  },
};
</script>

<style></style>
