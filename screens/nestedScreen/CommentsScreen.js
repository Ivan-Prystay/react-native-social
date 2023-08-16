import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, StatusBar, Text, Image, FlatList } from "react-native";
import { Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

//*                  One Comment

const CommentItem = React.memo(({ item }) => {
  const { nickname } = useSelector((state) => state.auth);
  const isOwnComment = item.nickname === nickname;

  return (
    <CommenBlock isOwnComment={isOwnComment}>
      <Avatar source={{ uri: item.avatarURL }} />
      <CommentContentWrap isOwnComment={isOwnComment}>
        <CommentContent>{item.comment}</CommentContent>
        <CommentDate isOwnComment={isOwnComment}>
          {item.createdAt.date} | {item.createdAt.time}
        </CommentDate>
      </CommentContentWrap>
    </CommenBlock>
  );
});

const Avatar = styled(Image)`
  height: 28px;
  width: 28px;
  border-radius: 15px;
`;
const CommentContent = styled(Text)`
  color: #212121;
  font-size: 12px;
`;
const CommentDate = styled(Text)`
  color: #bdbdbd;
  text-align: ${(props) => (props.isOwnComment ? "left" : "right")};
  font-size: 12px;
`;
const CommenBlock = styled(View)`
  flex: 1;
  flex-direction: ${(props) => (props.isOwnComment ? "row-reverse" : "row")};
  padding: 0 16px;
`;
const CommentContentWrap = styled(View)`
  flex: 1;
  flex-grow: 1;
  background-color: #00000008;
  padding: 8px 16px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: ${(props) => (props.isOwnComment ? 0 : "8px")};
  border-top-left-radius: ${(props) => (props.isOwnComment ? "8px" : 0)};
  margin: 0 8px 16px;
`;

//*                  All Comments

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname, avatarURL } = useSelector((state) => state.auth);

  const { photo, id } = route.params;

  useEffect(() => {
    const getAllComments = async () => {
      const collectionRef = collection(db, "posts", id, "comments");

      onSnapshot(collectionRef, (snapshot) => {
        const updatedAllComments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        updatedAllComments.sort((a, b) => +a.timeStamp - +b.timeStamp);

        setAllComments(updatedAllComments);
      });
    };

    getAllComments();
  }, []);

  const timeStamp = Date.now();

  const createdAt = new Date();
  const date = createdAt
    .toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" р.", "");
  const time = createdAt.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", id, "comments"), {
        comment,
        nickname,
        createdAt: { date, time },
        timeStamp,
        avatarURL,
      });
      console.log("Comment added with ID: ", docRef.id);
    } catch (e) {
      alert("Error adding comment: ", e);
      console.error("Error adding comment: ", e);
    }
  };

  return (
    <>
      <StatusBar />
      <Container>
        <PostPhoto source={{ uri: photo }}></PostPhoto>
        <FlatList
          data={allComments}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => <CommentItem item={item} />}
        />

        <Input
          value={comment}
          style={{ alignItems: "flex-end" }}
          onChangeText={(value) => setComment(value)}
          rightIcon={
            <Ionicons
              name="arrow-up-circle"
              size={34}
              color="#FF6C00"
              onPress={() => {
                createComment();
                setComment("");
              }}
              disabled={!comment}
            />
          }
          containerStyle={{
            height: 28,
          }}
          inputContainerStyle={{
            backgroundColor: "#F6F6F6",
            paddingLeft: 15,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#E8E8E8",
            borderBottomWidth: 1,
            height: 42,
          }}
          placeholder="To comment..."
        ></Input>
      </Container>
    </>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
`;

const PostPhoto = styled(Image)`
  height: 200px;
  border-radius: 8px;
  /* marginTop: 16px; */
  margin-bottom: 16px;
`;

export default CommentsScreen;
