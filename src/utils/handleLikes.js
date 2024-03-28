import {
  doc,
  setDoc,
  collection,
  updateDoc,
  increment,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import store from "../store";

export default async (tweet) => {
  try {
    //이미 좋아요된 상태인지 확인하기
    if (tweet.isLiked) {
      const q = query(
        collection(db, "likes"),
        where("from_tweet_id", "==", tweet.id),
        where("uid", "==", store.state.user.uid)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const retweetDoc = snapshot.docs[0]; // 첫 번째 문서 가져오기
        await deleteDoc(retweetDoc.ref);

        const updateTweetRef = doc(db, "tweets", tweet.id);

        //tweet에서 likes 수 감소
        await updateDoc(updateTweetRef, {
          num_likes: increment(-1),
        });
      }
    } else {
      //likes 하지 않은 상황
      //likes 저장하기
      const newLikesRef = doc(collection(db, "likes"));
      await setDoc(newLikesRef, {
        id: newLikesRef.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      });

      const updateTweetRef = doc(db, "tweets", tweet.id);

      //tweet에서 likes 수 증가
      await updateDoc(updateTweetRef, {
        num_likes: increment(1),
      });
    }
  } catch (e) {
    console.log("object retweet error:", e);
  }
};
