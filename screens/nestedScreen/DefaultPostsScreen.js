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
        <TitleScreen>Posts</TitleScreen>
        {/* <Image source={{ uri: avatarURL }}></Image>
        <Text>{nickname}</Text> */}
        <FlatList
          contentContainerStyle={{ paddingBottom: 60 }} // Застосування підсумкового розрахунку
          data={posts}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <View>
              <PostPhoto source={{ uri: item.photo }} />

              <PostDiscription>
                <CommentLink
                  onPress={() =>
                    navigation.navigate("Comments", {
                      id: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <CommentIcon name="comment" color="#FF6C00" />

                  <CommentsCountWrap>
                    <CommentsCount>{commentsCount[item.id] || 0}</CommentsCount>
                  </CommentsCountWrap>

                  <PostTitle>{item.title.name}</PostTitle>
                </CommentLink>

                <MapLink
                  onPress={() => navigation.navigate("Map", { item })}
                  disabled={!item.location}
                >
                  <MapIcon name="location-pin" />
                  <LocationName>
                    {`${item.title.locationName.country}, ${item.title.locationName.region}`}
                  </LocationName>
                </MapLink>
              </PostDiscription>
            </View>
          )}
        />
      </Container>
    </>
  );
}

const Container = styled(View)`
  background-color: #e5e5e5;
`;

const TitleScreen = styled(Text)`
  padding: 15px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  background-color: white;
`;

const PostPhoto = styled(Image)`
  margin: 0 10px;
  margin-top: 10px;
  padding: 25px;
  border-width: 3px;
  border-radius: 45px;
  height: 350px;
  aspect-ratio: 1;
`;

const PostDiscription = styled(View)`
  flex: 1;
  flex-direction: row;
  padding: 5px 10px 0;
`;

const CommentLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
  margin-right: 10px;
`;

const CommentIcon = styled(FeatherIcon)`
  margin-right: 10px;
  font-size: 24px;
`;

const CommentsCount = styled(Text)`
  color: white;
`;

const CommentsCountWrap = styled(View)`
  border-radius: 30px;
  background-color: #ff6c00;
  margin-right: 20px;
  padding: 0 5px;
`;

const PostTitle = styled(Text)`
  font-size: 16px;
  flex: 1;
  flex-wrap: wrap;
`;

const MapLink = styled(CommentLink)`
  align-items: flex-start;
`;

const MapIcon = styled(SimpleLineIcon)`
  font-size: 24px;
  color: #ff6c00;
`;

const LocationName = styled(Text)`
  margin-left: 10px;
  padding-right: 15px;
`;
