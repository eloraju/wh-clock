<script lang="ts">
    import { match } from "ts-pattern";

    let cellStyles = "border border-slate-800";
    let secondaries = ["Raise the banners", "Behind enemy lines", "Faction 2"];
    let primaryPoints = Array(5).fill(0);
    let tertPoints = Array(5).fill(0);
    let secondary1 = Array(5).fill(0);
    let secondary2 = Array(5).fill(0);
    let secondary3 = Array(5).fill(0);

    type Objective = "pri" | "tert" | "s1" | "s2" | "s3";

    function addPoint(obj: Objective, turn: number, points: number) {
        match(obj)
            .with("pri", () => {
                primaryPoints[turn] = points;
            })
            .with("tert", () => {
                tertPoints[turn] = points;
            })
            .with("s1", () => {
                secondary1[turn] = points;
            })
            .with("s2", () => {
                secondary2[turn] = points;
            })
            .with("s3", () => {
                secondary3[turn] = points;
            }).
            exhaustive();
            console.log("should have changed")
    }
</script>

<table
    class="table-fixed text-center text-sm border-collapse border-red-600 w-full"
>
    <thead>
        <tr>
            <th class="w-5 bg-opacity-0" />
            <th class="bg-slate-800 rounded-tl-xl">Primary</th>
            <th class="bg-slate-800">Tert</th>
            {#each secondaries as secondary}
                <th class="bg-slate-800 last:rounded-tr-xl">{secondary}</th>
            {/each}
        </tr>
    </thead>
    <tbody class="font-bold text-xl">
        {#each Array(5) as _, index (index)}
            <tr>
                <td>{index + 1}</td>
                <td on:click={()=>addPoint("pri", index, 4)} class={cellStyles}>{primaryPoints[index]}</td>
                <td on:click={()=>addPoint("tert", index, 4)} class={cellStyles}>{tertPoints[index]}</td>
                <td on:click={()=>addPoint("s1", index, 4)} class={cellStyles}>{secondary1[index]}</td>
                <td on:click={()=>addPoint("s2", index, 4)} class={cellStyles}>{secondary2[index]}</td>
                <td on:click={()=>addPoint("s3", index, 4)} class={cellStyles}>{secondary3[index]}</td>
            </tr>
        {/each}
        <tr>
            <td />
            <td>{primaryPoints.reduce((acc,cur) => acc+cur, 0)}</td>
            <td>{tertPoints.reduce((acc,cur) => acc+cur, 0)}</td>
            <td>{secondary1.reduce((acc,cur) => acc+cur, 0)}</td>
            <td>{secondary2.reduce((acc,cur) => acc+cur, 0)}</td>
            <td>{secondary3.reduce((acc,cur) => acc+cur, 0)}</td>
        </tr>
    </tbody>
</table>
