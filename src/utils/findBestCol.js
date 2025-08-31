export function findBestCol(num) {
    let smallestDiff = Infinity;
    let choosenPair;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            const a = i;
            const b = num / i;
            const diff = Math.abs(a - b)

            if (diff < smallestDiff) {
                smallestDiff = diff
                choosenPair = [a, b]
            }
        }
    }

    return choosenPair ? Math.max(...choosenPair) : null;
}