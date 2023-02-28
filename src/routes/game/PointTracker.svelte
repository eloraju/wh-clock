<script lang="ts">
    export let secondaries: string[];
    let primary = Array(5).fill(0);
    let tertiary = Array(5).fill(0);
    let secondary1 = Array(5).fill(0);
    let secondary2 = Array(5).fill(0);
    let secondary3 = Array(5).fill(0);

    $: objectives = ["Primary", "Secondary", ...secondaries];
    $: primaryPoints = primary.reduce((sum, cur,index) => sum += Math.min(15, cur + tertiary[index]))
    $: secondary1Points = secondary1.reduce((sum, cur) => sum+=cur)
    $: secondary2Points = secondary1.reduce((sum, cur) => sum+=cur)
    $: secondary3Points = secondary1.reduce((sum, cur) => sum+=cur)
</script>

<div class="grid points-area gap-y-3 gap-x-2 bg-slate-500 rounded-md shadow-md w-full p-5 text-sm text-center">
    <!--Headers-->
    <div class="turn-col" />
    <div class="header-row">Primary</div>
    <div class="header-row">Tertiary</div>
    <div class="header-row">{secondaries[0]}</div>
    <div class="header-row">{secondaries[1]}</div>
    <div class="header-row">{secondaries[2]}</div>
    <!--Points-->
    {#each objectives as objective, index (objective + index)}
        <div class="turn-col">{index + 1}</div>
        <div class="point-row">
            <input type="number" bind:value={primary[index]} class="point-input"/>
        </div>
        <div class="point-row">
            <input type="number" bind:value={tertiary[index]} class="point-input"/>
        </div>
        <div class="point-row">
            <input type="number" bind:value={secondary1[index]} class="point-input"/>
        </div>
        <div class="point-row">
            <input type="number" bind:value={secondary2[index]} class="point-input"/>
        </div>
        <div class="point-row">
            <input type="number" bind:value={secondary3[index]} class="point-input"/>
        </div>
    {/each}
    <!--Summary row-->
    <div class="turn-col" />
    <div class="footer-row primary-score">{primaryPoints} / 45</div>
    <div class="footer-row">{secondary1Points} / 15</div>
    <div class="footer-row">{secondary2Points} / 15</div>
    <div class="footer-row">{secondary3Points} / 15</div>
</div>

<style lang="postcss">
    .points-area {
        grid-template-columns: 2rem repeat(5, 1fr);
        grid-template-rows: 2rem repeat(6, 1fr);
    }

    .turn-col {
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .header-row {
        display: flex;
        align-items: end;
        justify-content: center;
    }

    .footer-row {
        border-top: solid 2px black;
        padding-top: 0.5rem;
    }

    .point-row {
        background-color: rgb(5, 95, 95);
        text-align: center;
        border-radius: 0.25rem;
        padding: 0.25rem;
        font-weight: bold;
    }

    .point-input {
        background-color: rgb(5, 95, 95);
        width: 100%;
        height: 100%;
        text-align: center;
        font-weight: bold;
    }

    .primary-score {
        grid-column-start: 2;
        grid-column-end: 4;
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button,
    input[type='number'] {
        -webkit-appearance: none;
        margin: 0;
        -moz-appearance: textfield !important;
    }

    input[type='number']:focus-visible {
        outline: none;
    }

</style>
