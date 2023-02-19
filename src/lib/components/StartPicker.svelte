<script lang="ts">
    export let players: string[];
    export let disabled: boolean = true;
    export let startingPlayer: "A" | "B" | "" = "";
</script>

{#if !disabled}
    <label>
        <input
            type="radio"
            bind:group={startingPlayer}
            name="startingPlayer"
            value={"A"}
            required
        />
        {players[0]}
    </label>
    <label>
        <input
            type="radio"
            bind:group={startingPlayer}
            name="startingPlayer"
            value={"B"}
            required
        />
        {players[1]}
    </label>
{:else}
    Give player names to select starting player
{/if}
