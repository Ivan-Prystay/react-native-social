import Svg, { Path } from "react-native-svg";

import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";

export default function PostsScreen() {
  return (
    <>
      <StatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#0000004D",
              padding: 14,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#212121",
                fontWeight: 500,
              }}
            >
              Posts
            </Text>
            <TouchableOpacity>
              <Svg
                style={{ flex: 4 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M17 16L21 12L17 8"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M21 12H9"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
});
