import { useState } from "react";
import styled from "styled-components/native";

import { Input } from "react-native-elements";

import ShowIcon from "../../components/ShowIcon";
import HideIcon from "../../components/HideIcon";

import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

//*             INITIAL   STATE        //

const initialState = {
  email: "",
  password: "",
};

const inputContainerStyle = {
  borderWidth: 1,
  backgroundColor: "#f6f6f6",
  borderRadius: 8,
  height: 50,
  fontSize: 16,
  padding: 16,
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const [showText, setShowText] = useState(true);
  const toggleShowText = () => {
    setShowText(!showText);
  };

  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(authSignInUser(state));
    setState(initialState);
  };

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
                  onBlur={() => (
                    setIsShowKeyboard(false), setIsFocused1(false)
                  )}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    borderColor: isFocused1 ? "#FF6C00" : "transparent",
                  }}
                />

                {/* //! Password //? Password//? Password//? Password//? */}

                <Input
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={showText}
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
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    borderColor: isFocused2 ? "#FF6C00" : "transparent",
                  }}
                  rightIcon={
                    showText ? (
                      <ShowIcon onPress={toggleShowText} />
                    ) : (
                      <HideIcon onPress={toggleShowText} />
                    )
                  }
                />

                {!isShowKeyboard && (
                  <>
                    <Login
                      activeOpacity={0.8}
                      onPress={handleLogIn}
                      disabled={state.email === "" || state.password === ""}
                    >
                      <LoginText>SIGN IN</LoginText>
                    </Login>
                    <Link
                      onPress={() => (
                        navigation.navigate("Registration"),
                        setState(initialState)
                      )}
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
