<script>
  /** @type {import('./$types').PageData} */
  import DomParser from "dom-parser";
  import {browser} from "$app/environment";
  import Carousel from 'svelte-carousel'
  export let data;

  const {imageUrl, nuthatchDataAvailable, sciName, nuthatchData, wikipediaDataAvailable, wikipediaPageHTML} = data; 
  const parser = new DomParser();
	const wikipediaDocument = parser.parseFromString(wikipediaPageHTML);
  const loaded = [0];
  let name; 
  let description;
  let fcked = false;  
  let key = 0; 
  let carousel; 

  const imageSrcs = [];
  imageSrcs.push({imageSrc: imageUrl, imageIndex: key});
  if (nuthatchDataAvailable) {
    name = nuthatchData[0].name;
    console.log(nuthatchData[0])
    for (const imageUrlNuthatch of nuthatchData[0].images) {
      key += 1; 
      // imageSrcs.push({imageSrc: imageUrl, imageIndex: key})
    }
  }

  console.log(imageSrcs);

  if (wikipediaDataAvailable) {
    // get the name from wikipedia 
    name = name ? name : wikipediaDocument.getElementsByClassName("mw-page-title-main").innerHTML
    //description = Array.from(wikipediaDocument.getElementsByClassName("mw-parser-output")[0].children).filter((element) => element.nodeName == "P")[1].innerHTML
    description = wikipediaDocument.getElementsByClassName("mw-parser-output")[0].childNodes.filter((element) => element.nodeName == "p")[1].textContent;
  }

  if (!(nuthatchDataAvailable || wikipediaDataAvailable)) {
    fcked = true;  
  }

  console.log(`identified name: ${name}`)

</script>

{#if fcked} 
  <h1> Fcked </h1>
{/if}

<h1 class="text-center text-2xl"> {name} (<em> {sciName}</em>)</h1> 

{#if wikipediaDataAvailable}
  <div class="flex flex-row justify-center gap-2"> 
    {#if browser}
      <div class="w-[250px]"> 
        <Carousel let:loaded bind:this={carousel}>  
          {#each imageSrcs as {imageSrc, imageIndex} (imageSrc)} 
            <div class="img-container"> 
              {#if loaded.includes(imageIndex)}
                <img src={imageSrc} alt={name ? `A photo of a ${name} bird.`: ""} width="200"> 
              {/if}
            </div>
          {/each}
        </Carousel>
      </div>
    {/if}
    <p class="p-0 mt-0 mdc-typography--headline6"> {description} </p>
  </div>
{/if}
