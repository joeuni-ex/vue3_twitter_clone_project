<template>
  <div class="flex flex-1">
    <!-- 프로필 섹션 -->
    <div class="flex-1 flex-col border-r border-color">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-color">
        <button class="mr-4">
          <i
            class="fas fa-arrow-left text-primary p-3 py-1 rounded-full hover:bg-blue-50"
          ></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">이름</div>
          <div class="text-xs text-gray">232 트윗</div>
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
        <div class="font-extrabold text-lg">이름</div>
        <div class="text-gray">아이디</div>
        <div>
          <span class="text-gray">가입일:</span>
          <span class="text-gray">2011년 10월</span>
        </div>
        <div>
          <span class="font-bold mr-1">28</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">27</span>
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
      <div class="overflow-y-auto h-screen">
        <Tweet v-for="tweet in 10" :key="tweet" />
      </div>
    </div>
    <!-- 트랜드 섹션 -->
    <Trends />
  </div>
</template>

<script>
import Trends from "../Trends.vue";
import Tweet from "../Tweet.vue";

export default { components: { Trends, Tweet } };
</script>

<style></style>
