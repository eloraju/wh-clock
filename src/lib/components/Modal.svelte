<script lang="ts">
  // Shamelessly copied from svelte examples
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  // We'll listen to this in the parent component and handle the hiding and showing from there
  const close = () => dispatch("close")

  let modal

  function handleKeydown(event: KeyboardEvent) {
    if(event.key === "Escape")  {
      console.log("Escape pressed?")
      close();
      return;
    }
  }
</script>


<svelte:window on:keydown={handleKeydown}/>
<!-- svelte-ignore ally-autofocus -->
<div class="modal-bg"></div>

<div class="modal" role="dialog" bind:this={modal}>
  <slot name="header"></slot>
  <slot name="body"></slot>
</div>

<style lang="postcss">
  .modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
    z-index: 50;
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%,-50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
    z-index: 60;
  }
</style>
