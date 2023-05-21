import { View } from "react-native";
import { useTheme } from "styled-components";

import { SignIn } from "../screens/SignIng";

export function Routes() {
  const theme = useTheme();

  return (
    <View style={{backgroundColor: theme.colors.black, flex: 1}}>
      <SignIn />
    </View>
  )
}