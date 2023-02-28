<script lang="ts">
    import aquila from "$lib/assets/aquila_full.png";
    import type { Army } from "$lib/assets/icons/armies";
    import PointTracker from "./PointTracker.svelte";
    export let active = false;
    export let playerName = "NONAME";
    export let durationLeft: number;
    export let army: Army;

    let icon = army.icon ?? aquila;

    // Coloring variables
    let activeBg = army.colors?.activeBg ?? "#060";
    let activeColor=army.colors?.activeColor ?? "white";
    let inactiveBg=army.colors?.inactiveBg ?? "#777";
    let inactiveColor=army.colors?.inactiveColor ?? "white";
    let goneOverBg=army.colors?.goneOverBg ?? "#600";
    let goneOverColor=army.colors?.goneOverColor ?? "#600";
    let iconColor=army.colors?.iconColor ?? "black";

    let styles = {
      'active-bg': activeBg,
      'active-color': activeColor,
      'inactive-bg': inactiveBg,
      'inactive-color': inactiveColor,
      'gone-over-bg': goneOverBg,
      'gone-over-color': goneOverColor,
      'icon-color': iconColor
    }

    // Create css variables that can be changed on the fly
    $: cssVarStyles = Object.entries(styles)
      // This creates a "--varname: value;" that can be referenced in the css sheet below
      .map(([k,v]) => `--${k}:${v}`)
      .join(";")

    console.log(`${playerName} colors`, cssVarStyles, styles)


    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // this gets called any time durationLeft changes
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
    class="grow h-100 flex flex-col flex-1 py-5 px-5 text-6xl items-center gap-10"
    class:active={!goneOver && active}
    class:inactive={!goneOver && !active}
    class:overtime={goneOver}
    style={cssVarStyles}
>
    <div class="relative flex flex-col justify-start text-center">
        <h1 class="font-bold text-7xl z-10">{playerName}</h1>
        <h2 class="font-light text-3xl z-10">{army.name}</h2>
        {#if active}
            <img
                class="opacity-20 z-0 absolute self-center w-[80%]"
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
    <PointTracker secondaries={["Raise the banners", "Psychic interrigation", "Take no prisoners"]}/>
</div>

<style lang="postcss">
    .active {
        background-color: var(--active-bg);
        color: var(--active-color, black);
    }

    .inactive {
        background-color: var(--inactive-bg);
        color: var(--inactive-color, black);
    }

    .overtime {
        background-color: var(--gone-over-bg);
        color: var(--active-color, black);
    }
</style>
