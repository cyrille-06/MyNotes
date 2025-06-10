import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { deleteNote, getNotes } from "../../src/utils/storage";
import { colors, Title, ButtonContainer, DeleteButton, EditButton, ButtonText } from "../../src/utils/styles";

export default function NoteScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await getNotes();
      const selectedNote = notes.find((note) => note.id === Number(id));
      setNote(selectedNote);
    };
    fetchNote();
  }, [id]);

  if (!note) return <Text>Loading...</Text>;

  const handleDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteNote(note.id);
            router.push("/");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Title>{note.title}</Title>
      <Text>{note.date}</Text>
      <Text>{note.content}</Text>
      <View style={{ backgroundColor: colors[note.priority], padding: 5, borderRadius: 5 }}>
        <Text>Priority: {note.priority}</Text>
      </View>
      <ButtonContainer>
        <EditButton onPress={() => router.push(`/form?id=${note.id}`)}>
          <ButtonText>Edit</ButtonText>
        </EditButton>
        <DeleteButton onPress={handleDelete}>
          <ButtonText>Delete</ButtonText>
        </DeleteButton>
      </ButtonContainer>
    </View>
  );
}
