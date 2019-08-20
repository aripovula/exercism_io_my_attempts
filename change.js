export class Change {

    // this is version 1 - with this a couple tests fail
    // please see version 2 - with version 2 all tests pass
    calculate(coins, change) {
        let result = [];

        if (change < 0) throw new NegativeTotalsNotAllowed("Negative totals are not allowed.");
        if (change == 0) return result;

        let possibleSets = this.getAllPossibleCombinations(coins);
        possibleSets.map(coinsSet => {
            coinsSet.sort((a, b) => b - a);    // sorting in desc. order
            const aSet = this.getPossibleSet(coinsSet, change);
            let resultTotal = aSet.length > 0 ? aSet.reduce(this.getTotal) : 0;
            if (resultTotal == change) {
                if (result.length > 0) {
                    result = result.length > aSet.length ? aSet : result;
                } else result = aSet;
            }
        });
        if (result.length == 0 || result == []) 
            throw new CannotBeRepresentedWithGivenCoins(`The total ${change} cannot be represented in the given currency.`);
        
        return result;
    }

    getPossibleSet(coins, change) {
        let resultSet = [];
        let total = 0, remainder = change;
        
        for (let coin of coins) {       // for loop is used to be able to break to improve speed
            const check = remainder / coin;
            if (check >= 1) {
                let wholeOnly = Math.round(check) < check 
                    ? Math.round(check) : (Math.round(check) == check ? check : Math.round(check) - 1);
                for (let i = 0; i < wholeOnly; i++) {
                    resultSet.unshift(coin);
                    total += coin;
                    remainder -= coin;
                }
                if (total == change) break;
            }
        }
        return resultSet;
    }

    getTotal(total, num) { return total + num; }

    // source of function defined below - https://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/
    // Generates all possible combinations for a given array.
    // It was changed a little by me to return array of arrays instead of array of strings.
    getAllPossibleCombinations(arr) {
        let i, j, temp;
        let result = [];
        let arrLen = arr.length;
        let power = Math.pow;
        let combinations = power(2, arrLen);
        for (i = 0; i < combinations;  i++) {
            temp = [];
            for (j = 0; j < arrLen; j++) {
                if ((i & power(2, j))) {
                    temp.push(arr[j]);
                }
            }
            if (temp.length > 0) result.push(temp);
        }
        return result;
    }
}

class NegativeTotalsNotAllowed extends Error {}
class CannotBeRepresentedWithGivenCoins extends Error {}