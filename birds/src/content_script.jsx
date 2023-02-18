// /** 
//  * Content Script To Handle JS. 
//  */

console.log("deadass")
const port = chrome.runtime.connect({ name: 'background' });
console.log(`this is the port: ${port}`)
port.onMessage.addListener(async (msg) => {
    console.log("connected?");
    if (msg.purpose == "birdClassifyModal") {
        console.log("wowa");
        // opening bird classification modal. 
        const div = document.createElement("div")
        div.setAttribute("id", "inject-container");
        document.body.appendChild(div);

        // add the modal!
        fetch(chrome.runtime.getURL("modal.html"))
            .then(response => response.text())
            .then(data => {
                // adding the modal
                document.getElementById('inject-container').innerHTML = data;
                const modal = document.getElementsByClassName("modal")[0] 
                modal.style.display = "block";
                
                window.onclick = function(e){
                    if(e.target == modal){
                        modal.style.display = "none"
                    }
                }
        }); 
    }
}); 


// // {
//     "name": "Birds",
//     "manifest_version": 3,
//     "version": "0.0.0",
//     "content_scripts": [
//       {
//         "matches": ["<all_urls>"],
//         "js": ["content_script.js"],
//         "all_frames": true,
//         "world": "MAIN"
//       } 
//     ], 
//     "permissions": [
//       "storage", 
//       "contextMenus"
//     ], 
//     "action": { "default_popup": "index.html" },
//     "background": {
//       "service_worker": "background.js"
//     },
//     "web_accessible_resources": [
//       {
//         "resources": ["modal.html"],
//         "matches": ["<all_urls>"]
//       }
//     ]
// }