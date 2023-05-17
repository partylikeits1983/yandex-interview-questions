module.exports = function(n, k) {
    // Convert n and k to BigInt
    n = BigInt(n);
    k = BigInt(k);

    // Edge case handling
    if (typeof n !== 'bigint' || typeof k !== 'bigint') {
        throw new Error('Both n and k should be BigInt');
    }
    
    if (n < 0) {
        throw new Error('n should be a non-negative BigInt');
    }
    
    if (k < 3n || k > 20n) {
        throw new Error('k should be a BigInt between 3 and 20 inclusive');
    }
    
    function findNumbers(n, k, num = 0n, nextDigit = 1n, result = []) {
        if (n === 0n && k === 0n) {
            result.push(num);
        } else if (n > 0n && k > 0n) { 
            for (let digit = nextDigit; digit <= 9n; digit++) {
                if (n >= digit) {
                    findNumbers(n - digit, k - 1n, num * 10n + digit, digit, result);
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

        return [arr.length, min.toString(), max.toString()];
    }

    const numbers = findNumbers(n, k);

    if (numbers.length != 0) {
        return analyzeArray(numbers)
    } else {
        return [0]
    }
};
