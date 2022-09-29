import XLSX from "xlsx";

export const createSampleXlsxBuffer = async (data, defaultSheetName = "Example") => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, defaultSheetName);
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer;
};
