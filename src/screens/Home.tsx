import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";

import { Entypo } from "@expo/vector-icons";
import colors from "../helpers/colors";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeProps
  extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => {
          signOut(auth).then(() => {
            AsyncStorage.removeItem("email");
            AsyncStorage.removeItem("password");
          });
        }}
      >
        <Entypo name="log-out" size={24} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export { Home };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
