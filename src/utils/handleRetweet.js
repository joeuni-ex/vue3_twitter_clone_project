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
    //이미 리트윗된 상태인지 확인하기
    //리트윗 삭제 트윗 게시물에 리트윗 숫자 줄이기
    if (tweet.isRetweeted) {
      const q = query(
        collection(db, "retweets"),
        where("from_tweet_id", "==", tweet.id),
        where("uid", "==", store.state.user.uid)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const retweetDoc = snapshot.docs[0]; // 첫 번째 문서 가져오기
        await deleteDoc(retweetDoc.ref);

        const updateTweetRef = doc(db, "tweets", tweet.id);

        //retweet에서 retweet 수 증가
        await updateDoc(updateTweetRef, {
          num_retweets: increment(-1),
        });
      }
    } else {
      //리트윗 하지 않은 상황
      //retweet 저장하기
      const newRetweetRef = doc(collection(db, "retweets"));
      await setDoc(newRetweetRef, {
        id: newRetweetRef.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      });

      const updateTweetRef = doc(db, "tweets", tweet.id);

      //tweet에서 comment 수 증가
      await updateDoc(updateTweetRef, {
        num_retweets: increment(1),
      });
    }
  } catch (e) {
    console.log("object retweet error:", e);
  }
};
