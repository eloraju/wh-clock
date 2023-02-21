import type { Actions, RequestEvent } from "./$types";
import { redirect, type LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    console.log("EVENT:", JSON.stringify(event, null, 2));

    const playerA = event.url.searchParams.get("pa");
    const playerB = event.url.searchParams.get("pb");
    const gameTime = event.url.searchParams.get("dur");
    const startingPlayer = event.url.searchParams.get("start");

    console.log(
        "DATA:",
        JSON.stringify({ playerA, playerB, gameTime, startingPlayer }, null, 2)
    );

    return { playerA, playerB, gameTime, startingPlayer };
}

export const actions: Actions = {
    new: async ({ request }: RequestEvent) => {
        const fmdata = await request.formData();
        const { playerA, playerB, startingPlayer, duration } =
            Object.fromEntries(fmdata.entries());
        throw redirect(
            303,
            `/game?pa=${playerA}&pb=${playerB}&dur=${duration}&start=${startingPlayer}`
        );

    },
    resume: async (event: RequestEvent) => {
        throw redirect(303, "/");
    },
};
