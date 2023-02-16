/** 
 * Content Script To Handle JS. 
 */

const port = chrome.runtime.connect({ name: 'background' });
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
