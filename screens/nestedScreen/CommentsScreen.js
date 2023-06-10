import styled from "styled-components/native";
import { View, StatusBar, Text } from "react-native";
export default function CommentsScreen() {
  return (
    <>
      <StatusBar />
      <Container>
        <Text>Comments Screen</Text>
      </Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;
