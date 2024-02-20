<template>
  <!-- 메인 파트 -->
  <div class="flex-1 border-r border-gray-100 overflow-y-auto">
    <div class="flex flex-col">
      <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">홈</div>
      <!-- 트윗팅 섹션 -->
      <div class="flex px-3 py-3 border-b-8 border-gray-100">
        <img
          src="http://picsum.photos/200"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-2 flex-1 flex flex-col">
          <textarea
            placeholder="무슨 일이 일어나고 있나요?"
            class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
          ></textarea>
          <div class="text-right">
            <button
              class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
            >
              트윗
            </button>
          </div>
        </div>
      </div>
      <!-- 트윗들 -->
      <div
        class="flex px-3 py-3 border-b border-gray-100"
        v-for="tweet in 10"
        :key="tweet"
      >
        <img
          src="http://picsum.photos/200"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-3 placeholder:flex-1 flex flex-col">
          <div class="text-sm space-x-1">
            <span class="font-bold">석지니</span>
            <span>.</span>
            <span class="text-gray-500 text-xs">석지니</span>
            <span class="text-gray-500 text-xs">7분</span>
          </div>
          <!-- 트윗 바디 -->
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur expedita , et rem non.
          </div>
          <!-- 트윗 아이콘 -->
          <div class="flex justify-between">
            <div class="text-gray-500 hover:text-primary">
              <i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
              <span class="ml-1 text-sm">10</span>
            </div>
            <div class="text-gray-500 hover:text-green-500">
              <i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
              <span class="ml-1 text-sm">10</span>
            </div>
            <div class="text-gray-500 hover:text-red-500">
              <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
              <span class="ml-1 text-sm">10</span>
            </div>
            <div class="text-gray-500 hover:text-primary">
              <i
                class="far fa-share-square hover:bg-blue-50 rounded-full p-2"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 트랜드 파트 -->
  <Notifications />
  <Trends />
</template>

<script>
import Notifications from "./Notifications.vue";
import Trends from "../Trends.vue";

export default { components: { Trends, Notifications } };
</script>

<style></style>
