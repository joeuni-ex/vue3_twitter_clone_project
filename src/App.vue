vue
<template>
  <div class="flex h-screen container mx-auto">
    <!-- 사이드 섹션 -->
    <div
      class="w-20 lg:w-1/4 pt-5 lg:ml-10 flex flex-col justify-between border-r border-gray-200"
    >
      <div class="flex flex-col items-center lg:items-start">
        <!-- 트위터 로고 -->
        <i class="fab fa-twitter text-3xl text-primary lg:ml-4 mb-3"></i>
        <!-- 트위터 사이드 메뉴 -->
        <div class="flex flex-col items-start space-y-1">
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fas fa-home fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">홈</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fas fa-hashtag fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">탐색하기</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="far fa-bell fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">알림</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="far fa-envelope fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">쪽지</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="far fa-bookmark fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">북마크</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="far fa-list-alt fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">리스트</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="far fa-user fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">프로필</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fas fa-ellipsis-h fa-fw text-2xl"></i>
            <span class="ml-3 text-lg hidden lg:inline-block">더보기</span>
          </div>
        </div>
        <!-- 트윗 버튼 -->
        <div class="w-full h-12 lg:pr-3 flex justify-center">
          <button
            class="mt-3 bg-primary text-white lg:w-full w-12 h-12 rounded-full hover:bg-dark"
          >
            <span class="hidden lg:block">트윗</span>
            <i class="fas fa-plus lg:hidden"></i>
          </button>
        </div>
      </div>
      <!-- 프로필 버튼 -->
      <div class="lg:mr-3 mb-3">
        <button
          class="hidden lg:flex mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 items-center"
        >
          <!-- 100은 이미지 사이즈임  -->
          <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
          <div class="lg:ml-2 hidden lg:block">
            <div class="text-sm font-bold">dmsdl8917</div>
            <div class="text-xs text-gray-500 text-left">id89189</div>
          </div>
          <i
            class="ml-auto fas fa-ellipsis-h fa-fw text-xs hidden lg:block"
          ></i>
        </button>
        <div class="lg:hidden flex justify-center">
          <img
            src="http://picsum.photos/100"
            class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
          />
        </div>
      </div>
    </div>
    <!-- 메인 섹션 -->
    <div class="flex-1">
      <div class="flex h-screen">
        <!-- 메인 파트 -->
        <div class="flex-1 border-r border-gray-100 overflow-y-auto">
          <div class="flex flex-col">
            <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">
              홈
            </div>
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
                    <i
                      class="far fa-comment hover:bg-blue-50 rounded-full p-2"
                    ></i>
                    <span class="ml-1 text-sm">10</span>
                  </div>
                  <div class="text-gray-500 hover:text-green-500">
                    <i
                      class="fas fa-retweet hover:bg-green-50 rounded-full p-2"
                    ></i>
                    <span class="ml-1 text-sm">10</span>
                  </div>
                  <div class="text-gray-500 hover:text-red-500">
                    <i
                      class="far fa-heart hover:bg-red-50 rounded-full p-2"
                    ></i>
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
        <Trends />
      </div>
    </div>
  </div>
</template>

<script>
import Trends from "./components/Trends.vue";
export default { components: { Trends } };
</script>

<style></style>
