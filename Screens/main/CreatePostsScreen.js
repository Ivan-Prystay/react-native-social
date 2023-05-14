import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";

import { Input, Icon } from "react-native-elements";
import {
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import * as Location from "expo-location";

import { Camera } from "expo-camera";

const initialState = {
  name: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [location, setLocation] = useState(null);

  const isFocused = useIsFocused();

  const takePhoto = async () => {
    try {
      const picture = await camera.takePictureAsync();
      setPhoto(picture.uri);
      const location = await Location.getCurrentPositionAsync();
      console.log("location: ", location);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const sendPhoto = async () => {
    if (photo === null) {
      return;
    }
    navigation.navigate("Posts", { photo });
    setPhoto(null);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback
        onPress={() => (setIsShowKeyboard(false), Keyboard.dismiss())}
      >
        <Container>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            {isFocused && (
              <CameraContainer>
                <CameraStyled ref={setCamera}>
                  {photo && (
                    <TakePhotoContainer>
                      <TakePhotoImage source={{ uri: photo }} />
                    </TakePhotoContainer>
                  )}
                  <SnapBtn onPress={takePhoto}>
                    <TextSnapBtn>SNAP</TextSnapBtn>
                  </SnapBtn>
                </CameraStyled>
              </CameraContainer>
            )}
            <View>
              {/* <InputStyle
                placeholder="Назва..."
                value={state.name}
                onFocus={() => (setIsShowKeyboard(true), setIsFocused1(true))}
                onBlur={() => setIsFocused1(false)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                isFocused={isFocused1}
              /> */}
              {/* <InputStyle
                value={state.location}
                onFocus={() => (setIsShowKeyboard(true), setIsFocused2(true))}
                onBlur={() => (setIsShowKeyboard(false), setIsFocused2(false))}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    location: value,
                  }))
                }
                isFocused={isFocused2}
                placeholder="Місцевість..."
              /> */}
              <Input placeholder="Назва..." />

              <Input
                placeholder="Місцевість..."
                leftIcon={<Icon name="location-pin" size={24} color="black" />}
              />

              <SendPhotoBtn onPress={sendPhoto}>
                <TextSendPhotoBtn>SEND</TextSendPhotoBtn>
              </SendPhotoBtn>
            </View>
          </KeyboardAvoidingView>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
}

const InputStyle = styled(Input)`
  border: red solid 2px;
`;

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
  padding: 32px 16px;
`;

const CameraContainer = styled(View)`
  border-radius: 20px;
  overflow: hidden;
`;

const CameraStyled = styled(Camera)`
  align-items: center;
  justify-content: center;
`;
const SnapBtn = styled(TouchableOpacity)`
  border: 1px solid white;
  border-radius: 35px;
  margin-top: 200px;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;
const TextSnapBtn = styled(Text)`
  color: white;
  font-size: 18px;
`;

const SendPhotoBtn = styled(TouchableOpacity)`
  border: solid 2px orange;
  align-items: center;
  margin: 15px 20px 0;
  padding: 5px;
  border-radius: 10px;
`;

const TextSendPhotoBtn = styled(Text)`
  color: black;
  font-size: 20px;
`;

const TakePhotoContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid white;
  border-radius: 35px;
  padding: 5px;
  background-color: white;
`;

const TakePhotoImage = styled(Image)`
  width: 150px;
  height: 150px;
`;
