function myFunction2() {
  const presentationId = "###"; // Please set the Google Slides ID.
  const spreadsheetId = "###"; // Please set the Spreadsheet ID.
  const sheetName = "Sheet1";

  const s = SlidesApp.openById(presentationId);
  const slide = s.getSlides()[0];
  slide.getBackground().setTransparent();
  s.saveAndClose();
  const url = `https://docs.google.com/feeds/download/presentations/Export?id=${presentationId}&exportFormat=png`;
  const blob = UrlFetchApp.fetch(url, {
    headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() },
  }).getBlob();

  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(
    sheetName
  );
  sheet.insertImage(blob, 2, 2);
}
