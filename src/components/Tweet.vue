<template>
  <!-- 트윗들 -->
  <div
    class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
  >
    <router-link :to="`/profile/${tweet.uid}`">
      <img
        :src="currentUser.profile_image_url"
        class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
    /></router-link>

    <div class="ml-3 placeholder:flex-1 flex flex-col">
      <div class="text-sm space-x-1">
        <span class="font-bold">{{ tweet.email }}</span>
        <span>@{{ tweet.username }}</span>
        <span class="text-gray-500 text-xs">.</span>
        <span class="text-gray-500 text-xs">{{
          moment(tweet.created_at).fromNow()
        }}</span>
      </div>
      <!-- 트윗 바디 -->
      <router-link :to="`/tweet/${tweet.id}`">
        {{ tweet.tweet_body }}
      </router-link>
      <!-- 트윗 아이콘 -->
      <div class="flex justify-between">
        <!-- 코멘트 버튼  -->
        <div
          @click="showCommentModal = true"
          class="text-gray-500 hover:text-primary"
        >
          <i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
        </div>
        <!-- 리트윗 버튼  -->
        <div
          @click="handleRetweet(tweet)"
          :class="`${
            tweet.isRetweeted ? 'text-green-400' : 'text-gray-500'
          } hover:text-green-500`"
        >
          <i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
        </div>
        <!-- 라이크 버튼  -->
        <div
          v-if="tweet.isLiked"
          @click="handleLikes(tweet)"
          class="text-red-400 hover:text-red-500`"
        >
          <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>
        <div
          v-else
          @click="handleLikes(tweet)"
          class="text-gray-400 hover:text-red-500`"
        >
          <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>

        <!-- 쉐어 버튼  -->
        <div class="text-gray-500 hover:text-primary">
          <i class="far fa-share-square hover:bg-blue-50 rounded-full p-2"></i>
        </div>
      </div>
    </div>
  </div>
  <CommentModal
    v-if="showCommentModal"
    @close-modal="showCommentModal = false"
    :tweet="tweet"
  />
</template>

<script>
import moment from "moment";
import CommentModal from "./CommentModal.vue";
import { ref } from "vue";
import handleRetweet from "../utils/handleRetweet";
import handleLikes from "../utils/handleLikes";

export default {
  components: { CommentModal },
  props: ["currentUser", "tweet"],
  setup() {
    const showCommentModal = ref(false);

    return {
      moment,
      showCommentModal,
      handleRetweet,
      handleLikes,
    };
  },
};
</script>

<style></style>
