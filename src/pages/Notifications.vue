<template>
  <!-- notifications -->
  <div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
    <div class="p-3 font-bold text-lg border-b border-gray-100">알림</div>
    <!-- 알림 -->
    <div
      class="flex flex-col hover:bg-gray-50 p-3 space-y-2 border-b border-gray-100 cursor-pointer"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="flex justify-between">
        <router-link :to="`/profile/${notification.uid}`">
          <img
            :src="`${notification.profile_image_url}`"
            class="w-10 h-10 rounded-full hover:opacity-80"
          />
        </router-link>
        <i
          class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-10 flex items-center justify-center"
        ></i>
      </div>
      <div class="font-bold">{{ notification.username }}님의 최근 트윗</div>
      <router-link :to="`/tweet/${notification.id}`" class="text-gray-500">
        {{ notification.tweet_body }}
      </router-link>
    </div>
  </div>
  <!-- trends -->
  <Trends />
</template>

<script>
import Trends from "../components/Trends.vue";
import { ref, computed, onBeforeMount } from "vue";
import store from "../store";
import { collection, orderBy, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import getTweetInfo from "../utils/getTweetInfo";

export default {
  components: { Trends },
  setup() {
    const currentUser = computed(() => store.state.user);
    const notifications = ref([]);

    onBeforeMount(() => {
      currentUser.value.followings.forEach(async (following) => {
        // Adding retweet Info
        const tweetRef = collection(db, "tweets");
        const dataFrom = Date.now() - 60 * 60 * 24 * 30 * 1000; //일주일

        const q = query(
          tweetRef,
          where("uid", "==", following),
          where("created_at", ">", dataFrom),
          orderBy("created_at", "desc")
        );

        const snapshot = await getDocs(q);

        snapshot.forEach(async (doc) => {
          let tweet = await getTweetInfo(doc.data(), currentUser.value);
          notifications.value.push(tweet);
        });
      });
    });

    return {
      currentUser,
      notifications,
    };
  },
};
</script>

<style></style>
