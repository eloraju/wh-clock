<script lang="ts">
  import type {GameState} from "$lib/types";
  import Modal from "$lib/components/Modal.svelte";

  export let gameState: GameState;
  export let showModal: boolean;
  export let startingPlayerName: string;
  export let playerAfterPause: string;
</script>

{#if showModal}
    <Modal>
        <div slot="header" class="h-12 bg-blue-800 text-white">
            {#if gameState === "START"}
                Ready yourselves!
            {:else if gameState === "END"}
                The match has concluded
            {:else if gameState === "PAUSE"}
                Biobrake
            {/if}
        </div>
        <div slot="body">
            {#if gameState === "START"}
                <p>Press space or enter to start the game</p>
                <p>{startingPlayerName} will have the first turn</p>
            {:else if gameState === "END"}
                The match has concluded
            {:else if gameState === "PAUSE"}
                <p>Time to empty thine bladder</p>
                <p>{playerAfterPause} will continue</p>
            {/if}
        </div>
    </Modal>
{/if}
