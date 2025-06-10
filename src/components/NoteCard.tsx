import { View, Text, TouchableOpacity } from "react-native";
import { colors, Title } from "../utils/styles";

const NoteCard = ({ note, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(note)} style={{ 
      backgroundColor: colors[note.priority], padding: 15, borderRadius: 10, marginBottom: 10
    }}>
      <Title>{note.title}</Title>
      <Text>{note.date}</Text>
      <Text numberOfLines={2}>{note.content}</Text>
    </TouchableOpacity>
  );
};

export default NoteCard;
