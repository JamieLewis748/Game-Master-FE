import {
  SafeAreaView,
  TextInput,
  Alert,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
const XPBar = ({ currentXP, maxXP }) => {
  const xpPercentage = (currentXP / maxXP) * 100;
  console.log(currentXP)
  console.log(maxXP)
  console.log(xpPercentage)
  return (
    <View style={styles.xpBar}>
      <View style={[styles.xpFill, { width: `${xpPercentage}%` }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  xpBar: {
    height: 20,
    width: "70%",
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  xpFill: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
  },
});

export default XPBar;
