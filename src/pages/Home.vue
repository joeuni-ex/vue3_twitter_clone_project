<template>
  <!-- 메인 파트 -->
  <div class="flex-1 border-r border-gray-100 overflow-y-auto">
    <div class="flex flex-col">
      <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">홈</div>
      <!-- 트윗팅 섹션 -->
      <div class="flex px-3 py-3 border-b-8 border-gray-100">
        <img
          :src="currentUser.profile_image_url"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-2 flex-1 flex flex-col">
          <textarea
            v-model="tweetBody"
            placeholder="무슨 일이 일어나고 있나요?"
            class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
          ></textarea>
          <div class="text-right">
            <button
              v-if="!tweetBody.length"
              class="bg-light text-sm font-bold text-white px-4 py-1 rounded-full"
            >
              트윗
            </button>
            <button
              v-else
              @click="onAddTweet"
              class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
            >
              트윗
            </button>
          </div>
        </div>
      </div>
      <!-- 트윗 -->
      <Tweet
        v-for="tweet in tweets"
        :key="tweet.id"
        :currentUser="currentUser"
        :tweet="tweet"
      />
    </div>
  </div>
  <!-- 트랜드 파트 -->
  <Trends />
</template>

<script>
import Trends from "../components/Trends.vue";
import Tweet from "../components/Tweet.vue";
import { ref, computed, onBeforeMount } from "vue";
import store from "../store";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export default {
  components: { Trends, Tweet },
  setup() {
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);
    const tweets = ref([]);

    //트윗 실시간 가져오기
    onBeforeMount(() => {
      const q = query(collection(db, "tweets"), orderBy("created_at", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          let tweet = await getUserInfo(change.doc.data());
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

    const getUserInfo = async (tweet) => {
      const docRef = doc(db, "users", tweet.uid);
      const docSnap = await getDoc(docRef); // users에서 user.uid로 검색한 결과 가져옴
      // tweet.profile_image_url = docSnap.data().profile_image_url;
      // tweet.email = docSnap.data().email;
      // tweet.username = docSnap.data().username;
      tweet = { ...tweet, ...docSnap.data() };
      return tweet;
    };

    const onAddTweet = async () => {
      try {
        //tweet 저장하기
        const newTweetRef = doc(collection(db, "tweets"));
        await setDoc(newTweetRef, {
          id: newTweetRef.id,
          tweet_body: tweetBody.value,
          uid: currentUser.value.uid,
          created_at: Date.now(),
          num_comments: 0,
          num_retweets: 0,
          num_likes: 0,
        });
        tweetBody.value = "";
      } catch (e) {
        console.log("트윗 에러 메시지", e);
      }
    };

    return { currentUser, tweetBody, onAddTweet, tweets };
  },
};
</script>

<style></style>
