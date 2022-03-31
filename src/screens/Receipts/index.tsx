import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState("");
  const [photoInfo, setPhotoInfo] = useState("");

  const handleShowImage = async (path: string) => {
    const urlImage = await storage().ref(path).getDownloadURL();
    const info = await storage().ref(path).getMetadata();

    setPhotoSelected(urlImage);

    const date = new Date(info.timeCreated);
    const hours = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
    setPhotoInfo(`${hours}`);
  };

  const handleDeletePhoto = async (path: string) => {
    await storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert("Sucesso", "Foto deletada com sucesso");
        fetchPhotos();
        setPhotoInfo("");
        setPhotoSelected("");
      })
      .catch((error) => Alert.alert("Erro", error.message));
  };

  const fetchPhotos = async () => {
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
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeletePhoto(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
