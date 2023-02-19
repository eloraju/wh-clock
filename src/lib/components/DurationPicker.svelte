<script lang="ts">
  import SubButton from '$lib/components/SubButton.svelte';
  let duration = 1.5 * 60 * 60 // 1.5h

  $: hours = Math.floor(duration / 3600)
  $: minutes = Math.floor((duration/60))%60 || "00"

  function add15min() {
    duration = duration + 15 * 60
  }

  function subtract15min() {
    if(duration <= 0) {
      duration = 0
    } else {
    duration = duration - 15 * 60
    }
  }

  function prefixZero(num: number): string {
    if(num<10) {
      return `0${num}`
    }
    return `${num}`
  }
</script>

<div class="flex flex-col gap-3 w-full justify-center text-center items-center">
  <h1 class="font-light">Game time</h1>
  <div class="flex flex-row gap-3 w-full justify-center text-center items-center">
    <SubButton clickHandler={subtract15min}>-15min</SubButton>
    <span class="text-xl font-bold">{hours}h</span>
    <span class="text-xl font-bold">{minutes}min</span>
    <SubButton clickHandler={add15min}>+15min</SubButton>
    <input type="number" name="duration" hidden bind:value={duration}/>
  </div>
</div>