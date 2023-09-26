import { View, StyleSheet } from "react-native";

function Footer() {
  return <View style={styles.footer} />;
}

const styles = StyleSheet.create({
  footer: {
    height: 5,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "#c0c0c0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Footer;
