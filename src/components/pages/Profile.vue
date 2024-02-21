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
    </div>
    <!-- 트랜드 섹션 -->
    <Trends />
  </div>
</template>

<script>
import Trends from "../Trends.vue";

export default { components: { Trends } };
</script>

<style></style>
