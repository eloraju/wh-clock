<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { gameStateStore, togglePause } from "$lib/stores/stateStore";
    import type { State } from "$lib/types";
    import { match } from "ts-pattern";

    export let showModal: boolean;

    let gameState: State;
    let nextPlayerName: string;

    gameStateStore.subscribe(
        ({ state, playerA, playerB, turnBeforePause, startingPlayer }) => {
            match(state)
                .with(
                    "INIT",
                    () =>
                        (nextPlayerName =
                            startingPlayer === "A"
                                ? playerA.playerName
                                : playerB.playerName)
                )
                .with(
                    "PAUSE",
                    () =>
                        (nextPlayerName =
                            turnBeforePause === "A"
                                ? playerA.playerName
                                : playerB.playerName)
                )
                .otherwise(()=>{});
            gameState = state;
        }
    );

    function handleClose() {
        match(gameState)
        .with("PAUSE", togglePause)
        .with("INIT", togglePause)
        .otherwise(() => {})
    }
</script>

{#if showModal}
    <Modal on:close={handleClose}>
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
                <p>{nextPlayerName} will have the first turn</p>
            {:else if gameState === "END"}
                The match has concluded
            {:else if gameState === "PAUSE"}
                <p>Time to empty thine bladder</p>
                <p>{nextPlayerName} will continue</p>
            {/if}
        </div>
    </Modal>
{/if}
