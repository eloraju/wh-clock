import type { Actions, RequestEvent } from "./$types";
import { redirect, type LoadEvent } from "@sveltejs/kit";

export function load(event: LoadEvent) {
    const playerA = event.url.searchParams.get("pa");
    const playerB = event.url.searchParams.get("pb");
    const armyA = event.url.searchParams.get("aa");
    const armyB = event.url.searchParams.get("ab");
    const gameTime = event.url.searchParams.get("dur");
    const startingPlayer = event.url.searchParams.get("start");

    console.log(
        "DATA:",
        JSON.stringify({ playerA, playerB, gameTime, startingPlayer, armyA, armyB }, null, 2)
    );

    return { playerA, playerB, gameTime, startingPlayer, armyA, armyB };
}

export const actions: Actions = {
    new: async ({ request }: RequestEvent) => {
        const fmdata = await request.formData();
        const { playerA, playerB, startingPlayer, duration, armyA, armyB } =
            Object.fromEntries(fmdata.entries());
        throw redirect(
            303,
            `/game?pa=${playerA}&pb=${playerB}&aa=${armyA}&ab=${armyB}&dur=${duration}&start=${startingPlayer}`
        );

    },
    resume: async (event: RequestEvent) => {
        throw redirect(303, "/");
    },
};
