import { c as create_ssr_component, e as escape, d as add_attribute } from "../../../../chunks/index.js";
import DomParser from "dom-parser";
import "easy-reactive";
import { parse } from "node-html-parser";
const Dot_svelte_svelte_type_style_lang = "";
const Dots_svelte_svelte_type_style_lang = "";
const Arrow_svelte_svelte_type_style_lang = "";
const Progress_svelte_svelte_type_style_lang = "";
const Carousel_svelte_svelte_type_style_lang = "";
const quickFactsCSS = "mt-0 text-center text-2xl";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { imageUrl, wikipediaImageURL, nuthatchDataAvailable, sciName, realName, description, nuthatchData, wikipediaDataAvailable, wikipediaPageHTML } = data;
  const parser = new DomParser();
  const wikipediaDocument = parser.parseFromString(wikipediaPageHTML);
  let fcked = false;
  let name = realName;
  let audioRecordingURL;
  if (nuthatchDataAvailable) {
    name = nuthatchData[0].name;
    for (const imageUrlNuthatch of nuthatchData[0].images) {
    }
  }
  if (wikipediaDataAvailable) {
    if (wikipediaDocument.getElementsByTagName("audio").length > 0) {
      const root = parse(wikipediaPageHTML);
      const audioElements = root.getElementsByTagName("audio");
      `https://en.wikipedia.org/wiki/File:${audioElements[0].rawAttributes["data-mwtitle"]}`;
      audioElements[0].rawAttributes;
    }
    if (wikipediaImageURL?.length)
      ;
  }
  if (!(nuthatchDataAvailable || wikipediaDataAvailable)) {
    fcked = true;
  }
  console.log(`identified name: ${name}`);
  console.log(audioRecordingURL);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${fcked ? `<h1>Fcked </h1>` : ``}

<h1 class="${"text-center text-4xl"}">${escape(name)} (<em>${escape(sciName)}</em>)</h1> 

  <div class="${"flex flex-row justify-center gap-2"}">${``}
    <div class="${"p-0 mt-0"}">${wikipediaDataAvailable ? `<p class="${"mdc-typography--headline6"}">${escape(description)}</p>` : `<p class="${"mdc-typography--headline6 mb-8"}">Unfortunately, we do not have any description of this bird. </p>`}

      ${nuthatchDataAvailable ? `<h1${add_attribute(
      "class",
      quickFactsCSS,
      0
    )}>Quick Facts </h1> 
        <div class="${"mt-0 text-md flex flex-row gap-[6em] w-full justify-center"}"><p><strong>Concern: </strong> ${escape(nuthatchData[0].status)}</p>
          ${nuthatchData[0].wingspanMin && nuthatchData[0].wingspanMax ? `<p><strong>Wingspan Length: </strong> ${escape(nuthatchData[0].wingspanMin)}-${escape(nuthatchData[0].wingspanMax)}cm </p>` : ``}
          ${nuthatchData[0].lengthMin && nuthatchData[0].lengthMax ? `<p><strong>Bird Length: </strong> ${escape(nuthatchData[0].lengthMin)}-${escape(nuthatchData[0].lengthMax)}cm </p>` : ``}</div>` : ``}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
