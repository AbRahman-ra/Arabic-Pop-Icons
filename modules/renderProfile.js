function renderProfile(HTMLtemplate, singerJSONData) {
  let output = HTMLtemplate.replace(/{singerName}/g, singerJSONData.singerName);
  output = output.replace(/{singerDOB}/g, singerJSONData.singerDOB);
  output = output.replace(/{imageName}/g, singerJSONData.imageName);
  output = output.replace(/{alt}/g, singerJSONData.alt);
  output = output.replace(/{from}/g, singerJSONData.from);
  output = output.replace(/{bio}/g, singerJSONData.bio);
  output = output.replace(/{bestSongName}/g, singerJSONData.bestSongName);
  output = output.replace(/{bestSongLink}/g, singerJSONData.bestSongLink);
  output = output.replace(/{anotherSongLink}/g, singerJSONData.anotherSongLink);
  output = output.replace(
    /{YouTubeChannelLink}/g,
    singerJSONData.YouTubeChannelLink
  );
  return output;
}

module.exports = renderProfile;
