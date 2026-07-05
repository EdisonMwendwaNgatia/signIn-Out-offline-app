import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  //   onGeneratePDF: () => void;

  onGenerateExcel: () => void;
}

export default function ReportButtons({
  //   onGeneratePDF,
  onGenerateExcel,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.excel} onPress={onGenerateExcel}>
        <Text style={styles.text}>Export Excel</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.pdf} onPress={onGeneratePDF}>
        <Text style={styles.text}>Export PDF</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    gap: 12,
  },

  excel: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  pdf: {
    backgroundColor: "#C62828",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
