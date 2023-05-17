module.exports = function(n, k) {
    function findNumbers(n, k, num = 0, nextDigit = 1, result = []) {
        if (n === 0 && k === 0) {
            result.push(num);
        } else if (n > 0 && k > 0) { 
            for (let digit = nextDigit; digit <= 9; digit++) {
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

        let min = arr[0].toString();
        let max = arr[0].toString();

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].toString() < min) {
                min = arr[i].toString();
            }

            if (arr[i].toString() > max) {
                max = arr[i].toString();
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
