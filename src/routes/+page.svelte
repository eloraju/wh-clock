<script lang="ts">
    import TextInput from "$lib/components/TextInput.svelte";
    import StartPicker from "$lib/components/StartPicker.svelte";
    import DurationPicker from "$lib/components/DurationPicker.svelte";

    let playerAName: string;
    let playerBName: string;
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
                />
                <TextInput
                    label="Player B name"
                    name="playerB"
                    bind:value={playerBName}
                />
            </div>
            <div class="flex flex-row gap-5">
                <TextInput
                        label="Player A name"
                        name="playerA"
                        bind:value={playerAName}
                />
                <TextInput
                        label="Player B name"
                        name="playerB"
                        bind:value={playerBName}
                />
            </div>
            <div class="flex flex-row gap-5">
                <DurationPicker />
            </div>
            <div class="flex flex-row gap-5">
                <StartPicker disabled={startDisabled} {players} />
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
