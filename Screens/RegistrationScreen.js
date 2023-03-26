import { useState } from "react";

import Svg, { Circle, Path } from "react-native-svg";

import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => (setIsShowKeyboard(false), Keyboard.dismiss())}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/photo_bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View style={styles.form}>
              <View style={styles.photoWrap}>
                <TouchableOpacity style={styles.addPhoto} activeOpacity={1}>
                  <Svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Circle
                      cx="12.5"
                      cy="12.5"
                      r="12"
                      fill="#fff"
                      stroke="#FF6C00"
                    />
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
                      fill="#FF6C00"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Registartion</Text>
              {/* //? LOGIN // //? LOGIN // //? LOGIN ////? LOGIN // // */}
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  value={state.login}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              {/* //? E-mail//? E-mail//? E-mail//? E-mail//? E-mail /// */}
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              {/* //? Password //? Password//? Password//? Password//? */}
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onBlur={() => setIsShowKeyboard(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>

              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => (
                      console.log("state: ", { state }), setState(initialState)
                    )}
                    disabled={
                      state.email === "" ||
                      state.password === "" ||
                      state.login === ""
                    }
                  >
                    <Text style={styles.btnText}>SIGN UP</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={styles.link}>
                    <Text style={styles.linkText}>
                      Already have an account? Entry
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "content",
    justifyContent: "flex-end",
  },

  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 16,
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
    marginTop: 72,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  btn: {
    marginTop: 27,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 400,
    padding: 16,
  },
  link: {
    marginTop: 16,
    marginBottom: 42,
  },
  linkText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
  },
  photoWrap: {
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    display: "flex",
    alignSelf: "center",
  },
  addPhoto: {
    left: 107,
    top: 77,
  },
});
