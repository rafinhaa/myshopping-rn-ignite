import React, { useState } from "react";

import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInAnonymously = async () => {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  };

  const handleCreateUserAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Email inválido");
            break;
          case "auth/weak-password":
            alert("Senha muito fraca");
            break;
          case "auth/email-already-in-use":
            alert("Email já está em uso");
            break;
          default:
            alert("Erro ao criar usuário");
            break;
        }
      });
  };

  const handleSignInWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {})
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Usuário ou senha inválidos");
            break;
          case "auth/user-not-found":
            alert("Usuário ou senha inválidos");
            break;
          case "auth/wrong-password":
            alert("Usuário ou senha inválidos");
            break;
          default:
            alert("Erro ao logar");
            break;
        }
      });
  };

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email enviado com sucesso!");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Email inválido");
            break;
          case "auth/user-not-found":
            alert("Email não encontrado");
            break;
          default:
            alert("Erro ao enviar email");
            break;
        }
      });
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
