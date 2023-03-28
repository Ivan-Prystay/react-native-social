import { useState } from "react";
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
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
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
              <Text style={styles.formTitle}>Login</Text>
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
                    disabled={state.email === "" || state.password === ""}
                  >
                    <Text style={styles.btnText}>SIGN IN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                    activeOpacity={0.5}
                    style={styles.link}
                  >
                    <Text style={styles.linkText}>
                      Don't have an account? Register
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
    marginTop: 32,
    marginBottom: 32,
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
});
