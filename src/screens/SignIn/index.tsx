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

      <Button title="Entrar" onPress={handleSignInAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
