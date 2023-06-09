import { useState, useEffect } from "react";

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

//**   COMPONENT */

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { nickname } = useSelector((state) => state.auth);
  const { photo, id } = route.params;

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

  useEffect(() => {
    getAllComments();
  }, []);

  const timeStamp = Date.now();

  const createdAt = new Date();
  const date = createdAt.toLocaleDateString();
  const time = createdAt.toLocaleTimeString();

  // console.log("timeStamp: ", timeStamp.toLocaleDateString());
  // console.log("timeStamp: ", timeStamp.toLocaleTimeString());

  const createComment = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", id, "comments"), {
        comment,
        nickname,
        createdAt: { date, time },
        timeStamp,
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
        <ScrollView>
          <Image
            source={{ uri: photo }}
            style={{
              height: 240,
              borderRadius: 8,
              marginHorizontal: 16,
              marginTop: 20,
            }}
          ></Image>
        </ScrollView>

        <FlatList
          data={allComments}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nickname}</Text>
              <View
                style={{
                  backgroundColor: "#00000008",
                  marginLeft: 30,
                  marginRight: 10,
                  padding: 16,
                  borderBottomRightRadius: 6,
                  borderBottomLeftRadius: 6,
                  borderTopRightRadius: 6,
                }}
              >
                <Text style={{ color: "#212121" }}>{item.comment}</Text>
                <Text style={{ color: "#BDBDBD" }}>
                  {item.createdAt.date} | {item.createdAt.time}
                </Text>
              </View>
            </View>
          )}
        />

        <Input
          value={comment}
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
          inputContainerStyle={{
            backgroundColor: "#F6F6F6",
            paddingLeft: 15,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "#E8E8E8",
            borderBottomWidth: 1,
          }}
          placeholder="To comment..."
        ></Input>
      </Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
`;
