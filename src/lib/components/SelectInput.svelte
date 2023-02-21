<script lang="ts">
    export let label: string;
    export let values: string[];
    export let name: string;
    export let required = false
    export let value: string;
</script>

<div class="flex- flex-row gap-2">
    <label for="army_selector" class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <select id="army_selector" name={name} {required} bind:value={value} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {#each values as value}
            <option value={value}>{value}</option>
        {/each}
    </select>
</div>
