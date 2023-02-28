<script lang="ts">
    import type { Army } from "$lib/assets/icons/armies";
    import PlayerClock from "./PlayerClock.svelte";
    import PointTracker from "./PointTracker.svelte";
    export let active = false;
    export let playerName = "NONAME";
    export let durationLeft: number;
    export let army: Army;


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

    $: goneOver= durationLeft <= 0;
</script>

<div
    class="grow h-100 flex flex-col flex-1 py-5 px-5 text-6xl items-center gap-10"
    class:active={!goneOver && active}
    class:inactive={!goneOver && !active}
    class:overtime={goneOver}
    style={cssVarStyles}
>
    <PlayerClock {army} {durationLeft} {playerName} {active}/>
    <PointTracker secondaries={["Secondary 1", "Secondary 2", "Secondary 3"]}/>
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
