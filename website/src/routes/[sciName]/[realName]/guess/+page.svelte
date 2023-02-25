<script> 
    import {getNames} from "../../../helpers";
    import AutoComplete from "simple-svelte-autocomplete"
    import { goto } from '$app/navigation';
    import {browser} from "$app/environment";
    import { Button } from 'sveltestrap';
    export let data; 
    const {sciName, realName, imageUrl} = data;
    const birdnames = getNames();  
    let chosenBirdName;
    let clarificationText; 
    let success = false; 

    function dip() {
        if (browser) {
                goto(`/${sciName}/${realName}?url=${imageUrl}`); 
        }
    }

    function validate(birdNameSelected) {
        if (birdNameSelected == realName) {
            console.log("we have a winner!");
            clarificationText = "Congratulations!";
            success = true; 
        }

        if (!success) {return;} 

        // wait two seconds 
        new Promise((r) => setTimeout(r, 750)).then(() => {
            console.log("hks");
            dip();
        }); 
    }

    $: validate(chosenBirdName)
</script> 

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
</svelte:head>

{#if realName !== "background"}
    <div class="text-center"> 
        <h1 class="text-center text-4xl"> Guess This Bird! </h1>
        <p class="text-2xl"> <em> Once you select the correct bird species, <br> you will automatically be directed to a page about that bird. 
    </div>
    
    <div class="flex flex-row justify-center gap-2"> 
        <img class="w-[200px] h-[200px] object-cover" src={imageUrl} alt={`A photo of an unnamed bird.`}> 
        <div>  
            <h2 class="text-xl mt-0"> Select Bird Name Below </h2>
            <AutoComplete items={birdnames} bind:selectedItem={chosenBirdName} />
            {#if chosenBirdName}
                {#if success}
                    <pre class="text-xl mt-1 text-green-500"> {`Correct! This is a ${chosenBirdName}!`} </pre>
                {:else}
                    <pre class="text-xl mt-1 text-red-500"> {`This is not a ${chosenBirdName}.`} </pre>
                {/if}
            {/if}
            <!-- at least u cant write components.-->
            <div on:click={dip} on:keydown={dip}>
                <Button color="primary" block class="block mt-2"> Reveal Bird! </Button>
            </div>
        </div>
    </div>
{:else}
    <h1 class="text-center text-4xl"> Unfortunately, our AI does not recognize this bird. </h1>
{/if}

