import styled from "styled-components/native";
import { View, StatusBar, Text } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const { nickname } = useSelector((state) => state.auth);

  return (
    <>
      <StatusBar />
      <Text>Current user:{nickname} </Text>
      <Container></Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;
