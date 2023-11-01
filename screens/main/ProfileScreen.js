import styled from "styled-components/native";

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import {
  View,
  StatusBar,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";

import { useState, useEffect } from "react";

import { ButtonOut } from "../../components/ButtonOut";

import { db } from "../../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const { nickname, avatarURL, userId } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);

  const [commentsCount, setCommentsCount] = useState({});

  const getAllPosts = async () => {
    const collectionRef = collection(db, "posts");
    const queryRef = query(collectionRef, where("userId", "==", userId));

    onSnapshot(queryRef, async (snapshot) => {
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

  useEffect(() => {
    setAvatar(avatarURL);
  }, [avatarURL]);

  return (
    <>
      <StatusBar />
      <Container>
        <BackgroundImage source={require("../../assets/images/photo_bg.png")}>
          <View>
            <ProfileContainer>
              <WrapAvatar>
                {avatarURL !== "" ? (
                  <ImageAvatar source={{ uri: avatar }}></ImageAvatar>
                ) : null}
              </WrapAvatar>

              <WrapButtonOut>
                <ButtonOut />
              </WrapButtonOut>
              <ProfileTitle hasPosts={posts.length > 0}>
                {nickname}
              </ProfileTitle>
            </ProfileContainer>

            {posts.length > 0 && (
              <FlatList
                contentContainerStyle={{
                  backgroundColor: "#F6F6F6",
                }}
                data={posts}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <PhotoPost source={{ uri: item.photo }} />
                    <PostTitle>{item.title.name}</PostTitle>
                    <PostDescription>
                      <CommentsLink
                        onPress={() =>
                          navigation.navigate("Comments", {
                            id: item.id,
                            photo: item.photo,
                          })
                        }
                      >
                        <CommentIcon name="comment" />

                        <CommentsCountWrap>
                          <CommentsCount>
                            {commentsCount[item.id] || 0}
                          </CommentsCount>
                        </CommentsCountWrap>
                      </CommentsLink>

                      <MapLink
                        onPress={() => navigation.navigate("Map", { item })}
                        disabled={!item.location}
                      >
                        <MapIcon name="location-pin" />
                        <LocationName>
                          {`${item.title.locationName.country}`}
                        </LocationName>
                      </MapLink>
                    </PostDescription>
                  </View>
                )}
              />
            )}
          </View>
        </BackgroundImage>
      </Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
  background-size: cover;
  padding-top: 225px;
`;

const WrapAvatar = styled(View)`
  height: 120px;
  width: 120px;
  border-radius: 16px;
  background-color: #f6f6f6;
  position: absolute;
  top: -60px;
  display: flex;
  align-self: center;
`;

const ProfileContainer = styled(View)`
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-bottom: 8px;
`;

const ProfileTitle = styled(Text)`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  color: #212121;
  margin-top: 32px;
  margin-bottom: ${(props) => (props.hasPosts ? "0px" : "50px")};
`;

const ImageAvatar = styled(Image)`
  height: 120px;
  border-radius: 8px;
`;

const WrapButtonOut = styled(View)`
  margin-top: 20px;
  align-items: flex-end;
  padding-right: 24px;
`;

const PhotoPost = styled(Image)`
  height: 240px;
  margin: 0 10px;
  margin-top: 10px;
  padding: 25px;
  border-width: 3px;
  border-radius: 45px;
`;

const PostTitle = styled.Text`
  padding-left: 30px;
  margin: 8px 0;
  font-weight: 500;
  font-size: 20px;
`;

const PostDescription = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 16px;
`;

const CommentsLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const CommentIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 22px;
  color: #ff6c00;
`;

const CommentsCountWrap = styled(View)`
  border-radius: 30px;
  background-color: #ff6c00;
  margin-right: 20px;
  padding: 0 5px;
`;

const CommentsCount = styled(Text)`
  color: white;
`;

const MapLink = styled(CommentsLink)`
  align-items: flex-start;
`;

const MapIcon = styled(SimpleLineIcon)`
  font-size: 24px;
  color: #ff6c00;
`;

const LocationName = styled(Text)`
  margin-left: 10px;
  padding-right: 15px;
  text-decoration: underline;
`;
