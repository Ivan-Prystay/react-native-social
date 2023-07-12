import styled from "styled-components/native";
import { View, StatusBar, Text, Image, ImageBackground } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const { nickname, avatarURL } = useSelector((state) => state.auth);

  return (
    <Container>
      <BackgroundImage source={require("../../assets/images/photo_bg.png")}>
        <StatusBar />
        <Text>Current user:{nickname} </Text>
        <Image
          source={{ uri: avatarURL }}
          style={{
            height: 120,
            width: 120,
            justifyContent: "center",
          }}
        ></Image>
      </BackgroundImage>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
  background-size: cover;
`;
