import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Router";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignupProps
  extends NativeStackScreenProps<RootStackParamList, "Signup"> {}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerHandle = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("password", password);
          console.log("Signup succes!!");
        })
        .catch((err) => Alert.alert("Signup error", err.message));
    } else {
      Alert.alert("Error", "fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../../assets/loginBackgrund.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.whiteWrapper}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={registerHandle}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.dontaccountWrapper}>
          <Text style={styles.dontaccountWrapperNoTouchText}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.dontaccountWrapperText}> Login up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { Signup };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "40%",
  },
  whiteWrapper: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#395144",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#f6f6f6",
    height: 50,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: "#395144",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  dontaccountWrapper: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  dontaccountWrapperNoTouchText: {
    color: "gray",
    fontWeight: "600",
    fontSize: 14,
  },
  dontaccountWrapperText: {
    color: "#395144",
    fontWeight: "600",
    fontSize: 14,
  },
});
