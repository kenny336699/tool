const XLSX = require("xlsx");
const crypto = require("crypto");

function hash(data) {
  try {
    return sha256Hash(data);
  } catch (ex) {
    console.error("Hashing error:", ex);
    return "";
  }
}

function sha256Hash(inputStr) {
  const sha256 = crypto.createHash("sha256");
  sha256.update(inputStr);
  return sha256.digest("base64");
}

try {
  // Read the Excel file
  const workbook = XLSX.readFile("creation of accounts.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Function to process a range of cells
  function processRange(startCol, endCol, startRow, endRow) {
    console.log(`Processing range ${startCol}${startRow}:${endCol}${endRow}`);
    for (let i = startRow; i <= endRow; i++) {
      const cellAddress = startCol + i;
      const cell = worksheet[cellAddress];

      if (cell && cell.v) {
        console.log(`Processing cell ${cellAddress}: ${cell.v}`);
        const hashedValue = hash(cell.v.toString());
        const newCellAddress = endCol + i;
        worksheet[newCellAddress] = { t: "s", v: hashedValue };
        console.log(
          `Hashed value written to ${newCellAddress}: ${hashedValue}`
        );
      } else {
        console.log(`Cell ${cellAddress} is empty or undefined`);
      }
    }
  }

  // Process each range
  processRange("E", "F", 4, 53);
  processRange("G", "H", 4, 9);
  processRange("I", "J", 4, 6);

  for (let i = 4; i <= 6; i++) {
    console.log(
      `I${i}: ${worksheet["I" + i] ? worksheet["I" + i].v : "empty"}`
    );
    console.log(
      `J${i}: ${worksheet["J" + i] ? worksheet["J" + i].v : "empty"}`
    );
  }
  // Write the changes back to the file
  XLSX.writeFile(workbook, "your_excel_file_hashed.xlsx");

  console.log(
    "Hashing complete. New file saved as your_excel_file_hashed.xlsx"
  );
} catch (error) {
  console.error("An error occurred:", error);
}
