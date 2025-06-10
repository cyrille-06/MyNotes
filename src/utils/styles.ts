import styled from "styled-components/native";

export const colors = {
  important: "#7EE4EC",
  normal: "#FFD4CA",
  reminder: "#114B5F",
};

export const Title = styled.Text`
  font-family: "Montserrat";
  font-size: 22px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  margin: 5px;
  border-radius: 8px;
  align-items: center;
`;

export const DeleteButton = styled(ButtonStyled)`
  background-color: ${colors.important};
`;

export const EditButton = styled(ButtonStyled)`
  background-color: ${colors.normal};
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
