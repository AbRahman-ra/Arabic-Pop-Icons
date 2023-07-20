function renderMainPage(HTMLtemplate, singerJSONData) {
  let output = HTMLtemplate.replace(/{singerName}/g, singerJSONData.singerName);
  output = output.replace(/{singerUrl}/g, singerJSONData.url);
  output = output.replace(/{imageName}/g, singerJSONData.imageName);
  output = output.replace(/{alt}/g, singerJSONData.alt);
  output = output.replace(/{singerCaption}/g, singerJSONData.singerCaption);

  if (singerJSONData.featured) {
    output = output.replace(/{singerNameFeatured}/g, singerJSONData.singerName);
    output = output.replace(
      /{imageNameFeatured}/g,
      singerJSONData.imageNameFeatured
    );
    output = output.replace(
      /{singerCaptionFeatured}/g,
      singerJSONData.singerCaption
    );
    output = output.replace(/{altFeatured}/g, singerJSONData.alt);
  }
  return output;
}

module.exports = renderMainPage;
