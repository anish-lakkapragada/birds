<script>
  /** @type {import('./$types').PageData} */
  import DomParser from "dom-parser";
  import {browser} from "$app/environment";
  import Carousel from 'svelte-carousel';
  import Speedometer from "svelte-speedometer"; 
  import { parse } from 'node-html-parser';
  export let data;

  const {imageUrl, wikipediaImageURL, nuthatchDataAvailable, sciName, description, nuthatchData, wikipediaDataAvailable, wikipediaPageHTML} = data; 
  const parser = new DomParser();
	const wikipediaDocument = parser.parseFromString(wikipediaPageHTML);
  const loaded = [0];
  let name; 
  let fcked = false;  
  let key = 0; 
  let carousel; 

  const imageSrcs = [];
  imageSrcs.push({imageSrc: imageUrl, imageIndex: key});
  if (nuthatchDataAvailable) {
    name = nuthatchData[0].name;
    for (const imageUrlNuthatch of nuthatchData[0].images) {
      key += 1; 
      imageSrcs.push({imageSrc: imageUrlNuthatch, imageIndex: key})
    }
  }

  if (wikipediaDataAvailable) {
    // get the name from wikipedia 
    name = name ? name : wikipediaDocument.getElementsByClassName("mw-page-title-main").innerHTML
    //description = Array.from(wikipediaDocument.getElementsByClassName("mw-parser-output")[0].children).filter((element) => element.nodeName == "P")[1].innerHTML
    if (wikipediaImageURL?.length) {
          key += 1; 
          imageSrcs.push({imageSrc: wikipediaImageURL, imageIndex: key});
    } 
  }
  
  if (!(nuthatchDataAvailable || wikipediaDataAvailable)) {
    fcked = true;  
  }

  console.log(`identified name: ${name}`)

</script>

{#if fcked} 
  <h1> Fcked </h1>
{/if}

<h1 class="text-center text-4xl"> {name} (<em> {sciName}</em>)</h1> 

  <div class="flex flex-row justify-center gap-2"> 
    {#if browser}
      <div class="w-[250px] h-[250px]"> 
        <Carousel let:loaded bind:this={carousel}>  
          {#each imageSrcs as {imageSrc, imageIndex} (imageSrc)} 
            <div class="img-container"> 
              {#if loaded.includes(imageIndex)}
                <img class="w-full object-cover" src={imageSrc} alt={name ? `A photo of a ${name} bird.`: ""} width="200" height="200"> 
              {/if}
            </div>
          {/each}
        </Carousel>
      </div>
    {/if}
    <div class="p-0 mt-0"> 

      {#if wikipediaDataAvailable}
        <p class="mdc-typography--headline6"> {description} </p>
      {:else}
        <p class="mdc-typography--headline6 mb-8"> Unfortunately, we do not have any description of this bird. </p>
      {/if}

      {#if nuthatchDataAvailable}
        <h1 class="-mt-4 text-center text-2xl"> Quick Facts </h1> 
        <div class="-mt-4 text-xl flex flex-row gap-[6em] w-full justify-center"> 
          <p> <strong> Concern: </strong> {nuthatchData[0].status} </p>
          {#if nuthatchData[0].wingspanMin && nuthatchData[0].wingspanMax} <p> <strong> Wingspan Length: </strong> {nuthatchData[0].wingspanMin}-{nuthatchData[0].wingspanMax}cm </p> {/if}
          {#if nuthatchData[0].lengthMin && nuthatchData[0].lengthMax} <p> <strong> Bird Length: </strong> {nuthatchData[0].lengthMin}-{nuthatchData[0].lengthMax}cm </p> {/if}
        </div>
      {/if}
    </div>
  </div>
