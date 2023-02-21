<script lang="ts">
    import TextInput from "$lib/components/TextInput.svelte";
    import StartPicker from "$lib/components/StartPicker.svelte";
    import DurationPicker from "$lib/components/DurationPicker.svelte";
    import SelectInput from "../lib/components/SelectInput.svelte";
    import {armies} from '$lib/assets/icons/armies.ts'

    const armyNames = armies.map(a => a.name).sort();

    let playerAName: string;
    let playerBName: string;
    // These are not actually used and can be deleted at some point :)
    let playerAArmy: string;
    let playerBArmy: string;
    let duration: string;
    let startingPlayer: string;
    let oldGameID: string;

    $: players = [playerAName, playerBName];
    $: startDisabled = playerAName === undefined || playerBName === undefined;
</script>

<div
    class="container m-auto p-5 flex flex-col gap-5 bg-slate-500 rounded-md items-center"
>
    <form method="POST" action="/game?/new">
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-5">
                <TextInput
                    label="Player A name"
                    name="playerA"
                    bind:value={playerAName}
                    required={true}
                />
                <TextInput
                    label="Player B name"
                    name="playerB"
                    bind:value={playerBName}
                    required={true}
                />
            </div>
            <div class="flex flex-row gap-5">
                <SelectInput
                        label="Player A army"
                        name="armyA"
                        values={armyNames}
                        bind:value={playerAArmy}
                        required={true}
                />
                <SelectInput
                        label="Player B army"
                        name="armyB"
                        values={armyNames}
                        bind:value={playerBArmy}
                        required={true}
                />
            </div>
            <div class="flex flex-row gap-5">
                <DurationPicker bind:duration={duration}/>
            </div>
            <div class="flex flex-row gap-5">
                <StartPicker disabled={startDisabled} {players} bind:startingPlayer={startingPlayer}/>
            </div>
            <button type="submit" class="bg-green-800 p-3 rounded-xl">Start a new game</button>
        </div>
    </form>
    <!--
    <div class="text-5xl font-bold">OR</div>

    <form method="POST" action="/game?/resume">
        <TextInput label="Game id" bind:value={oldGameID} name="oldGameId" />
        <button type="submit">Resume old game</button>
    </form>
    -->
</div>
