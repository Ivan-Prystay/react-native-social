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

import { db } from "../../firebase/config";

import { collection, onSnapshot } from "firebase/firestore";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const collectionRef = collection(db, "posts");

    onSnapshot(collectionRef, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      updatedPosts.sort((a, b) => a.photo.localeCompare(b.photo));
      setPosts(updatedPosts);
    });
  };

  // const getAllPosts = async () => {
  //   const collectionRef = collection(db, "posts");

  //   onSnapshot(collectionRef, (snapshot) => {
  //     const updatedPosts = [];

  //     snapshot.forEach((doc) => {
  //       updatedPosts.push({ ...doc.data(), id: doc.id });
  //     });

  //     setPosts(updatedPosts);
  //   });
  // };

  useEffect(() => {
    getAllPosts();
  }, []);
  console.log("posts: ", posts.length);

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

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Comments", { item })}
                >
                  <FeatherIcon
                    name="comment"
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ marginRight: 30 }}>{item.comment.name}</Text>
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
                  <Text style={{ marginLeft: 10 }}>
                    {item.comment.locationName}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text>lat:{item.location.latitude}</Text>
              <Text>lon:{item.location.longitude}</Text>
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
