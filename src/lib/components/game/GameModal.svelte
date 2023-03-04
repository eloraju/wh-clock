<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { gameStateStore } from "$lib/stores/stateStore";
    import type { Player, State } from "$lib/types";

    export let showModal: boolean;

    let gameState: State;
    let playerAfterPause: Player;
    let startingPlayerName: string;

    gameStateStore.subscribe((state) => {
        gameState = state.state as State;
        startingPlayerName = state.startingPlayer;
        playerAfterPause = state.turnBeforePause;
    });
</script>

{#if showModal}
    <Modal>
        <div slot="header" class="h-12 bg-blue-800 text-white">
            {#if gameState === "INIT"}
                Ready yourselves!
            {:else if gameState === "END"}
                The match has concluded
            {:else if gameState === "PAUSE"}
                Biobrake
            {/if}
        </div>
        <div slot="body">
            {#if gameState === "INIT"}
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
