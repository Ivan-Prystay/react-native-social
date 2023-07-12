import { auth, storage } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, nickname, avatar }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(auth.currentUser, { displayName: nickname });

      // Завантаження аватарки користувача до Firebase Storage
      const response = await fetch(avatar);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/avatar_${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);

      // Отримання посилання на завантажену аватарку
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          avatarURL: downloadURL,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
      alert("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `avatars/avatar_${user.uid}.jpg`);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          avatarURL: downloadURL,
        })
      );
    } catch (error) {
      console.log("error.message", error.message),
        alert(`Error: ${error.message}`);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(
      authSlice.actions.updateUserProfile({
        userId: null,
        nickname: null,
        avatarURL: null,
      })
    );
    alert("user is Out");
  } catch (error) {
    console.log("error.message", error.message),
      alert("error.message", error.message);
  }
};
