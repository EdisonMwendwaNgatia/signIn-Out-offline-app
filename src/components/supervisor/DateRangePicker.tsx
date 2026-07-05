import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (date: Date) => void;
  onToDateChange: (date: Date) => void;
}

export default function DateRangePicker({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: Props) {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  function formatDate(date: Date | null) {
    if (!date) {
      return "Select date";
    }
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date Range</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowFrom(true)}
      >
        <Text style={styles.label}>From</Text>
        <Text style={styles.date}>📅 {formatDate(fromDate)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowTo(true)}
      >
        <Text style={styles.label}>To</Text>
        <Text style={styles.date}>📅 {formatDate(toDate)}</Text>
      </TouchableOpacity>

      {showFrom && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFrom(false);
            if (selectedDate) {
              onFromDateChange(selectedDate);
            }
          }}
        />
      )}

      {showTo && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowTo(false);
            if (selectedDate) {
              onToDateChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  label: {
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },

  date: {
    fontSize: 17,
  },
});
