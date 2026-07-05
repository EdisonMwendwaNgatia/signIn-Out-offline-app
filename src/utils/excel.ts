import ExcelJS from "exceljs";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { AttendanceRecord } from "../../app/services/supervisor";

export async function exportAttendanceExcel(
  workerName: string,
  workerNumber: string,
  records: AttendanceRecord[],
) {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Attendance");

  // ==========================
  // HEADER
  // ==========================

  sheet.columns = [
    { header: "Date", key: "date", width: 18 },
    { header: "Time In", key: "time_in", width: 15 },
    { header: "Time Out", key: "time_out", width: 15 },
    { header: "Status", key: "status", width: 15 },
  ];

  sheet.insertRow(1, []);
  sheet.insertRow(1, [`Worker: ${workerName} (${workerNumber})`]);
  sheet.insertRow(2, []);

  // ==========================
  // DATA
  // ==========================

  records.forEach((record) => {
    sheet.addRow({
      date: record.date,
      time_in: record.time_in ?? "-",
      time_out: record.time_out ?? "-",
      status: record.attendance_status,
    });
  });

  // ==========================
  // STYLE
  // ==========================

  sheet.getRow(1).font = {
    bold: true,
    size: 16,
  };

  sheet.getRow(3).font = {
    bold: true,
  };

  // ==========================
  // SAVE
  // ==========================

  const buffer = await workbook.xlsx.writeBuffer();

  const file = new File(Paths.document, `${workerNumber}_attendance.xlsx`);

  // Overwrite if it already exists
  if (file.exists) {
    file.delete();
  }

  file.create();

  file.write(new Uint8Array(buffer));

  // ==========================
  // SHARE
  // ==========================

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  } else {
    throw new Error("Sharing is not available on this device.");
  }
}
