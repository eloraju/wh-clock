<script lang="ts">
    import PlayerContainer from "$lib/components/game/PlayerContainer.svelte";
    import { match } from "ts-pattern";
    import GameModal from "$lib/components/game/GameModal.svelte";
    import { armies, type Army } from "../../lib/assets/icons/armies.js";
    import {
        advanceRound,
        decrementClock,
        gameStateStore,
        switchPlayerTurn,
        togglePause,
    } from "$lib/stores/stateStore.js";
    import type { GameState } from "$lib/types.js";

    let gameState: GameState;
    gameStateStore.subscribe((state) => (gameState = state));

    $: showModal = ["INIT", "PAUSE"].includes(gameState.state);

    let armyAData: Army = armies.find(
        (a) => a.name === gameState.playerA.armyName
    ) as Army;
    let armyBData: Army = armies.find(
        (a) => gameState.playerB.armyName === a.name
    ) as Army;

    const ticker = setInterval(() => {
        match(gameState.state)
            .with("END", () => {
                clearInterval(ticker);
            })
            .otherwise(() => {
                decrementClock();
            });
    }, 1000);

    function handleKeyPress(event: KeyboardEvent) {
        if (event.repeat) return;

        match(event.code)
            .with("Space", () => {
                event.preventDefault();
                match(gameState.state)
                    .with("INIT", () => togglePause())
                    .with("PAUSE", () => togglePause())
                    .otherwise(() => switchPlayerTurn());
            })
            .with("Escape", () => {
                event.preventDefault();
                togglePause();
            })
            .with("Enter", () => {
                event.preventDefault();
                match(gameState.state)
                    .with("INIT", () => togglePause())
                    .with("PAUSE", () => togglePause())
                    .otherwise(() => advanceRound());
            })
            .run();
    }

    function handlePlayAreaClick() {
        match(gameState.state)
            .with("INIT", togglePause)
            .with("PAUSE", togglePause)
            .otherwise(switchPlayerTurn);
    }
</script>

<svelte:window on:keydown={handleKeyPress} />
<div
    class="h-full flex flex-row"
    on:click={handlePlayAreaClick}
    on:keydown={console.log}
>
    <PlayerContainer
        active={gameState.state === "A"}
        player={gameState.playerA}
        army={armyAData}
    />
    <PlayerContainer
        active={gameState.state === "B"}
        player={gameState.playerB}
        army={armyBData}
    />
</div>
<GameModal {showModal} on:close={togglePause}/>

