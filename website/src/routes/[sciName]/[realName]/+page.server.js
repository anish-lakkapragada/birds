import {getWikiImageLink} from "../../helpers";
export async function load({ params, url }) {
    const {sciName, realName} = params;
	let requestName = sciName; 
	let wikipediaImageURL; 

	const imageUrl = url.searchParams.get("url")
    const nuthatchURL = `https://nuthatch.lastelm.software/birds?sciName=${sciName}&operator=AND`; 
	const nuthatchData = null; 
	const nuthatchDataAvailable = false; 
	// let response = await fetch(nuthatchURL, {
	// 		method: 'GET',
	// 		headers: {
	// 			'API-Key': 'f0a7a774-f08f-4e4e-9e26-0fc55163f693'
	// 		}}); 

	// const nuthatchData = await response.json();
	// let nuthatchDataAvailable = true; 
    // if (nuthatchData.length == 0) {
	// 	nuthatchDataAvailable = false; 
	// } else {
	// 	requestName = nuthatchData[0].name;
	// }

	// first check a wikipedia article exists for this bird 
	let wikipediaDataAvailable = true; 
	console.log(`request name: ${requestName}`)
	response = await fetch(
    	`https://en.wikipedia.org/w/api.php?action=query&titles=${requestName}&format=json&prop=extracts&exintro&explaintext&redirects=1`
    );

	const wikipediaPageData = await response.json(); 
	let extract; 
	if (wikipediaPageData.query.pages.hasOwnProperty(-1)) {
		wikipediaDataAvailable = false; 
	} else {
		// actually exists 
		const pageInfo = wikipediaPageData.query.pages[Object.keys(wikipediaPageData.query.pages)[0]]
		extract = pageInfo.extract;
		wikipediaImageURL = await getWikiImageLink(requestName);
	}

	console.log(`wikipedia data available: ${wikipediaDataAvailable}`); 
	console.log(`wikipedia image URL: ${wikipediaImageURL}`)

	const wikipediaPage = await fetch(`https://en.wikipedia.org/wiki/${sciName}`);
	const wikipediaPageHTML = await wikipediaPage.text(); 

	return {sciName: sciName, realName: realName, wikipediaImageURL: wikipediaImageURL, description: extract, imageUrl: imageUrl, nuthatchDataAvailable: nuthatchDataAvailable, nuthatchData: nuthatchData, wikipediaDataAvailable: wikipediaDataAvailable, wikipediaPageHTML: wikipediaPageHTML}
}
