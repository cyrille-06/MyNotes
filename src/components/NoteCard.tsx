import { View, Text, TouchableOpacity } from "react-native"; // Importation des composants UI de React Native
import { colors, Title } from "../utils/styles"; // Importation des styles prédéfinis

// Composant affichant une carte de note avec titre, date et contenu
const NoteCard = ({ note, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress(note)} // Déclenchement de l'action au clic
      style={{ 
        backgroundColor: colors[note.priority], // Définition de la couleur de fond selon la priorité
        padding: 15, // Ajout d'un espacement interne pour l'esthétique
        borderRadius: 10, // Arrondi des coins
        marginBottom: 10 // Espacement entre les cartes
      }}
    >
      {/* Affichage du titre de la note */}
      <Title>{note.title}</Title>

      {/* Affichage de la date de la note */}
      <Text>{note.date}</Text>

      {/* Affichage du contenu avec une limite de 2 lignes */}
      <Text numberOfLines={2}>{note.content}</Text>
    </TouchableOpacity>
  );
};

export default NoteCard; // Exportation du composant pour utilisation ailleurs
