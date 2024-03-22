<template>
  <!-- 트윗들 -->
  <div
    class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
  >
    <img
      :src="currentUser.profile_image_url"
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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
        expedita , et rem non.
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
          <i class="far fa-share-square hover:bg-blue-50 rounded-full p-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentUser"],
};
</script>

<style></style>
