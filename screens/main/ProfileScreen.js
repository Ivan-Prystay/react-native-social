import styled from "styled-components/native";
import { View, StatusBar, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import ShowIcon from "../../components/ShowIcon";

export default function ProfileScreen() {
  const { nickname, avatarURL } = useSelector((state) => state.auth);

  return (
    <>
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
      <Container></Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;
