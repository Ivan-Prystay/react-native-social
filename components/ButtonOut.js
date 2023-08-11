import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

export const ButtonOut = () => {
  const dispath = useDispatch();

  const handLogOut = () => {
    dispath(authSignOutUser());
  };

  return (
    <>
      <TouchableOpacity style={{ width: 30 }} onPress={handLogOut}>
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // style={{ marginRight: 16 }}
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
    </>
  );
};
