import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    console.log("Password reset requested");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText style={styles.title}>
          {t("auth.forgotPassword")}
        </ThemedText>

        <ThemedText style={styles.description}>
          Enter your email address and we'll send you a link to reset your password.
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable style={styles.button} onPress={handleResetPassword}>
          <ThemedText style={styles.buttonText}>
            Send Reset Link
          </ThemedText>
        </Pressable>

        <Link href="/(auth)/login" style={styles.link}>
          <ThemedText style={styles.linkText}>
            Back to {t("auth.login")}
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginBottom: 15,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});