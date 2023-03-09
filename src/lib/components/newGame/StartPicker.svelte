<script lang="ts">
    export let players: string[];
    export let disabled = true;
    export let startingPlayer: "A" | "B" | undefined;
</script>

{#if !disabled}
Select starting player
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
