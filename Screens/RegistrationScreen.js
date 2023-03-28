import { useState } from "react";
import styled from "styled-components/native";
import Svg, { Circle, Path } from "react-native-svg";

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
const Register = styled(TouchableOpacity)`
  margin: 27px 16px 0;
  border-radius: 100px;
  background-color: ${(props) => (props.disabled ? "lightgray" : "#FF6C00")};
`;
const RegisterText = styled(Text)`
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

const WrapPhoto = styled(View)`
  height: 120px;
  width: 120px;
  border-radius: 16px;
  background-color: #f6f6f6;
  position: absolute;
  top: -60px;
  display: flex;
  align-self: center;
`;

const AddPhoto = styled(TouchableOpacity)`
  left: 107px;
  top: 77px;
`;

//*             INITIAL   STATE        //
const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback
        onPress={() => (setIsShowKeyboard(false), Keyboard.dismiss())}
      >
        <Container>
          <BackgroundImage source={require("../assets/images/photo_bg.png")}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <Form>
                <WrapPhoto>
                  <AddPhoto activeOpacity={1}>
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
                  </AddPhoto>
                </WrapPhoto>
                <FormTitle>Registartion</FormTitle>
                {/* //? LOGIN // //? LOGIN // //? LOGIN ////? LOGIN // // */}

                <Input
                  placeholder="Login"
                  value={state.login}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused1(true))}
                  onBlur={() => setIsFocused1(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  isFocused={isFocused1}
                />

                {/* //? E-mail//? E-mail//? E-mail//? E-mail//? E-mail /// */}

                <Input
                  placeholder="E-mail"
                  value={state.email}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused2(true))}
                  onBlur={() => setIsFocused2(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  isFocused={isFocused2}
                />

                {/* //? Password //? Password//? Password//? Password//? */}

                <Input
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused3(true))}
                  onBlur={() => (
                    setIsShowKeyboard(false), setIsFocused3(false)
                  )}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  isFocused={isFocused3}
                />

                {!isShowKeyboard && (
                  <>
                    <Register
                      activeOpacity={0.8}
                      onPress={() => (
                        console.log("state: ", { state }),
                        setState(initialState)
                      )}
                      disabled={
                        state.email === "" ||
                        state.password === "" ||
                        state.login === ""
                      }
                    >
                      <RegisterText>SIGN UP</RegisterText>
                    </Register>
                    <Link
                      onPress={() => navigation.navigate("Login")}
                      activeOpacity={0.5}
                    >
                      <TextLink>Already have an account? Entry</TextLink>
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
