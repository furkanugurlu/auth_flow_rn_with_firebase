import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { Login, Signup, Home } from "../screens";
import AuthContext from "../provider/types";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  Chat: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const Router = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const onMountLogin = async () => {
      const email: any = await AsyncStorage.getItem("email");
      const password: any = await AsyncStorage.getItem("password");
      await signInWithEmailAndPassword(auth, email, password);
    };

    onMountLogin();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });

    return () => unsubscribe();
  }, [user]);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(2,2,2,.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
