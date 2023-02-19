<script lang="ts">
    import aquila from "$lib/assets/aquila.png";
    import PlayerContainer from "$lib/components/PlayerContainer.svelte";
    import type { Turn } from "$lib/types";
    import { match } from "ts-pattern";

    export let playerA = "Player A";
    export let playerB = "Player B";
    export let startingPlayer: Turn = "A";
    export let gameTime = 1.5 * 60 * 60; // 1h 30min
    

    let turnNumber = 1;
    let turnHalf = 1;

    let turn: Turn = (startingPlayer = "A");
    let previousTurn: Turn = "B";

    let playerAGameTimer = gameTime;
    let playerBGameTimer = gameTime;

    $: playerAHours = Math.floor(playerAGameTimer / 3600);
    $: playerAMinutes = Math.floor(
        (playerAGameTimer - playerAHours * 3600) / 60
    );
    $: playerASeconds = Math.floor(playerAGameTimer % 60);

    $: playerBHours = Math.floor(playerBGameTimer / 3600);
    $: playerBMinutes = Math.floor(
        (playerBGameTimer - playerBHours * 3600) / 60
    );
    $: playerBSeconds = Math.floor(playerBGameTimer % 60);
    $: turnString =()=> {
        if(turnNumber < 6) {
            return `${turnNumber} - ${turnHalf}`
        }
        turn = "PAUSE"
        return "THE END"
    }
    setInterval(() => {
        match(turn)
            .with("A", () => (playerAGameTimer = playerAGameTimer - 1))
            .with("B", () => (playerBGameTimer = playerBGameTimer - 1))
            .with("PAUSE", () => {})
            .exhaustive();
    }, 1000);

    function nextTurn() {
        if (turn === "PAUSE") {
            turn = previousTurn;
        } else {
            turn = turn === "A" ? "B" : "A";
        }
    }

    function togglePause() {
        if (turn === "PAUSE") {
            turn = previousTurn;
        } else {
            previousTurn = turn;
            turn = "PAUSE";
        }
    }

    function increaseTurnNumber() {
        turnHalf = (turnHalf % 2) + 1
        if(turnHalf === 1) {
            turnNumber = turnNumber + 1
        }
    }



    function handleKeyPress(event: KeyboardEvent) {
        if (event.repeat) return;

        console.log(event.code)

        switch (event.code) {
            case "Space": {
                event.preventDefault();
                nextTurn();
                break;
            }

            case "Enter": {
                event.preventDefault();
                togglePause();
                break;
            }

            case "KeyT": {
                event.preventDefault();
                increaseTurnNumber();
                break;
            }
        }
    }
</script>

<svelte:window on:keypress={handleKeyPress} />
<div
    class="flex flex-col w-full h-16 bg-green-800 text-center text-xl font-bold italic"
>
    <button on:click={()=>increaseTurnNumber()}>{turnString()}</button>
    <div class="flex flex-row gap-6 justify-center">
        {#if turn !== "PAUSE"}
            <button
                on:click={() => {
                    nextTurn();
                }}>Next turn</button
            >
        {/if}
        <button
            on:click={() => {
                togglePause();
            }}>{turn === "PAUSE" ? "Resume" : "Pause"}</button
        >
    </div>
</div>
<div class="w-full h-full flex flex-row">
    <PlayerContainer
        active={turn === "A"}
        playerName={playerA}
        hours={playerAHours}
        minutes={playerAMinutes}
        seconds={playerASeconds}
    />
    <PlayerContainer
        active={turn === "B"}
        playerName={playerB}
        hours={playerBHours}
        minutes={playerBMinutes}
        seconds={playerBSeconds}
    />
</div>
