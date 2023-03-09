<script lang="ts">
    import { advanceRound, gameStateStore, switchPlayerTurn, togglePause } from "$lib/stores/stateStore";
    import type { GameState } from "$lib/types";

    let gameState: GameState;
    gameStateStore.subscribe(state => gameState = state)

    $: turnString = () => {
        if (gameState.state === "END") return "THE END";

        return `${gameState.roundNumber} - ${gameState.turnNumber}`;
    };
</script>
<div class="h-screen flex flex-col">
<div
    class="flex flex-col h-16 bg-green-800 text-center text-xl font-bold italic"
>
    {#if gameState.state !== "END"}
        <button on:click={() => advanceRound()}>{turnString()}</button>
        <div class="flex flex-row gap-6 justify-center">
            {#if gameState.state !== "PAUSE"}
                <button
                    on:click={() => {
                        switchPlayerTurn();
                    }}>Switch active player</button
                >
            {/if}
            <button
                on:click={() => {
                    togglePause(gameState);
                }}>{gameState.state === "PAUSE" ? "Resume" : "Pause"}</button
            >
        </div>
    {:else}
        <span class="text-xl font-bold">THE END</span>
    {/if}
</div>
<slot/>
</div>