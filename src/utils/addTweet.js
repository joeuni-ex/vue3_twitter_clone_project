import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default (tweetBody, currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      //tweet 저장하기
      const newTweetRef = doc(collection(db, "tweets"));
      await setDoc(newTweetRef, {
        id: newTweetRef.id,
        tweet_body: tweetBody,
        uid: currentUser.uid,
        created_at: Date.now(),
        num_comments: 0,
        num_retweets: 0,
        num_likes: 0,
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
