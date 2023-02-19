<script lang="ts">
    import aquila from "$lib/assets/aquila.png";
    import PlayerContainer from "$lib/components/PlayerContainer.svelte";
    import type { Turn } from "$lib/types";
    import { match } from "ts-pattern";

    export let data;

    let { playerA, playerB, gameTime, startingPlayer } = data;
    gameTime = parseFloat(gameTime);

    let turnNumber = 1;
    let turnHalf = 1;

    let turn: Turn = startingPlayer;
    let previousTurn: Turn = "B";

    let playerAGameTimer = gameTime;
    let playerBGameTimer = gameTime;

    $: turnString = () => {
        if (turnNumber < 6) {
            return `${turnNumber} - ${turnHalf}`;
        }
        turn = "END";
        return "THE END";
    };
    const ticker = setInterval(() => {
        match(turn)
            .with("A", () => (playerAGameTimer = Math.max(0,playerAGameTimer - 1)))
            .with("B", () => (playerBGameTimer = Math.max(0,playerBGameTimer - 1)))
            .with("PAUSE", () => {})
            .with("END", () => {clearInterval(ticker)})
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
        turnHalf = (turnHalf % 2) + 1;
        if (turnHalf === 1) {
            turnNumber = turnNumber + 1;
        }
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.repeat) return;

        console.log(event.code);
        match(event.code)
        .with("Space", ()=> {event.preventDefault(); nextTurn()})
        .with("Enter", ()=> {event.preventDefault(); togglePause()})
        .with("KeyT", ()=> {event.preventDefault(); increaseTurnNumber()})
        .otherwise(()=>{})
    }
</script>

<svelte:window on:keypress={handleKeyPress} />
<div class="w-full h-screen flex flex-col">
    <div
        class="flex flex-col h-16 bg-green-800 text-center text-xl font-bold italic"
    >
    {#if turn!=="END"}
        <button on:click={() => increaseTurnNumber()}>{turnString()}</button>
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
        {:else}
        <span class="text-xl font-bold">THE END</span>
        {/if}
    </div>
    <div class="h-full flex flex-row">
        <PlayerContainer
            active={turn === "A"}
            playerName={playerA}
            bind:durationLeft={playerAGameTimer}
        />
        <PlayerContainer
            active={turn === "B"}
            playerName={playerB}
            bind:durationLeft={playerBGameTimer}
        />
    </div>
</div>
