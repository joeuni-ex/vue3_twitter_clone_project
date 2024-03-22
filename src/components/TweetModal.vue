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
            <div class="border-b border-gray-100 p-2">
              <button
                class="fas fa-times text-primary text-lg p-2 h-10 w-10 hover:bg-blue-50"
              ></button>
            </div>
            <!-- 트윗팅 섹션 -->
            <div class="flex p-4">
              <img
                src="http://picsum.photos/100"
                class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
              />
              <div class="ml-2 flex-1 flex flex-col">
                <textarea
                  v-model="tweetBody"
                  placeholder="무슨 일이 일어나고 있나요?"
                  class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
                  rows="5"
                ></textarea>
                <div class="text-right">
                  <button
                    v-if="!tweetBody?.length"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const tweetBody = ref("");

    return {
      tweetBody,
    };
  },
};
</script>
