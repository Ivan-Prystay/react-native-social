import Svg, { Text } from "react-native-svg";

const HideIcon = ({ onPress }) => {
  return (
    <Svg height="20" width="60" onPress={onPress}>
      <Text
        fill="#1B4371"
        stroke="#1B4371"
        fontSize="16"
        fontWeight="400"
        x="30"
        y="15"
        textAnchor="middle"
      >
        Hide...
      </Text>
    </Svg>
  );
};

export default HideIcon;
