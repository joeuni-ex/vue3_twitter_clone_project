import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export default async (tweet, currentUser) => {
  //user Info
  const docRef = doc(db, "users", tweet.uid);
  const docSnap = await getDoc(docRef); // users에서 user.uid로 검색한 결과 가져옴
  // tweet.profile_image_url = docSnap.data().profile_image_url;
  // tweet.email = docSnap.data().email;
  // tweet.username = docSnap.data().username;
  tweet = { ...tweet, ...docSnap.data() };

  // Adding retweet Info
  const retweetRef = collection(db, "retweets");

  const q = query(
    retweetRef,
    where("from_tweet_id", "==", tweet.id),
    where("uid", "==", currentUser.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    tweet.isRetweeted = false;
  } else {
    tweet.isRetweeted = true;
  }

  // Adding like Info
  const likesRef = collection(db, "likes");

  const likesq = query(
    likesRef,
    where("from_tweet_id", "==", tweet.id),
    where("uid", "==", currentUser.uid)
  );

  const likesSnapshot = await getDocs(likesRef);

  if (likesSnapshot.empty) {
    tweet.isLiked = false;
  } else {
    tweet.isLiked = true;
  }

  return tweet;
};
