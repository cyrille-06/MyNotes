import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { saveNote, getNotes } from "../src/utils/storage";
import { colors } from "../src/utils/styles";

export default function FormScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("normal");

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const notes = await getNotes();
        const existingNote = notes.find((note) => note.id === Number(id));
        if (existingNote) {
          setTitle(existingNote.title);
          setContent(existingNote.content);
          setPriority(existingNote.priority);
        }
      };
      fetchNote();
    }
  }, [id]);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      
      <Text style={{ fontSize: 18, marginTop: 10 }}>Select Priority:</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
        {["important", "normal", "reminder"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setPriority(level)}
            style={{
              backgroundColor: colors[level],
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginHorizontal: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{level.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Save"
        onPress={async () => {
          const note = {
            id: id ? Number(id) : Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString(),
            priority,
          };
          await saveNote(note);
          router.push("/");
        }}
      />
    </View>
  );
}
