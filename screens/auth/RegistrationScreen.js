import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

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
  Image,
} from "react-native";

import { Input } from "react-native-elements";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";
import AddAvatar from "../../components/AddAvatar";
import DeleteAvatar from "../../components/DeleteAvatar";
import ShowIcon from "../../components/ShowIcon";
import HideIcon from "../../components/HideIcon";

const inputContainerStyle = {
  borderWidth: 1,
  backgroundColor: "#f6f6f6",
  borderRadius: 8,
  height: 50,
  fontSize: 16,
  padding: 16,
};

//*             INITIAL   STATE        //

const initialState = {
  nickname: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [showText, setShowText] = useState(true);
  const toggleShowText = () => {
    setShowText(!showText);
  };

  const dispatch = useDispatch();

  const handleRegistration = () => {
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, avatar }));
  }, [avatar]);

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
                <WrapAvatar>
                  <Image
                    style={{ height: 120, borderRadius: 8 }}
                    source={{ uri: avatar }}
                  ></Image>

                  {!avatar ? (
                    <AddPhoto activeOpacity={1} onPress={() => pickImage()}>
                      <AddAvatar />
                    </AddPhoto>
                  ) : (
                    <DelPhoto activeOpacity={1} onPress={() => setAvatar(null)}>
                      <DeleteAvatar />
                    </DelPhoto>
                  )}
                </WrapAvatar>
                <FormTitle>Registartion</FormTitle>
                {/* //? LOGIN // //? LOGIN // //? LOGIN ////? LOGIN // // */}

                <Input
                  placeholder="Nickname"
                  value={state.nickname}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused1(true))}
                  onBlur={() => (
                    setIsFocused1(false), setIsShowKeyboard(false)
                  )}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickname: value }))
                  }
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    borderColor: isFocused1 ? "#FF6C00" : "transparent",
                  }}
                />

                {/* //? E-mail//? E-mail//? E-mail//? E-mail//? E-mail /// */}

                <Input
                  placeholder="E-mail"
                  value={state.email}
                  onFocus={() => (setIsShowKeyboard(true), setIsFocused2(true))}
                  onBlur={() => (
                    setIsShowKeyboard(false), setIsFocused2(false)
                  )}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    borderColor: isFocused2 ? "#FF6C00" : "transparent",
                  }}
                />

                {/* //! Password //? Password//? Password//? Password//? */}
                <Input
                  placeholder="Password (min 6 symb)"
                  value={state.password}
                  secureTextEntry={showText}
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
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    borderColor: isFocused3 ? "#FF6C00" : "transparent",
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
                    <Register
                      activeOpacity={0.8}
                      onPress={handleRegistration}
                      disabled={
                        state.email === "" ||
                        state.nickname === "" ||
                        state.password === "" ||
                        state.avatar === ""
                      }
                    >
                      <RegisterText>SIGN UP</RegisterText>
                    </Register>
                    <Link
                      onPress={() => (
                        navigation.navigate("Login"), setState(initialState)
                      )}
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

const Register = styled(TouchableOpacity)`
  margin: 27px 16px 0;
  border-radius: 100px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#FF6C00")};
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
const WrapAvatar = styled(View)`
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
  top: -45px;
  width: 40px;
`;

const DelPhoto = styled(AddPhoto)`
  left: 102px;
  top: -50px;
`;
