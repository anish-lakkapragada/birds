// /** 
//  * Content Script To Handle JS. 
//  */

import {createRoot} from "react-dom/client";

const port = chrome.runtime.connect({ name: 'background' });
const ENDPOINT = "http://127.0.0.1:8000";
port.onMessage.addListener(async (msg) => {
    if (msg.purpose == "birdClassifyModal") {
        const {srcUrl} = msg; 
        // opening bird classification modal. 
        const div = document.createElement("div")
        div.setAttribute("id", "inject-container");
        document.body.appendChild(div);
        
        if (document.visibilityState == "visible") {
            // console.log(
            //   chrome.runtime.getURL(
            //     "src/modal.html?url=http://localhost:5173/Cyanocorax%20ynca?url=https://pbs.twimg.com/media/FpgCSxAaAAAFPBJ?format=jpg&name=4096x4096"
            //   )
            // );
            // console.log("WTF");

            // get the bird type first 
            const data = await fetch(`${ENDPOINT}/predict?imageURL=${srcUrl}`); 
            const classificationResp = await data.json(); 
            let successClassification = true; 
            if (
              classificationResp.error ||
              classificationResp.SN.includes("background")
            ) {
              successClassification = false;
            }

            console.log(classificationResp);
        
            // // add the modal!
            // fetch(
            //   chrome.runtime.getURL(
            //     "src/modal.html?url=http://localhost:5173/Cyanocorax%20ynca?url=https://pbs.twimg.com/media/FpgCSxAaAAAFPBJ?format=jpg&name=4096x4096"
            //   )
            // )
            //   .then((response) => response.text())
            //   .then((data) => {
            //     // adding the modal
            //     console.log(data);
            //     document.getElementById("inject-container").innerHTML = data;

            //     const modal = document.getElementsByClassName("modal")[0];
            //     modal.style.display = "block";

            //     window.onclick = function (e) {
            //       if (e.target == modal) {
            //         modal.style.display = "none";
            //       }
            //     };
            //   });

            const root = createRoot(document.getElementById("inject-container")); 
            let element;
            if (successClassification) {
                element = (
                    <div className="modal" style={{display: "Block"}}>
                    <div className="modal-content" id="parenty">
                        <iframe
                        style={{ width: "100%", border: "0" }}
                        className="iframy"
                        src={`http://localhost:5173/${classificationResp.SN}?url=${srcUrl}`}
                        ></iframe>
                    </div>
                    </div>
                );
            }

            else {
                element = (
                  <div className="modal" style={{display: "block"}}>
                    <div className="modal-content" id="parenty">
                      <h1 style={{ width: "100%", border: "0" }}>
                        {" "}
                        Unfortunately, our extension could not provide an
                        accurate caption for this bird image 😭
                      </h1>
                    </div>
                  </div>
                );
            }
            
            root.render(element);
            
            while (document.getElementsByClassName("modal").length == 0) {
                await new Promise((resolve) => setTimeout(resolve, 200));
            }

            console.log("chCKEING");
            const modal = document.getElementsByClassName("modal")[0];
            // modal.style.display = "block";

            window.onclick = (e) => {
                if (e.target == modal) {
                    modal.style.display = "none";
                    window.location.reload();
                }
            }


          // "http://localhost:5173/Cyanocorax%20ynca?url=https://pbs.twimg.com/media/FpgCSxAaAAAFPBJ?format=jpg&name=4096x4096";
        }
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