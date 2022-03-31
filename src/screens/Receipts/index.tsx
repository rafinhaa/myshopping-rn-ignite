import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);

  useEffect(() => {
    storage()
      .ref("images")
      .listAll()
      .then((res) => {
        const photos = res.items.map((item) => ({
          name: item.name,
          path: item.fullPath,
        }));
        setPhotos(photos);
      });
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri="" />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File data={item} onShow={() => {}} onDelete={() => {}} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
