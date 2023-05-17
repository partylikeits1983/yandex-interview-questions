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

console.log(findNumbers(10, 3));
