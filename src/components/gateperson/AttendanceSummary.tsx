import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  total: number;
  pending: number;
  signedIn: number;
  signedOut: number;
  absent: number;
  late: number;
}

export default function AttendanceSummary({
  total,
  pending,
  signedIn,
  signedOut,
  absent,
  late,
}: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.title}>Attendance Summary</Text>

        <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          <SummaryRow label="Total Workers" value={total} />
          <SummaryRow label="Pending" value={pending} />
          <SummaryRow label="Signed In" value={signedIn} />
          <SummaryRow label="Signed Out" value={signedOut} />
          <SummaryRow label="Absent" value={absent} />
          <SummaryRow label="Late" value={late} />
        </View>
      )}
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },

  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  arrow: {
    fontSize: 18,
    fontWeight: "bold",
  },

  body: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    fontSize: 15,
    color: "#555",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B47FA",
  },
});
