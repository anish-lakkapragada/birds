<script>
  /** @type {import('./$types').PageData} */
  import DomParser from "dom-parser";
  import {browser} from "$app/environment";
  import Carousel from 'svelte-carousel';
  import Speedometer from "svelte-speedometer"; 
  import { parse } from 'node-html-parser';
  export let data;

  const {imageUrl, wikipediaImageURL, nuthatchDataAvailable, sciName, realName, description, nuthatchData, wikipediaDataAvailable, wikipediaPageHTML} = data; 
  const parser = new DomParser();
	const wikipediaDocument = parser.parseFromString(wikipediaPageHTML);
  const loaded = [0];
  let fcked = false;  
  let name = realName;
  let key = 0; 
  let carousel; 
  let wikipediaRecording; 
  let audioAttrs; 
  let audioRecordingURL; 

  const quickFactsCSS = "mt-0 text-center text-2xl"; 
  fetch(`https://xeno-canto.org/api/2/recordings?query=${sciName}`).then(resp => resp.json()).then(xenoRecordingData => {
    const numRecordings = parseInt(xenoRecordingData.numRecordings);
    if (numRecordings >= 1) {
      audioRecordingURL = xenoRecordingData.recordings[0]?.file;
      console.log(audioRecordingURL)
    }
  })

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
    if (wikipediaDocument.getElementsByTagName("audio").length > 0) {
      const root = parse(wikipediaPageHTML); 
      const audioElements = root.getElementsByTagName("audio");
      // https://en.wikipedia.org/wiki/File:Carpodacus_mexicanus_vocalizations_-_pone.0027052.s006.oga
      wikipediaRecording = `https://en.wikipedia.org/wiki/File:${audioElements[0].rawAttributes['data-mwtitle']}` 
      audioAttrs = audioElements[0].rawAttributes;
    }

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
  console.log(audioRecordingURL);

</script>

{#if fcked} 
  <h1> Fcked </h1>
{/if}

<h1 class="text-center text-4xl"> {name} (<em> {sciName}</em>)</h1> 

  <div class="flex flex-row justify-center gap-2"> 
    {#if browser}
      <div class={audioRecordingURL ? "w-[250px] h-[250px] -mt-[100px]" : "w-[250px] h-[250px]"}> 
        <Carousel let:loaded bind:this={carousel}>  
          {#each imageSrcs as {imageSrc, imageIndex} (imageSrc)} 
            <div class="img-container"> 
              {#if loaded.includes(imageIndex)}
                <img class="w-full object-cover" src={imageSrc} alt={name ? `A photo of a ${name} bird.`: ""} width="200" height="200"> 
              {/if}
            </div>
          {/each}
        </Carousel>
        {#if audioRecordingURL}
          <div class="flex flex-col justify-center"> 
              <h2 class="text-2xl"> Audio of {name} </h2>
              <audio class="w-[250px]"
                controls
              > <source src={audioRecordingURL}></audio>
          </div>
        {/if}
      </div>
    {/if}
    <div class="p-0 mt-0"> 

      {#if wikipediaDataAvailable}
        <p class="mdc-typography--headline6"> {description} </p>
      {:else}
        <p class="mdc-typography--headline6 mb-8"> Unfortunately, we do not have any description of this bird. </p>
      {/if}

      {#if nuthatchDataAvailable}
        <h1 class={audioRecordingURL ? quickFactsCSS + " ml-8" : quickFactsCSS}> Quick Facts </h1> 
        <div class="mt-0 text-md flex flex-row gap-[6em] w-full justify-center"> 
          <p> <strong> Concern: </strong> {nuthatchData[0].status} </p>
          {#if nuthatchData[0].wingspanMin && nuthatchData[0].wingspanMax} <p> <strong> Wingspan Length: </strong> {nuthatchData[0].wingspanMin}-{nuthatchData[0].wingspanMax}cm </p> {/if}
          {#if nuthatchData[0].lengthMin && nuthatchData[0].lengthMax} <p> <strong> Bird Length: </strong> {nuthatchData[0].lengthMin}-{nuthatchData[0].lengthMax}cm </p> {/if}
        </div>
      {/if}
    </div>
  </div>
