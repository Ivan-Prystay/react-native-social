import { useEffect, useState } from "react";

import {
  View,
  StatusBar,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import styled from "styled-components/native";

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

import FeatherIcon from "react-native-vector-icons/Fontisto";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

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
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Comments", { item })}
                >
                  <FeatherIcon
                    name="comment"
                    style={{
                      transform: [{ scaleX: -1 }],
                      marginRight: 40,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Map", { item })}
                  disabled={!item.location}
                >
                  <SimpleLineIcon
                    name="location-pin"
                    size={24}
                    color={item.location ? "#3c8854" : "#BDBDBD"}
                  />
                  <Text style={{ marginLeft: 15 }}>
                    {item.state.locationName}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text>
                lat:{item.location?.coords.latitude}
                lon:{item.location?.coords.longitude}
              </Text>
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
