<script lang="ts">
  import aquila from '$lib/assets/aquila_full.png'
  export let active = false;
  export let playerName = "NONAME";
  export let hours = 0;
  export let minutes = 0;
  export let seconds = 0;

  function prefixWith0(num: Number): string {
    if(num<10) {
      return `0${num}`
    }
    return `${num}`
  }
</script>

<div 
class="grow z-10 relative h-100 flex flex-col flex-1 p-5 text-6xl justify-center items-center gap-10"
class:active={active}
class:inactive={!active}
>
            <h2 class="font-bold text-7xl ">{playerName}</h2>
            {#if active}
              <img class="opacity-20 z-0 absolute w-full h-full" src={aquila} alt="Active player"/>
            {/if}
        <span>{prefixWith0(hours)}:{prefixWith0(minutes)}:{prefixWith0(seconds)}</span>
</div>

<style lang="postcss">
  .active {
    background-color: #006600;
  }

  .inactive {
    background-color: #777;
  }
</style>