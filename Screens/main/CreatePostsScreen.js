import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Image,
  TextInput,
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

  const takePhoto = useCallback(async () => {
    try {
      const picture = await camera.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log("location: ", location);
      setPhoto(picture.uri);
    } catch (error) {
      console.log("error: ", error.message);
    }
  }, [camera]);

  const sendPhoto = useCallback(() => {
    if (photo === null) {
      return;
    }
    navigation.navigate("Posts", { photo });
    setPhoto(null);
  }, [navigation, photo]);

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
            )}
            <View>
              <TextInput
                placeholder="Назва"
                style={{
                  backgroundColor: "lime",
                  borderWidth: 1,
                  borderColor: "red",
                  marginHorizontal: 20,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 0,
                }}
                value={state.name}
                onFocus={() => (setIsShowKeyboard(true), setIsFocused1(true))}
                onBlur={() => setIsFocused1(false)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                isFocused={isFocused1}
              />
              <TextInput
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
                placeholder="Місцевість"
                style={{
                  backgroundColor: "lime",
                  borderWidth: 1,
                  borderColor: "red",
                  marginHorizontal: 20,
                  marginTop: 10,
                  borderRadius: 5,
                  padding: 0,
                }}
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

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;

const CameraStyled = styled(Camera)`
  align-items: center;
  justify-content: flex-end;
  margin: 0 10px;
  height: 70%;
`;
const SnapBtn = styled(TouchableOpacity)`
  border: 1px solid white;
  border-radius: 35px;
  margin-top: 200px;
  /* padding: 5px 10px; */
  /* background-color: coral; */
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
