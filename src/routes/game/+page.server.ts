import type { Actions, RequestEvent } from "./$types";
import { redirect, type LoadEvent } from "@sveltejs/kit";
import type { State } from "$lib/types";

export function load(event: LoadEvent) {
    const playerA = event.url.searchParams.get("pa") as string;
    const playerB = event.url.searchParams.get("pb") as string;
    const armyA = event.url.searchParams.get("aa") as string;
    const armyB = event.url.searchParams.get("ab") as string;
    const gameTime =parseInt(event.url.searchParams.get("dur") as string);
    const startingPlayer = event.url.searchParams.get("start") as State;

    return { playerA, playerB, gameTime, startingPlayer, armyA, armyB };
}

export const actions: Actions = {
    new: async ({ request }: RequestEvent) => {
        const fmdata = await request.formData();
        const { playerA, playerB, startingPlayer, duration, armyA, armyB } =
            Object.fromEntries(fmdata.entries());
        throw redirect(
            302,
            `/game?pa=${playerA}&pb=${playerB}&aa=${armyA}&ab=${armyB}&dur=${duration}&start=${startingPlayer}`
        );

    },
    resume: async (event: RequestEvent) => {
        throw redirect(303, "/");
    },
};
