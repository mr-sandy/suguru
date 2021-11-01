import { solve } from "../solver";

describe("when solving the game", () => {
    it("should set the candidate values for each cell", () => {

        const cells = [
            [
                { value: null, bounds: ["left", "top", "bottom", "right"] },
                { value: null, bounds: ["top"] },
                { value: null, bounds: ["top", "right"] },
            ],
            [
                { value: null, bounds: ["left"] },
                { value: null, bounds: [] },
                { value: null, bounds: ["right"] },
            ],
            [
                { value: null, bounds: ["bottom", "left"] },
                { value: null, bounds: ["bottom"] },
                { value: null, bounds: ["bottom", "right"] },
            ]
        ];

        const expected = [];

        const result = solve(cells);

        expect(result).toEqual(expected);
    });
});