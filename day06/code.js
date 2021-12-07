const baseFish = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
}

function iterateDay(fish) {
    return Object.entries(fish)
        .map(([k, v]) => {
            const key = parseInt(k, 10)
            if (key === 0) {
                return {
                    ...baseFish,
                    6: v,
                    8: v
                }
            }
            return {
                ...baseFish,
                [k - 1]: v
            }
        }).reduce((prev, curr) => {
            return {
                0: prev[0] + curr[0],
                1: prev[1] + curr[1],
                2: prev[2] + curr[2],
                3: prev[3] + curr[3],
                4: prev[4] + curr[4],
                5: prev[5] + curr[5],
                6: prev[6] + curr[6],
                7: prev[7] + curr[7],
                8: prev[8] + curr[8],
            }
        }, {...baseFish})
}

function reduceFish(rawInput) {
    return rawInput.reduce((prev, curr) => {
        const clean = {
            ...prev
        }
        if (prev[curr]) {
            clean[curr] += 1
        } else {
            clean[curr] = 1
        }
        return clean
    }, {})
}

function sumFish(fish) {
    return Object.values(fish)
        .reduce((a, b) => a + b, 0)
}

export function partOne(testInput, days) {
    let fish = reduceFish(testInput)

    for(let i = 0; i < days; i++) {
        fish = iterateDay(fish)
    }

    return sumFish(fish)
}

export function partTwo(testInput) {
}
