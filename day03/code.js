function findMostCommon(list) {
    const sum = list.reduce((a, b) => a + parseInt(b, 2), 0);

    return sum >= list.length / 2 ? '1' : '0';
}

function extractAtIndex(inputList, curr) {
    return inputList.map((input) => input.charAt(curr));
}

function computeGamma(inputList) {
    return [...Array(inputList[0].length).keys()].reduce(
        (prev, curr) => prev + findMostCommon(extractAtIndex(inputList, curr))
        , ''
    );
}

function not(input) {
    return input.split('').map(x => x === '1' ? '0' : '1').join('')
}

export function partOne(testInput) {
    const gamma = computeGamma(testInput);
    const epsilon = not(gamma);

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function findOxygenRating(inputList, index = 0) {
    if (inputList.length === 1) {
        return inputList[0];
    }
    const mostCommon = findMostCommon(extractAtIndex(inputList, index));
    return findOxygenRating(inputList.filter(input => input.charAt(index) === mostCommon), index + 1);
}

export function findCO2Rating(inputList, index = 0) {
    if (inputList.length === 1) {
        return inputList[0];
    }
    const leastCommon = not(findMostCommon(extractAtIndex(inputList, index)));
    return findCO2Rating(inputList.filter(input => input.charAt(index) === leastCommon), index + 1);
}

export function partTwo(testInput) {
    return parseInt(findOxygenRating(testInput), 2) * parseInt(findCO2Rating(testInput), 2)
}
