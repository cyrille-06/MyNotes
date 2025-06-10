import { useEffect, useState } from "react";
import { View, FlatList, Button, Text } from "react-native";
import { getNotes } from "../src/utils/storage";
import NoteCard from "../src/components/NoteCard";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
    };
    fetchNotes();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      {notes.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
          No notes available. Click "Add" to create one.
        </Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={() => router.push(`/notes/${item.id}`)} />
          )}
        />
      )}
      <Button title="Add Note" onPress={() => router.push("/form")} />
    </View>
  );
}
