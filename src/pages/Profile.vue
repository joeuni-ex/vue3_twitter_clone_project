<template>
  <div class="flex flex-1">
    <!-- 프로필 섹션 -->
    <div class="flex-1 flex flex-col border-r border-color">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-color">
        <button class="mr-4">
          <i
            class="fas fa-arrow-left text-primary p-3 py-1 rounded-full hover:bg-blue-50"
          ></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ currentUser.email }}</div>
          <div class="text-xs text-gray">{{ currentUser.num_tweets }} 트윗</div>
        </div>
      </div>
      <!-- 프로필 백그라운드 이미지-->
      <div class="bg-gray-300 h-40 relative flex-none">
        <!-- 프로필이미지 -->
        <div
          class="w-28 h-28 border-4 border-white bg-gray-100 rounded-full absolute -bottom-14 left-2"
        >
          <img
            src="http://picsum.photos/200"
            class="rounded-full opacity-90 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
      <!-- 프로필 수정 버튼 -->
      <div class="text-right mr-2 mt-2">
        <button
          class="border border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full text-sm"
        >
          프로필 수정
        </button>
      </div>
      <!-- 유저 정보 -->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">{{ currentUser.email }}</div>
        <div class="text-gray">@{{ currentUser.username }}</div>
        <div>
          <span class="text-gray">가입일:</span>
          <span class="text-gray">
            {{ moment(currentUser.created_at).format("YYYY년 MM월") }}</span
          >
        </div>
        <div>
          <span class="font-bold mr-1">{{
            currentUser.followings.length
          }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">{{ currentUser.followers.length }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!-- 탭들 -->
      <div class="flex border-b border-color mt-3">
        <div
          class="py-3 w-1/4 text-primary font-bold border-b border-primary text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          class="py-3 w-1/4 text-gray font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          class="py-3 w-1/4 text-gray font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          class="py-3 w-1/4 text-gray font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
      </div>
      <!-- 트윗들 -->
      <div class="overflow-y-auto">
        <Tweet
          v-for="tweet in tweets"
          :tweet="tweet"
          :key="tweet"
          :currentUser="currentUser"
        />
      </div>
    </div>
    <!-- 트랜드 섹션 -->
    <Trends />
  </div>
</template>

<script>
import Trends from "../components/Trends.vue";
import Tweet from "../components/Tweet.vue";
import store from "../store";
import { computed, ref, onBeforeMount } from "vue";
import {
  onSnapshot,
  doc,
  collection,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import getTweetInfo from "../utils/getTweetInfo";
import moment from "moment";
export default {
  components: { Trends, Tweet },
  setup() {
    const currentUser = computed(() => store.state.user);
    const tweets = ref([]);

    onBeforeMount(() => {
      //get user
      const userDocRef = doc(db, "users", currentUser.value.uid);
      const getUserInfo = query(userDocRef);
      const un = onSnapshot(getUserInfo, (doc) => {
        store.commit("SET_USERS", doc.data());
      });

      //get tweets
      const q = query(
        collection(db, "tweets"),
        where("uid", "==", currentUser.value.uid),
        orderBy("created_at", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          let tweet = await getTweetInfo(change.doc.data(), currentUser.value);
          if (change.type === "added") {
            tweets.value.splice(change.newIndex, 0, tweet);
          }
          if (change.type === "modified") {
            tweets.value.splice(change.oldIndex, 1, tweet);
          }
          if (change.type === "removed") {
            tweets.value.splice(change.oldIndex, 1);
          }
        });
      });
    });

    return {
      currentUser,
      tweets,
      moment,
    };
  },
};
</script>

<style></style>
