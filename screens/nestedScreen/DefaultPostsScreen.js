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
import { createGlobalStyle } from "styled-components";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const collectionRef = collection(db, "posts");

    onSnapshot(collectionRef, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("updatedPosts: ", updatedPosts);
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

  return (
    <>
      <StatusBar />
      <Container>
        <FlatList
          data={posts}
          keyExtractor={(item, id) => id.toString()}
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
                  onPress={() =>
                    navigation.navigate("Comments", {
                      id: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <FeatherIcon
                    name="comment"
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ marginRight: 30 }}>{item.title.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("Map", { item })}
                  disabled={!item.location}
                >
                  <SimpleLineIcon
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={{ marginLeft: 10 }}>
                    {`${item.title.locationName.country}, ${item.title.locationName.region}`}
                  </Text>
                </TouchableOpacity>
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
