import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { initializeDatabase } from "../database/db";
import { login } from "../services/auth";

export default function LoginScreen() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    initializeDatabase();
  }, []);

  function handleLogin() {
    const user = login(username, password);

    if (!user) {
      Alert.alert("Login Failed", "Invalid username or password");
      return;
    }

    if (user.role === "supervisor") {
      router.replace("/(supervisor)/dashboard");
    } else {
      router.replace("/(gateperson)/dashboard");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mboga Tuu</Text>

      <Text style={styles.subtitle}>Staff Attendance</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
