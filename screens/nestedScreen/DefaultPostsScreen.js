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
import { collection, onSnapshot, getDocs, doc } from "firebase/firestore";
// import { useSelector } from "react-redux";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  // const { nickname, avatarURL } = useSelector((state) => state.auth);
  // useSelector;

  const getAllPosts = async () => {
    const collectionRef = collection(db, "posts");

    onSnapshot(collectionRef, async (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      updatedPosts.sort((a, b) => b.photo.localeCompare(a.photo));

      const postsWithCommentsCount = await Promise.all(
        updatedPosts.map(async (post) => {
          return { ...post };
        })
      );

      setPosts(postsWithCommentsCount);
    });
  };

  const getCommentsCount = async (post) => {
    const commentsCollectionRef = collection(db, "posts", post.id, "comments");

    onSnapshot(commentsCollectionRef, (snapshot) => {
      const newCommentsCount = snapshot.size;
      setCommentsCount((prevCommentsCount) => ({
        ...prevCommentsCount,
        [post.id]: newCommentsCount,
      }));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      getCommentsCount(post);
    });
  }, [posts]);

  return (
    <>
      <StatusBar />
      <Container>
        <Text
          style={{
            paddingVertical: 15,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "500",
            backgroundColor: "white",
          }}
        >
          Posts
        </Text>
        {/* <Image source={{ uri: avatarURL }}></Image>
        <Text>{nickname}</Text> */}

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
                  <Text style={{ marginRight: 10 }}>
                    {commentsCount[item.id] || 0}
                  </Text>
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
