function myFunction() {
  // 1. Create new Google Slides with the custom page size. This is used as a temporal file.
  const width = 200;
  const height = 200;
  const object = {
    title: "temp",
    width: { unit: "pixel", size: width },
    height: { unit: "pixel", size: height },
  };
  const presentationId = DocsServiceApp.createNewSlidesWithPageSize(object);

  // 2. Create a sample shape to Google Slides.
  const s = SlidesApp.openById(presentationId);
  const slide = s.getSlides()[0];
  slide.getBackground().setTransparent();
  const obj = slide
    .insertShape(SlidesApp.ShapeType.HEART)
    .setWidth(130)
    .setHeight(130)
    .alignOnPage(SlidesApp.AlignmentPosition.CENTER);
  obj.getFill().setTransparent();
  obj.getBorder().setWeight(10).getLineFill().setSolidFill("#ff0000");
  s.saveAndClose();

  // 3. Export Google Slides as a PNG data with the alpha channel.
  const url = `https://docs.google.com/feeds/download/presentations/Export?id=${presentationId}&exportFormat=png`;
  const blob = UrlFetchApp.fetch(url, {
    headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() },
  }).getBlob();

  // 4. Put the created image to Google Spreadsheet.
  const spreadsheetId = "###"; // Please set the Spreadsheet ID.
  const sheetName = "Sheet1";
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(
    sheetName
  );
  sheet.insertImage(blob, 2, 2);

  // 5. Remove the Google Slides.
  DriveApp.getFileById(presentationId).setTrashed(true);
}
