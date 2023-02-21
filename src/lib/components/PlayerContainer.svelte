<script lang="ts">
    import aquila from "$lib/assets/aquila_full.png";
    export let active = false;
    export let playerName = "NONAME";
    export let durationLeft: number;
    export let icon = aquila;

    // Coloring variables
    export let activeBg = "#060";
    export let activeColor: "black";
    export let inactiveBg: "#77";
    export let inactiveColor: "black";
    export let goneOverBg: string;
    export let goneOverColor: "#600";
    export let iconColor: "black";

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
    style={cssVarStyles}
>
    <h2 class="font-bold text-7xl ">{playerName}</h2>
    {#if active}
        <img
            class="opacity-20 z-0 absolute h-[60%]"
            src={icon}
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
