import React from "react";

import { firebase } from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const handleSignInAnonymously = async () => {
    const { user } = await firebase.auth().signInAnonymously();
    console.log(user);
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input placeholder="e-mail" keyboardType="email-address" />

      <Input placeholder="senha" secureTextEntry />

      <Button title="Entrar" onPress={handleSignInAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={() => {}} />
      </Account>
    </Container>
  );
}
