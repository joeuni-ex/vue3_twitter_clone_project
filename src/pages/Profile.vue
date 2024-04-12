<template>
  <div class="flex flex-1" v-if="profileUser">
    <!-- 프로필 섹션 -->
    <div class="flex-1 flex flex-col border-r border-color">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-color">
        <button class="mr-4" @click="router.go(-1)">
          <i
            class="fas fa-arrow-left text-primary p-3 py-1 rounded-full hover:bg-blue-50"
          ></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ profileUser.email }}</div>
          <div class="text-xs text-gray">{{ profileUser.num_tweets }} 트윗</div>
        </div>
      </div>
      <!-- 프로필 백그라운드 이미지-->
      <div class="bg-gray-300 h-48 relative flex-none">
        <img
          :src="`${profileUser.background_image_url}`"
          class="w-full h-48 object-cover"
        />
        <!-- 프로필이미지 -->
        <div
          class="w-28 h-28 border-4 border-white bg-gray-100 rounded-full absolute -bottom-14 left-2"
        >
          <img
            :src="`${profileUser.profile_image_url}`"
            class="w-full h-full rounded-full opacity-90 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
      <!-- 프로필 수정 버튼 -->
      <div class="text-right mr-2 mt-2">
        <button
          v-if="currentUser.uid === profileUser.uid"
          @click="showProfileEditModal = true"
          class="border border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full text-sm"
        >
          프로필 수정
        </button>
      </div>
      <!-- 유저 정보 -->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">{{ profileUser.email }}</div>
        <div class="text-gray">@{{ profileUser.username }}</div>
        <div>
          <span class="text-gray">가입일:</span>
          <span class="text-gray">
            {{ moment(profileUser.created_at).format("YYYY년 MM월") }}</span
          >
        </div>
        <div>
          <span class="font-bold mr-1">{{
            profileUser.followings.length
          }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">{{ profileUser.followers.length }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!-- 탭들 -->
      <div class="flex border-b border-color mt-3">
        <div
          @click="currentTab = 'tweet'"
          :class="`${
            currentTab == 'tweet' ? 'border-b border-primary' : 'text-gray'
          } py-3 w-1/3 text-primary font-bold  text-center hover:bg-blue-50 cursor-pointer hover:text-primary`"
        >
          트윗
        </div>
        <div
          @click="currentTab = 'retweet'"
          :class="`${
            currentTab == 'retweet' ? 'border-b border-primary' : 'text-gray'
          } py-3 w-1/3 text-primary font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary`"
        >
          리트윗
        </div>
        <div
          @click="currentTab = 'like'"
          :class="`${
            currentTab == 'like' ? 'border-b border-primary' : 'text-gray'
          } py-3 w-1/3 text-primary font-bold  text-center hover:bg-blue-50 cursor-pointer hover:text-primary`"
        >
          좋아요
        </div>
      </div>
      <!-- 트윗들 -->
      <div class="overflow-y-auto">
        <Tweet
          v-for="tweet in currentTab == 'tweet'
            ? tweets
            : currentTab == 'retweet'
            ? reTweets
            : likes"
          :tweet="tweet"
          :key="tweet"
          :currentUser="currentUser"
        />
      </div>
    </div>
    <!-- 트랜드 섹션 -->
    <Trends />
    <profile-edit-modal
      v-if="showProfileEditModal"
      @close-modal="showProfileEditModal = false"
    />
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
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import getTweetInfo from "../utils/getTweetInfo";
import moment from "moment";
import { useRoute } from "vue-router";
import router from "../router";
import ProfileEditModal from "../components/ProfileEditModal.vue";

export default {
  components: { Trends, Tweet, ProfileEditModal },
  setup() {
    const currentUser = computed(() => store.state.user);
    const profileUser = ref(null);
    const tweets = ref([]);
    const reTweets = ref([]);
    const likes = ref([]);
    const currentTab = ref("tweet");
    const route = useRoute();

    const showProfileEditModal = ref(false);

    onBeforeMount(() => {
      const profileUID = route.params.uid ?? currentUser.value.uid;

      //get user
      const userDocRef = doc(db, "users", profileUID);
      const getUserInfo = query(userDocRef);
      const un = onSnapshot(getUserInfo, (doc) => {
        profileUser.value = doc.data();
      });

      //get tweets
      const tweetsQuery = query(
        collection(db, "tweets"),
        where("uid", "==", profileUID),
        orderBy("created_at", "desc")
      );
      const tweetsUn = onSnapshot(tweetsQuery, (snapshot) => {
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

      //get retweets
      const retweetsQuery = query(
        collection(db, "retweets"),
        where("uid", "==", profileUID),
        orderBy("created_at", "desc")
      );
      const retweetsUn = onSnapshot(retweetsQuery, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const docRef = doc(db, "tweets", change.doc.data().from_tweet_id);
          const docSnap = await getDoc(docRef); // Fetch the document snapshot

          if (docSnap.exists()) {
            // Ensure the document exists
            let retweet = await getTweetInfo(docSnap.data(), currentUser.value);

            if (change.type === "added") {
              reTweets.value.splice(change.newIndex, 0, retweet);
            }
            if (change.type === "modified") {
              reTweets.value.splice(change.oldIndex, 1, retweet);
            }
            if (change.type === "removed") {
              reTweets.value.splice(change.oldIndex, 1);
            }
          }
        });
      });

      //get likes
      const likesQuery = query(
        collection(db, "likes"),
        where("uid", "==", profileUID),
        orderBy("created_at", "desc")
      );
      const likesUn = onSnapshot(likesQuery, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const docRef = doc(db, "tweets", change.doc.data().from_tweet_id);
          const docSnap = await getDoc(docRef); // Fetch the document snapshot

          if (docSnap.exists()) {
            // Ensure the document exists
            let like = await getTweetInfo(docSnap.data(), currentUser.value);

            if (change.type === "added") {
              likes.value.splice(change.newIndex, 0, like);
            }
            if (change.type === "modified") {
              likes.value.splice(change.oldIndex, 1, like);
            }
            if (change.type === "removed") {
              likes.value.splice(change.oldIndex, 1);
            }
          }
        });
      });
    });

    return {
      currentUser,
      profileUser,
      tweets,
      reTweets,
      likes,
      moment,
      currentTab,
      router,
      showProfileEditModal,
    };
  },
};
</script>

<style></style>
