<script lang="ts">
    import aquila from "$lib/assets/aquila_full.png";
    import {createEventDispatcher} from "svelte";
    export let active = false;
    export let playerName = "NONAME";
    export let durationLeft: number;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    $: _ = calculateTimes(durationLeft)
    $: goneOver= durationLeft <= 0;

    function prefixWith0(num: Number): string {
        if (num < 10) {
            return `0${num}`;
        }
        return `${num}`;
    }

    function calculateTimes(duration: number) {
      hours = Math.floor(duration / 3600)
      minutes = Math.floor((duration/60)%60)
      seconds = duration % 60;
    }
</script>

<div
    class="grow z-10 relative h-100 flex flex-col flex-1 p-5 text-6xl justify-center items-center gap-10"
    class:active={!goneOver && active}
    class:inactive={!goneOver && !active}
    class:overtime={goneOver}
>
    <h2 class="font-bold text-7xl ">{playerName}</h2>
    {#if active}
        <img
            class="opacity-20 z-0 absolute w-[80%]"
            src={aquila}
            alt="Active player"
        />
    {/if}
    <span
        >{prefixWith0(hours)}:{prefixWith0(minutes)}:{prefixWith0(
            seconds
        )}</span
    >
</div>

<style lang="postcss">
    .active {
        background-color: #060;
    }

    .inactive {
        background-color: #777;
    }

    .overtime {
      background-color: #600;
    }
</style>
