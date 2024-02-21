<template>
  <!-- notifications -->
  <div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
    <div class="p-3 font-bold text-lg border-b border-gray-100">알림</div>
    <!-- 알림 -->
    <div
      class="flex flex-col hover:bg-gray-50 p-3 space-y-2 border-b border-gray-100 cursor-pointer"
      v-for="notification in 10"
      :key="notification"
    >
      <div class="flex justify-between">
        <img
          src="http://picsum.photos/100"
          class="w-10 h-10 rounded-full hover:opacity-80"
        />
        <i
          class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-10 flex items-center justify-center"
        ></i>
      </div>
      <div class="font-bold">조은수님의 최근 트윗</div>
      <div class="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
        sapiente laborum porro eos cupiditate aut eaque deserunt, sunt
        laboriosam provident eum impedit reprehenderit corrupti eveniet? Fuga
        sed nemo pariatur impedit.
      </div>
    </div>
  </div>
  <!-- trends -->
  <Trends />
</template>

<script>
import Trends from "../components/Trends.vue";

export default { components: { Trends } };
</script>

<style></style>
