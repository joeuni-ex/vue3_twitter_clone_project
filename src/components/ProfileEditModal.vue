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
              <div class="flex items-center">
                <button
                  @click="$emit('close-modal')"
                  class="flex items-center justify-center fas fa-times text-primary text-lg p-2 h-10 w-10 hover:bg-blue-50"
                ></button>
                <span class="font-bold text-lg">프로필 수정</span>
              </div>
              <div class="text-right mr-2">
                <button
                  @click="onSaveProfile"
                  class="hover:bg-dark bg-primary text-white font-bold px-3 py-1 rounded-full"
                >
                  저장
                </button>
              </div>
            </div>
            <!-- image section -->

            <div class="h-60">
              <!-- background image -->
              <div
                class="bg-gray-300 h-40 relative flex-none flex items-center justify-center"
              >
                <img
                  :src="`${currentUser.background_image_url}`"
                  ref="backgroundImage"
                  class="object-cover absolute h-full w-full"
                />
                <button
                  @click="onChangeBackgroundImage"
                  class="absolute h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-lg"
                ></button>
                <input
                  @change="previewBackgroundImage"
                  type="file"
                  accept="image/"
                  id="backgroundImageInput"
                  class="hidden"
                />

                <!-- profile image -->
                <img
                  :src="`${currentUser.profile_image_url}`"
                  ref="profileImage"
                  class="border-4 border-white w-28 h-28 absolute -bottom-14 left-2 rounded-full"
                />
                <button
                  @click="onChangeProfileImage"
                  class="absolute h-10 w-10 -bottom-5 left-11 hover:text-gray-200 rounded-full fas fa-camera text-white text-lg"
                ></button>
                <input
                  @change="previewProfileImage"
                  type="file"
                  accept="image/"
                  id="profileImageInput"
                  class="hidden"
                />
              </div>
            </div>
            <div class="flex flex-col p-2">
              <div
                class="mx-2 my-1 px-2 py-1 text-gray border border-gray-200 rounded hover:border-primary hover:text-primary"
              >
                <div class="text-sm">이름</div>
                <input
                  type="text"
                  :value="currentUser.email"
                  class="text-black focus:outline-none"
                />
              </div>
              <div
                class="mx-2 my-1 px-2 py-5 text-gray border border-gray-200 rounded hover:border-primary hover:text-primary"
              >
                <input
                  type="text"
                  class="text-black focus:outline-none"
                  placeholder="자기소개"
                />
              </div>
              <div
                class="mx-2 my-1 px-2 py-1 text-gray border border-gray-200 rounded hover:border-primary hover:text-primary"
              >
                <input
                  type="text"
                  class="text-black focus:outline-none"
                  placeholder="위치"
                />
              </div>
              <div
                class="mx-2 my-1 px-2 py-3 text-gray border border-gray-200 rounded hover:border-primary hover:text-primary"
              >
                <input
                  type="text"
                  class="text-black focus:outline-none"
                  placeholder="웹사이트"
                />
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
import addTweet from "../utils/addTweet";
import store from "../store";
import { storage, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  uploadString,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
export default {
  setup(props, { emit }) {
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);

    const backgroundImage = ref(null);
    const backgroundImageData = ref(null);
    const profileImageData = ref(null);
    const profileImage = ref(null);

    //트윗 추가 함수 -> utils의 addTweet함수
    const onAddTweet = async () => {
      try {
        addTweet(tweetBody.value, currentUser.value);
        tweetBody.value = "";
        emit("close-modal"); //상위 컴포넌트에 close-modal실행
      } catch (e) {
        console.log("트윗 에러 메시지", e);
      }
    };

    const onChangeBackgroundImage = () => {
      document.getElementById("backgroundImageInput").click();
    };

    const onChangeProfileImage = () => {
      document.getElementById("profileImageInput").click();
    };

    const previewBackgroundImage = (e) => {
      const file = e.target.files[0];
      let reader = new FileReader();
      //이미지 선택되었을 때
      backgroundImageData.value = file;

      reader.onload = function (e) {
        backgroundImage.value.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const previewProfileImage = (e) => {
      const file = e.target.files[0];
      let reader = new FileReader();
      //이미지 선택되었을 때
      profileImageData.value = file;

      reader.onload = function (e) {
        profileImage.value.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const onSaveProfile = async () => {
      if (!profileImageData.value && !backgroundImageData.value) {
        return;
      }

      try {
        if (profileImageData.value) {
          const profileStorageRef = storageRef(
            storage,
            `profile/${currentUser.value.uid}/profile`
          );
          const profileSnapshot = await uploadBytes(
            profileStorageRef,
            profileImageData.value
          );
          const profileImageUrl = await getDownloadURL(profileSnapshot.ref);

          const userDocRef = doc(db, "users", currentUser.value.uid);
          await updateDoc(userDocRef, { profile_image_url: profileImageUrl });

          store.commit("SET_PROFILE_IMAGE", profileImageUrl);
        }
      } catch (e) {
        console.error("Error uploading profile images:", error);
      }

      try {
        if (backgroundImageData.value) {
          const backgroundStorageRef = storageRef(
            storage,
            `profile/${currentUser.value.uid}/background`
          );
          const backgroundSnapshot = await uploadBytes(
            backgroundStorageRef,
            backgroundImageData.value
          );
          const backgroundImageUrl = await getDownloadURL(
            backgroundSnapshot.ref
          );

          const userDocRef = doc(db, "users", currentUser.value.uid);
          await updateDoc(userDocRef, {
            background_image_url: backgroundImageUrl,
          });

          store.commit("SET_BACKGROUND_IMAGE", backgroundImageUrl);
        }
      } catch (e) {
        console.error("Error uploading profile images:", error);
      }

      emit("close-modal");
    };

    return {
      tweetBody,
      onAddTweet,
      currentUser,
      onChangeBackgroundImage,
      onChangeProfileImage,
      previewBackgroundImage,
      backgroundImage,
      profileImage,
      previewProfileImage,
      onSaveProfile,
      backgroundImageData,
      profileImageData,
    };
  },
};
</script>
