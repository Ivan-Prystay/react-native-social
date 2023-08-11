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
          <ProfileContainer>
            <WrapAvatar>
              {avatarURL !== "" ? (
                <Image
                  source={{ uri: avatar }}
                  style={{ height: 120, borderRadius: 8 }}
                ></Image>
              ) : null}
            </WrapAvatar>
            <View
              style={{
                marginTop: 20,
                alignItems: "flex-end",
                paddingRight: 24,
              }}
            >
              <ButtonOut />
            </View>
            <ProfileTitle hasPosts={posts.length > 0}>{nickname}</ProfileTitle>
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
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      height: 240,
                      marginHorizontal: 10,
                      marginTop: 10,
                      padding: 25,
                      borderWidth: 3,
                      borderRadius: 45,
                    }}
                  />
                  <Text
                    style={{
                      marginVertical: 8,
                      textAlign: "center",
                      fontWeight: "500",
                      fontSize: 20,
                    }}
                  >
                    {item.title.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 16,
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          id: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <FontAwesomeIcon
                        name="comment"
                        color="#FF6C00"
                        style={{
                          marginRight: 10,
                          fontSize: 32,
                        }}
                      />
                      <Text style={{ marginRight: 10 }}>
                        {commentsCount[item.id] || 0}
                      </Text>
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
                        {`${item.title.locationName.country}`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
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
  margin-top: 120px;
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
