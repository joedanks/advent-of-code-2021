export function partOne(testInput) {
    const reduced = testInput.reduce((prev, curr) => {
        const next = Object.keys(curr)
            .map(key => ({
                    [key]: curr[key] + prev[key]
                })
            )
            .reduce((a, b) => ({
                ...a,
                ...b
            }), {});

        return {
            ...prev,
            ...next
        }
    }, {
        "forward": 0,
        "up": 0,
        "down": 0
    })

    const horizontal = reduced.forward;
    const depth = reduced.down - reduced.up;

    return horizontal * depth;
}

export function partTwo(testInput) {
    const reduced = testInput.reduce((prev, curr) => {
        if (curr.forward) {
            return {
                ...prev,
                horizontal: prev.horizontal + curr.forward,
                depth: prev.depth + (prev.aim * curr.forward)
            }
        }
        if (curr.down) {
            return {
                ...prev,
                aim: prev.aim + curr.down
            }
        }
        if (curr.up) {
            return {
                ...prev,
                aim: prev.aim - curr.up
            }
        }
        return prev;
    }, {
        horizontal: 0,
        aim: 0,
        depth: 0
    });

    return reduced.horizontal * reduced.depth;
}
