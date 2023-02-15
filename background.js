/* 
Initialize the chrome context menu. 
*/ 

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
    if (info === "getBirdClassification") {
        // they want some sort of classification, send a request to backend. 
        injectEmbed("modal.html")
    }
}); 