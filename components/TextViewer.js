import { StyleSheet, Text } from 'react-native';

export default function TextViewer({ daveningText }) {
    const davening = daveningText ? daveningText : "No davening text available";
    return (
      <Text style={styles.text}>
        {davening}
      </Text>
    );
    }

const styles = StyleSheet.create({
  text: {
    width: 320,
    height: 440,
    borderRadius: 18,
    color: 'white',
    fontSize: 20
  },
});
