import styled from "styled-components/native";
import { View, StatusBar, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  console.log("STATE POSTS", posts);
  console.log("STATE POSTS", posts.length);

  useEffect(() => {
    if (
      route.params === undefined ||
      posts.find((post) => post.photo === route.params.photo)
    ) {
      return;
    }
    setPosts((prevState) => [...prevState, route.params]);
  }, [route.params, posts]);

  return (
    <>
      <StatusBar />
      <Container>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.photo }}
                style={{
                  height: 200,
                  marginHorizontal: 10,
                  marginTop: 10,
                  padding: 25,
                  borderWidth: 3,
                  borderRadius: 45,
                  borderColor: "lime",
                }}
              />
            </View>
          )}
        />
      </Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #e5e5e5;
`;
