import { g as getWikiImageLink } from "../../../../chunks/helpers.js";
async function load({ params, url }) {
  const { sciName, realName } = params;
  let requestName = sciName;
  let wikipediaImageURL;
  const imageUrl = url.searchParams.get("url");
  const nuthatchData = null;
  const nuthatchDataAvailable = false;
  let wikipediaDataAvailable = true;
  console.log(`request name: ${requestName}`);
  let response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${requestName}&format=json&prop=extracts&exintro&explaintext&redirects=1`
  );
  const wikipediaPageData = await response.json();
  let extract;
  if (wikipediaPageData.query.pages.hasOwnProperty(-1)) {
    wikipediaDataAvailable = false;
  } else {
    const pageInfo = wikipediaPageData.query.pages[Object.keys(wikipediaPageData.query.pages)[0]];
    extract = pageInfo.extract;
    wikipediaImageURL = await getWikiImageLink(requestName);
  }
  console.log(`wikipedia data available: ${wikipediaDataAvailable}`);
  console.log(`wikipedia image URL: ${wikipediaImageURL}`);
  const wikipediaPage = await fetch(`https://en.wikipedia.org/wiki/${sciName}`);
  const wikipediaPageHTML = await wikipediaPage.text();
  return { sciName, realName, wikipediaImageURL, description: extract, imageUrl, nuthatchDataAvailable, nuthatchData, wikipediaDataAvailable, wikipediaPageHTML };
}
export {
  load
};
