import { useState } from "react";
import styled from "styled-components/native";

import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";

//*             INITIAL   STATE        //

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback
        onPress={() => (setIsShowKeyboard(false), Keyboard.dismiss())}
      >
        <Container>
          <BackgroundImage source={require("../../assets/images/photo_bg.png")}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <Form>
                <FormTitle>Login</FormTitle>

                {/* //? E-mail//? E-mail//? E-mail//? E-mail//? E-mail /// */}

                <Input
                  placeholder="E-mail"
                  value={state.email}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused1(true))}
                  onBlur={() => setIsFocused1(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  isFocused={isFocused1}
                />

                {/* //! Password //? Password//? Password//? Password//? */}

                <Input
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused2(true))}
                  onBlur={() => (
                    setIsShowKeyboard(false), setIsFocused2(false)
                  )}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  isFocused={isFocused2}
                />

                {!isShowKeyboard && (
                  <>
                    <Login
                      activeOpacity={0.8}
                      onPress={() => (
                        console.log("state: ", { state }),
                        navigation.navigate("Home",   
                        {screen:"Posts"}
                        
                        ),
                        setState(initialState)
                      )}
                      disabled={state.email === "" || state.password === ""}
                    >
                      <LoginText>SIGN IN</LoginText>
                    </Login>
                    <Link
                      onPress={() => navigation.navigate("Registration")}
                      activeOpacity={0.5}
                    >
                      <TextLink>Don't have an account? Register</TextLink>
                    </Link>
                  </>
                )}
              </Form>
            </KeyboardAvoidingView>
          </BackgroundImage>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
}

//*                   STYLED   COMPONENTS           //

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;
const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
  background-size: cover;
`;
const Form = styled(View)`
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-bottom: 16px;
`;
const FormTitle = styled(Text)`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  color: #212121;
  margin-top: 72px;
  margin-bottom: 20px;
`;
const Input = styled(TextInput)`
  border-width: 1px;
  background-color: #f6f6f6;
  border-radius: 8px;
  height: 50px;
  font-size: 16px;
  margin: 0px 16px 16px;
  padding: 16px;
  border-color: ${(props) => (props.isFocused ? "#FF6C00" : "transparent")};
`;
const Login = styled(TouchableOpacity)`
  margin: 27px 16px 0;
  border-radius: 100px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#FF6C00")};
`;
const LoginText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  padding: 16px;
`;
const Link = styled(TouchableOpacity)`
  margin: 16px auto 42px;
`;
const TextLink = styled(Text)`
  text-align: center;
  color: #1b4371;
  font-size: 16px;
  font-weight: 400;
`;
