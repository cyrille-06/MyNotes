import styled from "styled-components/native"; // Importation de styled-components pour gérer les styles en React Native

// Définition des couleurs utilisées pour les notes
export const colors = {
  important: "#7EE4EC", // Couleur associée aux notes importantes
  normal: "#FFD4CA", // Couleur pour les notes normales
  reminder: "#114B5F", // Couleur pour les rappels
};

// Composant stylé pour le titre d'une note
export const Title = styled.Text`
  font-family: "Montserrat"; // Utilisation de la police Montserrat
  font-size: 22px; // Taille du texte
  font-weight: bold; // Texte en gras
`;

// Conteneur pour organiser les boutons (modifier, supprimer)
export const ButtonContainer = styled.View`
  flex-direction: row; // Affichage en ligne des boutons
  justify-content: space-between; // Espacement entre les boutons
  margin-top: 10px; // Ajout d'une marge au-dessus des boutons
`;

// Style générique pour un bouton (base pour supprimer et modifier)
export const ButtonStyled = styled.TouchableOpacity`
  flex: 1; // Chaque bouton prend une partie égale de l'espace disponible
  padding: 10px; // Espacement interne
  margin: 5px; // Espacement entre les boutons
  border-radius: 8px; // Bords arrondis
  align-items: center; // Centre le texte dans le bouton
`;

// Bouton pour supprimer une note (hérite de ButtonStyled)
export const DeleteButton = styled(ButtonStyled)`
  background-color: ${colors.important}; // Couleur associée aux notes importantes
`;

// Bouton pour modifier une note (hérite de ButtonStyled)
export const EditButton = styled(ButtonStyled)`
  background-color: ${colors.normal}; // Couleur associée aux notes normales
`;

// Style du texte à l'intérieur des boutons
export const ButtonText = styled.Text`
  color: white; // Texte en blanc
  font-weight: bold; // Texte en gras
  font-size: 16px; // Taille du texte
`;
