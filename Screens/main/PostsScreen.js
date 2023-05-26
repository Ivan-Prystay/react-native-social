import { useEffect, useState } from "react";

import { View, StatusBar, FlatList, Image, Text } from "react-native";

import styled from "styled-components/native";

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import FeatherIcon from "react-native-vector-icons/Fontisto";

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  console.log("STATE POSTS", posts);
  console.log("STATE POSTS length", posts.length);

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
                  height: 350,
                  marginHorizontal: 10,
                  marginTop: 10,
                  padding: 25,
                  borderWidth: 3,
                  borderRadius: 45,
                }}
              />
              <Text>{item.state.name}</Text>

              <View style={{ flexDirection: "row" }}>
                <FeatherIcon
                  name="comment"
                  style={{ transform: [{ scaleX: -1 }], marginRight: 40 }}
                />
                <SimpleLineIcon name="location-pin" size={24} color="#BDBDBD" />
                <Text style={{ marginLeft: 40 }}>
                  {item.state.locationName}
                </Text>
              </View>
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
