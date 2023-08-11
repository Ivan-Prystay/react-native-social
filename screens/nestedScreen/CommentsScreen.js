import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  StatusBar,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const CommentItem = React.memo(({ item }) => {
  const { nickname } = useSelector((state) => state.auth);
  const isOwnComment = item.nickname === nickname;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: isOwnComment ? "row-reverse" : "row",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={{ uri: item.avatarURL }}
        style={{
          height: 28,
          width: 28,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          backgroundColor: "#00000008",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderTopRightRadius: isOwnComment ? 0 : 8,
          borderTopLeftRadius: isOwnComment ? 8 : 0,
          marginHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#212121", fontSize: 12 }}>{item.comment}</Text>
        <Text
          style={{
            color: "#BDBDBD",
            textAlign: isOwnComment ? "left" : "right",
            fontSize: 12,
          }}
        >
          {item.createdAt.date} | {item.createdAt.time}
        </Text>
      </View>
    </View>
  );
});

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
        <Image
          source={{ uri: photo }}
          style={{
            height: 200,
            borderRadius: 8,
            // marginTop: 16,
            marginBottom: 16,
          }}
        ></Image>

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

export default CommentsScreen;
