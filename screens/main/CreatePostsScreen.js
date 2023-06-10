import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";

import { Input } from "react-native-elements";
import Ionicon from "react-native-vector-icons/Ionicons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import {
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import * as Location from "expo-location";

import { Camera } from "expo-camera";

const initialState = {
  name: "",
  locationName: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [location, setLocation] = useState(null);

  const isFocused = useIsFocused();

  const takePhoto = async () => {
    try {
      const picture = await camera.takePictureAsync();
      setPhoto(picture.uri);
      // const location = await Location.getCurrentPositionAsync();
      // console.log("location: ", location);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const sendPhoto = async () => {
    setLocation(location);
    navigation.navigate("Post", { photo, state, location });
    setState(initialState);
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
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => (setIsShowKeyboard(false), Keyboard.dismiss())}
        >
          <Container>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              {isFocused && (
                <CameraContainer>
                  {photo ? (
                    <TakePhotoImage source={{ uri: photo }} />
                  ) : (
                    <CameraStyled ref={setCamera}></CameraStyled>
                  )}
                  <SnapBtn
                    disabled={photo !== null}
                    photo={photo}
                    onPress={takePhoto}
                  >
                    <Ionicon
                      // photo
                      name="camera"
                      size={50}
                      color={photo ? "#FFFFFF" : "#BDBDBD"}
                    ></Ionicon>
                  </SnapBtn>
                </CameraContainer>
              )}
              {photo ? (
                <TouchableOpacity onPress={() => setPhoto(null)}>
                  <Text>Edit photo</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setPhoto(null)}>
                  <Text>Dowload photo</Text>
                </TouchableOpacity>
              )}

              <View>
                <Input
                  value={state.name}
                  placeholder="Назва..."
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />
                <Input
                  value={state.locationName}
                  placeholder="Місцевість..."
                  leftIcon={
                    <SimpleLineIcon
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                  }
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      locationName: value,
                    }))
                  }
                />
                <SendPhotoBtn
                  onPress={sendPhoto}
                  disabled={
                    state.name === "" ||
                    state.locationName === "" ||
                    photo === null
                  }
                >
                  <TextSendPhotoBtn>Published</TextSendPhotoBtn>
                </SendPhotoBtn>
              </View>
            </KeyboardAvoidingView>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

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
  height: 350px;
`;

const TakePhotoImage = styled(Image)`
  height: 350px;
`;

const SnapBtn = styled(TouchableOpacity)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -35px;
  margin-left: -35px;
  border-radius: 35px;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${({ photo }) => (photo ? "#FFFFFF4D" : "#ffffff")};
`;

const SendPhotoBtn = styled(TouchableOpacity)`
  margin: 27px 16px 0;
  border-radius: 100px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#FF6C00")};
`;

const TextSendPhotoBtn = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  padding: 16px;
`;
