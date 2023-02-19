<script lang="ts">
    export let label: string;
    export let value: string;
    export let name: string;
</script>

<div class="flex- flex-row gap-2">
    <label for="name_input" class="block mb-2 text-sm font-medium text-gray-800"
        >{label}</label
    >
    <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        required
        bind:value
        type="text"
        {name}
        id="name_input"
    />
</div>
