export async function load({ params, url }) {
    const {sciName} = params;
	const imageUrl = url.searchParams.get("url")
    const nuthatchURL = `https://nuthatch.lastelm.software/birds?sciName=${sciName}&operator=AND`; 
	let response = await fetch(nuthatchURL, {
			method: 'GET',
			headers: {
				'API-Key': 'f0a7a774-f08f-4e4e-9e26-0fc55163f693'
			}}); 

	const nuthatchData = await response.json();
	let nuthatchDataAvailable = true; 
    if (nuthatchData.length == 0) {
		nuthatchDataAvailable = false; 
	}

	// first check a wikipedia article exists for this bird 
	let wikipediaDataAvailable = true; 
	response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${sciName}&format=json`)
	const wikipediaPageData = await response.json(); 
	if (wikipediaPageData.query.pages.hasOwnProperty(-1)) {
		wikipediaDataAvailable = false; 
	}

	console.log(`wikipedia data available: ${wikipediaDataAvailable}`)

	const wikipediaPage = await fetch(`https://en.wikipedia.org/wiki/${sciName}`);
	const wikipediaPageHTML = await wikipediaPage.text(); 

	return {sciName: sciName, imageUrl: imageUrl, nuthatchDataAvailable: nuthatchDataAvailable, nuthatchData: nuthatchData, wikipediaDataAvailable: wikipediaDataAvailable, wikipediaPageHTML: wikipediaPageHTML}
}
