<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="$emit('close-modal')"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          @click.stop
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white">
            <div
              class="flex items-center justify-between border-b border-gray-100 p-2"
            >
              <button
                @click="$emit('close-modal')"
                class="fas fa-times text-primary text-lg p-2 h-10 w-10 hover:bg-blue-50"
              ></button>
              <div class="text-right sm:hidden mr-2">
                <button
                  v-if="!tweetBody?.length"
                  class="bg-light text-sm font-bold text-white px-4 py-1 rounded-full"
                >
                  답글
                </button>
                <button
                  v-else
                  @click="onAddTweet"
                  class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                >
                  답글
                </button>
              </div>
            </div>
            <div>
              <!-- 오리지널 트윗 -->
              <div class="flex px-4 pt-4 pb-3" v-if="tweet">
                <div class="flex flex-col">
                  <img
                    :src="tweet.profile_image_url"
                    class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
                  />
                  <div class="ml-5 w-0.5 h-full bg-gray-300 mt-2 -mb-1"></div>
                </div>
                <div class="ml-2 flex-1">
                  <div class="flex space-x-2">
                    <span class="font-bold text-sm">{{ tweet.email }}</span>
                    <span class="font-gray text-sm">@{{ tweet.username }}</span>
                    <span class="font-gray text-sm">{{
                      moment(tweet.created_at).fromNow()
                    }}</span>
                  </div>
                  <div class="">
                    {{ tweet.tweet_body }}
                  </div>
                  <div class="">
                    <span class="text-primary text-sm"
                      >@{{ tweet.username }}</span
                    >
                    <span class="font-gray text-sm">님에게 보내는 답글</span>
                  </div>
                </div>
              </div>
              <!-- 트윗팅 섹션 -->
              <div class="flex px-4 pb-4">
                <img
                  :src="currentUser.profile_image_url"
                  class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
                />
                <div class="ml-2 flex-1 flex flex-col">
                  <textarea
                    v-model="tweetBody"
                    placeholder="내 답글을 트윗합니다"
                    class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
                    rows="5"
                  ></textarea>
                  <div class="text-right hidden sm:block">
                    <button
                      v-if="!tweetBody?.length"
                      class="bg-light text-sm font-bold text-white px-4 py-1 rounded-full"
                    >
                      답글
                    </button>
                    <button
                      v-else
                      @click="onCommentTweet"
                      class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                    >
                      답글
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import store from "../store";
import moment from "moment";
import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default {
  props: ["tweet"],
  setup(props, { emit }) {
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);

    //트윗 추가 함수 -> utils의 addTweet함수
    const onCommentTweet = async () => {
      try {
        //커맨트 저장하기
        const newCommentRef = doc(collection(db, "comments"));
        await setDoc(newCommentRef, {
          id: newCommentRef.id,
          from_tweet_id: props.tweet.id,
          tweet_body: tweetBody.value,
          uid: currentUser.value.uid,
          created_at: Date.now(),
        });
        tweetBody.value = "";

        const updateTweetRef = doc(db, "tweets", props.tweet.id);

        //tweet에서 comment 수 증가
        await updateDoc(updateTweetRef, {
          num_comments: increment(1),
        });
        emit("close-modal"); //상위 컴포넌트에 close-modal실행
      } catch (e) {
        console.log("트윗 에러 메시지", e);
      }
    };

    return {
      tweetBody,
      onCommentTweet,
      currentUser,
      moment,
    };
  },
};
</script>
