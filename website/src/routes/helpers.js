export async function getWikiImageLink(requestTitle) {
  // https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=India
  const data = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${requestTitle}&redirects=1`);
  const response = await data.json(); 
  const pages = response.query.pages; 
  if (pages.hasOwnProperty(-1)) {
    return "";
  }
  else {
    return pages[Object.keys(pages)[0]].original.source;
  }
}