module.exports = function(n, k) {
    function findNumbers(n, k, num = 0, nextDigit = 1, result = []) {
        // Base Case: If n = 0 and k = 0, then number is found
        if (n === 0 && k === 0) {
            result.push(num);
        } else if (n > 0 && k > 0) { // If n and k are both greater than 0
            // Try all possible digits from nextDigit to 9
            for (let digit = nextDigit; digit <= 9; digit++) {
                // Check if a number can be formed by including this digit
                if (n >= digit) {
                    findNumbers(n - digit, k - 1, num * 10 + digit, digit, result);
                }
            }
        }
        return result;
    }

    function analyzeArray(arr) {
        if (arr.length === 0) {
            return { count: 0, min: undefined, max: undefined };
        }

        let min = arr[0];
        let max = arr[0];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
            min = arr[i];
            }

            if (arr[i] > max) {
            max = arr[i];
            }
        }

        return [arr.length, min, max];
    }

    const numbers = findNumbers(n, k);

    if (numbers.length != 0) {
        return analyzeArray(numbers)
    } else {
        return [0]
    }

};
