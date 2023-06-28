import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

import { useSelector } from "react-redux";

import styled from "styled-components/native";

import * as Location from "expo-location";
import { Camera } from "expo-camera";

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

//  Firebase

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  name: "",
  locationName: "",
};

export default function CreatePostsScreen({ navigation }) {
  let cameraRef = useRef();
  const isFocused = useIsFocused();

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [state, setState] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [location, setLocation] = useState(null);
  const { nickname, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePhoto = async () => {
    try {
      const picture = await cameraRef.current.takePictureAsync();
      setPhoto(picture.uri);

      let location = await Location.getCurrentPositionAsync();
      console.log("location.coords: ", location.coords);

      setLocation(location);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() + 3); // Add 3 hours to the current time

  const isoString = timestamp.toISOString().slice(0, -5);
  console.log(isoString);

  const loaderToDb = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const storageRef = ref(storage, `imagesPosts/post_${isoString}`);
      const snapshot = await uploadBytes(storageRef, file);

      console.log("Uploaded a blob or file!");

      const url = await getDownloadURL(
        ref(storage, `imagesPosts/post_${isoString}`)
      );

      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      return url;
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const createPost = async () => {
    const photo = await loaderToDb();
    console.log("photo: ", photo);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        userId,
        nickname,
        location: location.coords,
        comment: state,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      alert("Error adding document: ", e);
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = async () => {
    createPost();
    navigation.navigate("Post", { photo, state, location });
    setState(initialState);
    setPhoto(null);
  };

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
                    <CameraStyled
                      flashMode={Camera.Constants.FlashMode.auto}
                      ref={cameraRef}
                    ></CameraStyled>
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
                  <Text>Edit photo {isoString}</Text>
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
                    setState((prevState) => ({
                      ...prevState,
                      name: value.trim(),
                    }))
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
                      locationName: value.trim(),
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
