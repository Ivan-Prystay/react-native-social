import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getSatte) => {
    console.log("email, password, nickname", email, password, nickname);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser = () => async (dispatch, getState) => {};

export const authSignOutUser = () => async (dispatch, getState) => {};
