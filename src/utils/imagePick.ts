import * as ImagePicker from 'expo-image-picker';

const onImagePick = async (onChange: (value: string) => void) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar as imagens é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  } catch (e) {
    console.error('Erro ao selecionar imagem:', e);
    alert('Ocorreu um erro ao selecionar a imagem.');
  }
};

export { onImagePick };
