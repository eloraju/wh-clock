<script lang="ts">
  import PlayerContainer from "$lib/components/PlayerContainer.svelte";
  import type {GameState} from "$lib/types";
  import {match} from "ts-pattern";
  import GameModal from "./GameModal.svelte";
  import {armies, type Army} from "../../lib/assets/icons/armies.js";


  export let data;

  let {playerA, playerB, gameTime, startingPlayer, armyA, armyB} = data;
  gameTime = parseFloat(gameTime);

  let turnNumber = 1;
  let turnHalf = 1;

  let gameState: GameState = "START";
  let previousTurn: GameState = startingPlayer === "A" ? "A" : "B";
  let startingPlayerName = startingPlayer === "A" ? playerA : playerB;

  let playerAGameTimer = gameTime;
  let playerBGameTimer = gameTime;
  let armyAData: Army = armies.find(a => a.name === armyA) as Army
  let armyBData: Army = armies.find(a => a.name === armyB) as Army

  let showModal = true;

  $: turnString = () => {
    if (turnNumber < 6) {
      return `${turnNumber} - ${turnHalf}`;
    }
    gameState = "END";
    return "THE END";
  };
  $: playerAfterPause = previousTurn === "A" ? playerA : playerB;
  const ticker = setInterval(() => {
    match(gameState)
      .with("A", () => (playerAGameTimer = Math.max(0, playerAGameTimer - 1)))
      .with("B", () => (playerBGameTimer = Math.max(0, playerBGameTimer - 1)))
      .with("PAUSE", () => {})
      .with("START", () => {})
      .with("END", () => {clearInterval(ticker);})
      .exhaustive();
  }, 1000);

  function switchActive() {
    if (gameState === "PAUSE") {
      showModal = false;
      gameState = previousTurn;
    } else {
      // Just in case...
      showModal = false;
      gameState = gameState === "A" ? "B" : "A";
    }
  }

  function togglePause() {
    if (gameState === "PAUSE" || gameState === "START") {
      showModal = false;
      gameState = previousTurn;
    } else {
      previousTurn = gameState;
      gameState = "PAUSE";
      showModal = true;
    }
  }

  function increaseTurnNumber() {
    turnHalf = (turnHalf % 2) + 1;
    if (turnHalf === 1) {
      turnNumber = turnNumber + 1;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.repeat) return;

    console.log(event.code);
    match(event.code)
      .with("Space", () => {
        event.preventDefault();
        switchActive()
      })
      .with("Enter", () => {
        event.preventDefault();
        togglePause()
      })
      .with("KeyT", () => {
        event.preventDefault();
        increaseTurnNumber()
      })
      .otherwise(() => {
      })
  }
</script>

<svelte:window on:keypress={handleKeyPress}/>
<div class="w-full h-screen flex flex-col">
    <div
            class="flex flex-col h-16 bg-green-800 text-center text-xl font-bold italic"
    >
        {#if gameState !== "END"}
            <button on:click={() => increaseTurnNumber()}>{turnString()}</button>
            <div class="flex flex-row gap-6 justify-center">
                {#if gameState !== "PAUSE"}
                    <button on:click={() => {switchActive()}}>Switch active player</button
                    >
                {/if}
                <button
                        on:click={() => {
                    togglePause();
                }}>{gameState === "PAUSE" ? "Resume" : "Pause"}</button
                >
            </div>
        {:else}
            <span class="text-xl font-bold">THE END</span>
        {/if}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!--<div class="h-full flex flex-row" on:click={()=>switchActive()}>-->
    <div class="h-full flex flex-row">
        <PlayerContainer
                active={gameState === "A"}
                playerName={playerA}
                bind:durationLeft={playerAGameTimer}
                army={armyAData}
        />
        <PlayerContainer
                active={gameState === "B"}
                playerName={playerB}
                bind:durationLeft={playerBGameTimer}
                army={armyBData}
        />
    </div>
</div>
<GameModal {showModal} {gameState} {playerAfterPause} {startingPlayerName}/>