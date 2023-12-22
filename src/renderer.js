const { ipcRenderer } = require('electron');

document.getElementById("conversionForm").addEventListener("submit", function(e){
   e.preventDefault();

   const foldersInput = document.getElementById("foldersInput");
   const formatSelect = document.getElementById("formatSelect");

   // Convert HTMLCollection to an array
   const foldersArray = Array.from(foldersInput.files);

   // Get selected output format from dropdown
   const format = formatSelect.value;

   ipcRenderer.send("formSubmit", foldersArray, format);
});

ipcRenderer.on("conversionSuccess", () => alert("Conversion successful!"));
ipcRenderer.on("conversionError", () => alert("Conversion failed!"));