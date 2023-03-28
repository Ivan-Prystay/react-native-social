import { useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

const StyledTextInput = styled(TextInput)`
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  border-color: ${(props) => (props.isFocused ? "blue" : "gray")};
`;

const StyledTextInput1 = styled(StyledTextInput)`
  border-color: ${(props) => (props.isFocused ? "red" : "gray")};
`;

export default Example = () => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  return (
    <>
      <StyledTextInput1
        placeholder="Enter text"
        onFocus={() => setIsFocused1(true)}
        onBlur={() => setIsFocused1(false)}
        isFocused={isFocused1}
      />
      <StyledTextInput
        placeholder="Enter text"
        onFocus={() => setIsFocused2(true)}
        onBlur={() => setIsFocused2(false)}
        isFocused={isFocused2}
      />
      <StyledTextInput
        placeholder="Enter text"
        onFocus={() => setIsFocused3(true)}
        onBlur={() => setIsFocused3(false)}
        isFocused={isFocused3}
      />
    </>
  );
};
