<template>
  <div class="flex-1 flex">
    <!-- 채팅 리스트 -->
    <div class="w-2/5 border-r border-gray-100 overflow-y-auto">
      <div class="flex flex-col">
        <div class="p-3 h-14 font-bold text-lg border-b border-gray-100">
          쪽지
        </div>
        <!-- 하나의 채팅 리스트 -->
        <div
          @click="onSelectUser(user)"
          class="flex items-center cursor-pointer px-3 py-4 hover:bg-gray-50 border-gray-100"
          v-for="user in users"
          :key="user.id"
        >
          <img
            :src="user.profile_image_url"
            class="w-10 h-10 rounded-full cursor-pointer mr-2"
          />

          <div class="flex space-x-2">
            <div class="font-bold">{{ user.email }}</div>
            <div class="text-gray-500">@{{ user.username }}</div>
            <div class="text-gray-500">
              {{ moment(user.created_at).format("M월 DD일") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 채팅 -->
    <div class="w-3/5 border-r border-gray-100" v-if="selectedUser">
      <div class="flex flex-col h-screen">
        <!-- title -->
        <div class="flex px-3 h-14 border-n border-gray-100 items-center">
          <img
            :src="selectedUser.profile_image_url"
            class="w-8 h-8 rounded-full mr-2 cursor-pointer"
          />
          <div>
            <div class="font-bold text-lg">{{ selectedUser.email }}</div>
            <div class="text-sm text-gray-500">
              @{{ selectedUser.username }}
            </div>
          </div>
        </div>
        <!-- 유저 정보 -->
        <div
          class="flex justify-center items-center border-b border-gray-100 hover:bg-gray-50 py-6"
        >
          <div class="flex flex-col justify-center items-center">
            <div>
              <span class="font-bold mr-1">{{ selectedUser.email }}</span>
              <span class="text-gray-500">@{{ selectedUser.username }}</span>
            </div>
            <div>
              <span class="font-bold mr-1">{{
                selectedUser.followings.length
              }}</span
              ><span class="text-gray-500">팔로우 중</span>
              <span class="font-bold ml-3">{{
                selectedUser.followers.length
              }}</span
              ><span class="text-gray-500">팔로우 </span>
            </div>
            <div>
              <span>가입일 </span>
              <span>
                {{
                  moment(selectedUser.created_at).format("YYYY년 MM월 DD일")
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-for="message in messages" :key="message.id">
            <!-- 챗 말풍선 : 본인 -->
            <div
              v-if="currentUser.uid === message.from_uid"
              class="text-right px-3 py-3"
            >
              <span class="bg-primary text-white px-4 py-2 rounded-full">{{
                message.message_body
              }}</span>
              <div class="mt-2 text-xs text-gray-500">
                {{ moment(message.created_at).fromNow() }}
              </div>
            </div>
            <!-- 챗 말풍선 : 상대방 -->
            <div v-else class="text-left px-3 py-3">
              <span class="bg-gray-100 px-4 py-2 rounded-full">{{
                message.message_body
              }}</span>
              <div class="mt-2 text-xs text-gray-500">
                {{ moment(message.created_at).fromNow() }}
              </div>
            </div>
          </div>
        </div>

        <!-- 키보드 -->
        <div class="flex items-center border-t border-gray-100 sticky">
          <input
            @keyup.enter="onSendMessage"
            v-model="messageBody"
            type="text"
            placeholder="새 쪽지 작성하기"
            class="m-2 px-4 rounded-full bg-gray-100 resize-none outline-none flex-1"
          />
          <button @click="onSendMessage" class="text-center">
            <i
              class="far fa-paper-plane text-primary text-lg hover:bg-blue-50 p-2 rounded-full w-10 h-10"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <div class="w-3/5 border-r border-gray-100 mt-5 pl-5" v-else>
      <div class="font-bold text-lg">선택된 사용자가 없습니다.</div>
      <div class="text-gray">사용자를 선택해 주세요.</div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed, reactive, ref } from "vue";
import store from "../store";

import moment from "moment";
import {
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const users = reactive([]);
    const selectedUser = ref(null);
    const messageBody = ref("");
    const messages = reactive([]);

    onBeforeMount(async () => {
      const q = query(collection(db, "users"), orderBy("created_at", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedUsers = []; // 새로운 배열을 생성
        querySnapshot.forEach((doc) => {
          let user = doc.data();
          if (user.email === currentUser.value.email) return;
          updatedUsers.push(user);
        });
        // Vue의 반응성을 강제로 갱신
        users.splice(0, users.length, ...updatedUsers);
      });
    });

    // 유저 선택 시 메시지 내용 가져오기
    const onSelectUser = async (user) => {
      selectedUser.value = user;

      try {
        // 내 메시지 가져오기
        const myMessagesQuery = query(
          collection(db, "messages"),
          where("from_uid", "==", currentUser.value.uid),
          where("to_uid", "==", selectedUser.value.uid),
          orderBy("created_at")
        );
        const myMessagesSnapshot = await getDocs(myMessagesQuery);
        const myMessages = myMessagesSnapshot.docs.map((doc) => doc.data());

        // 상대방 메시지 가져오기
        const otherUserMessagesQuery = query(
          collection(db, "messages"),
          where("to_uid", "==", currentUser.value.uid),
          where("from_uid", "==", selectedUser.value.uid),
          orderBy("created_at")
        );
        const otherUserMessagesSnapshot = await getDocs(otherUserMessagesQuery);
        const otherUserMessages = otherUserMessagesSnapshot.docs.map((doc) =>
          doc.data()
        );

        // Combine both sets of messages and sort by created_at
        const allMessages = [...myMessages, ...otherUserMessages].sort((a, b) =>
          a.created_at > b.created_at ? 1 : -1
        );

        // Update messages value with the sorted list
        messages.splice(0, messages.length, ...allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const onSendMessage = async () => {
      if (!messageBody.value || !selectedUser.value) return;

      //메시지 저장하기
      const newMessageRef = doc(collection(db, "messages"));
      let message = {
        id: newMessageRef.id,
        from_uid: currentUser.value.uid,
        to_uid: selectedUser.value.uid,
        message_body: messageBody.value,
        created_at: Date.now(),
      };

      await setDoc(newMessageRef, message);

      messages.push(message);
      messageBody.value = "";
    };

    return {
      users,
      currentUser,
      moment,
      selectedUser,
      onSelectUser,
      onSendMessage,
      messageBody,
      messages,
    };
  },
};
</script>

<style></style>
