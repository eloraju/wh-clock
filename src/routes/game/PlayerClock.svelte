<script lang="ts">
    import aquila from "$lib/assets/aquila_full.png";
    import type { Army } from "$lib/assets/icons/armies";
    export let active = false;
    export let playerName: string;
    export let durationLeft: number;
    export let army: Army;

    let icon = army.icon ?? aquila;

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // this gets called any time durationLeft changes
    $: _ = calculateTimes(durationLeft)

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

<div class="relative flex gap-4 flex-col justify-start text-center">
    <h1 class="font-bold text-7xl z-10">{playerName}</h1>
    <h2 class="font-light text-3xl z-10">{army.name}</h2>
    {#if active}
        <img
            class="opacity-20 z-0 absolute self-center h-full"
            src={icon}
            alt="Active player"
        />
    {/if}
    <div class="z-10"
        >{prefixWith0(hours)}:{prefixWith0(minutes)}:{prefixWith0(
            seconds
        )}</div
    >
</div>
