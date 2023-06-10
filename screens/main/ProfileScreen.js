import styled from "styled-components/native";
import { View, StatusBar } from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <StatusBar />
      <Container></Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;
