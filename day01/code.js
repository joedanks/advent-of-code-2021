export function partOne(inputList) {
    let countIncrease = 0;

    for (let i = 0; i < inputList.length - 1; i++) {
        const first = inputList[i];
        const second = inputList[i+1];

        if (second > first) {
            countIncrease++;
        }
    }

    return countIncrease;
}

export function partTwo(inputList) {
    let countIncrease = 0;

    for (let i = 0; i < inputList.length - 3; i++) {
        const first = inputList[i];
        const second = inputList[i+1];
        const third = inputList[i+2];
        const fourth = inputList[i+3];

        const windowOne = first + second + third;
        const windowTwo = second + third + fourth;

        if (windowOne < windowTwo) {
            countIncrease++;
        }
    }

    return countIncrease;
}
