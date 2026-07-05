import { FlatList, StyleSheet, Text, View } from "react-native";

import { AttendanceRecord } from "../../../app/services/supervisor";

interface Props {
  records: AttendanceRecord[];
}

export default function AttendanceHistory({ records }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History</Text>

      <View style={styles.header}>
        <Text style={[styles.cell, styles.date]}>Date</Text>

        <Text style={styles.cell}>In</Text>

        <Text style={styles.cell}>Out</Text>

        <Text style={styles.cell}>Status</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No attendance records found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.date]}>{item.date}</Text>

            <Text style={styles.cell}>{item.time_in ?? "-"}</Text>

            <Text style={styles.cell}>{item.time_out ?? "-"}</Text>

            <Text
              style={[
                styles.cell,
                item.attendance_status === "Late"
                  ? styles.late
                  : item.attendance_status === "Absent"
                    ? styles.absent
                    : styles.present,
              ]}
            >
              {item.attendance_status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  date: {
    flex: 2,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },

  empty: {
    textAlign: "center",
    color: "#777",
    paddingVertical: 20,
  },

  present: {
    color: "#2E7D32",
    fontWeight: "bold",
  },

  late: {
    color: "#E67E22",
    fontWeight: "bold",
  },

  absent: {
    color: "#D32F2F",
    fontWeight: "bold",
  },
});
