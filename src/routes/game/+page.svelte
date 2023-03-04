<script lang="ts">
    import PlayerContainer from "$lib/components/game/PlayerContainer.svelte";
    import { match } from "ts-pattern";
    import GameModal from "$lib/components/game/GameModal.svelte";
    import { armies, type Army } from "../../lib/assets/icons/armies.js";
    import {
        advanceRound,
        gameStateStore,
        switchPlayerTurn,
        togglePause,
    } from "$lib/stores/stateStore.js";
    import type { GameState } from "$lib/types.js";

    console.log(JSON.stringify(gameStateStore));

    let gameState: GameState;
    gameStateStore.subscribe((state) => (gameState = state));

    $: startingPlayerName =
        gameState.startingPlayer === "A"
            ? gameState.playerA.playerName
            : gameState.playerB.playerName;

    let playerAGameTimer = gameState.playerA.timer;
    let playerBGameTimer = gameState.playerB.timer;
    let armyAData: Army = armies.find(
        (a) => a.name === gameState.playerA.armyName
    ) as Army;
    let armyBData: Army = armies.find(
        (a) => gameState.playerB.armyName === a.name
    ) as Army;

    let showModal = true;


    const ticker = setInterval(() => {
        match(gameState.state)
            .with("A", () => {
                playerAGameTimer = Math.max(0, playerAGameTimer - 1);
            })
            .with("B", () => {
                playerBGameTimer = Math.max(0, playerBGameTimer - 1);
            })
            .with("END", () => {
                clearInterval(ticker);
            })
            .otherwise(() => {});
    }, 1000);

    function togglePauseAndHideModal() {
        showModal = !showModal;
        togglePause(gameState);
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.repeat) return;

        match(event.code)
            .with("Space", () => {
                event.preventDefault();
                match(gameState.state)
                    .with("INIT", () => togglePauseAndHideModal())
                    .with("PAUSE", () => togglePauseAndHideModal())
                    .otherwise(() => switchPlayerTurn(gameState));
            })
            .with("Escape", () => {
                event.preventDefault();
                togglePauseAndHideModal();
            })
            .with("Enter", () => {
                event.preventDefault();
                match(gameState.state)
                    .with("INIT", () => togglePauseAndHideModal())
                    .with("PAUSE", () => togglePauseAndHideModal())
                    .otherwise(() => advanceRound(gameState));
            })
            .run();
    }
</script>

<svelte:window on:keydown={handleKeyPress} />
<div class="h-full flex flex-row">
    <PlayerContainer
        active={gameState.state === "A"}
        playerName={gameState.playerA.playerName}
        bind:durationLeft={playerAGameTimer}
        army={armyAData}
    />
    <PlayerContainer
        active={gameState.state === "B"}
        playerName={gameState.playerB.playerName}
        bind:durationLeft={playerBGameTimer}
        army={armyBData}
    />
</div>
<GameModal showModal/>