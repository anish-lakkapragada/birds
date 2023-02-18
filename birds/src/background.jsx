/* 
Initialize the chrome context menu. 
*/ 

function main(port) {
    chrome.contextMenus.create({
        id: 'getBirdClassification',
        title: 'Get Bird Name', 
        contexts: ['image']
    });
    
    chrome.contextMenus.create({
        id: "guessBird", 
        title: "Guess Bird", 
        contexts: ["image"]
    })
    
    // what to do in the case where it's clicked 
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        const {srcUrl, menuItemId} = info;
        console.log(info);
        if (menuItemId === "getBirdClassification") {
            // they want some sort of classification, send a request to backend. 
            console.log("deez nuts");
            port.postMessage({"purpose": "birdClassifyModal"});
        }
    }); 
}

chrome.runtime.onConnect.addListener((p) => {
    console.log("puss nuwts");
    const port = p;
    main(port);
}); 