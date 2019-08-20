export class Change {
    calculate(coins, change) {
        let result = [];
        if (change < 0) throw new NegativeTotalsNotAllowed("Negative totals are not allowed.");
        if (change == 0) return result;
        if (coins.length == 1 && ( change/coins[0] == Math.round(change/coins[0])) ) return Array(change/coins[0]).fill(coins[0]);

        let lastIndex = coins.length - 1;
        coins.sort((a, b) => b - a);    // sorting in desc. order

        const iterateAtMost = Array(coins.length - 1);
        for (let i = 0; i < coins.length - 1; i++) { 
            iterateAtMost[i] = change / coins[i];   // try each coin this number of times at max
        }
        // console.log('iterateAtMost b4 optimize', iterateAtMost);
        
        // This loop significantly optimizes possible combinations. It is based on notion that if we have a number
        // divisible by another number we do not need that number more than division result. E.g. if we have 
        // 2 and 20 cent coins we do not need more than ten 2 cent coins. For 'calculate([1, 2, 5, 10, 20, 50, 100], 999);'
        // test (before this loop) there are 200 BILLION combinations, after this loop - only 2000 !
        for (let i = iterateAtMost.length - 1; i > -1; i--) {  
            for (let j = i - 1; j > -1; j--) {
                let temp = coins[j] / coins[i];
                if (temp == Math.round(temp)) {   // if smaller # is divisible by larger # decrease iterateAtMost #
                    iterateAtMost[i] = temp;
                    break;
                }
            }
        }
        // console.log('iterateAtMost after optimize', iterateAtMost);
        let currentSet = Array(coins.length).fill(0);
        let isDone = coins.length > 1 ? false : true;
        while (!isDone) {
            let totalBeforeLastCoin = 0;
            for (let i = 0; i < coins.length - 1; i++) {
                totalBeforeLastCoin = totalBeforeLastCoin + currentSet[i] * coins[i];
            }
            currentSet[lastIndex] = Math.round( (change - totalBeforeLastCoin) / coins[lastIndex] ); // balancing quantity for smallest coin
            const totalForCurrentSet = totalBeforeLastCoin + ( currentSet[lastIndex] * coins[lastIndex] );
            if ( totalForCurrentSet == change && currentSet[lastIndex] >=0 ) { // if balancing quantity for smallest coin is not negative
                result = this.updateResult(this.deepCopy(result), this.deepCopy(currentSet) );
            }

            currentSet[lastIndex - 1] = currentSet[lastIndex - 1] + 1;  // increase quantity (qnty) of second smallest coin
            
            for (let i = iterateAtMost.length - 1; i > -1; i--) { 
                if (currentSet[i] > iterateAtMost[i]) {   // if any coin qnty > iterateAtMost qnty increase next greater coin qnty
                    if (i == 0) isDone = true;      // if i reaches 0 largest coin > iterateAtMost qnty. Should stop here.
                    else { currentSet[i] = 0; currentSet[i - 1] = currentSet[i - 1] + 1; }
                } else {
                    break;
                }
            }
        }
        
        if (result.length == 0 ) throw new CannotBeRepresentedWithGivenCoins(`The total ${change} cannot be represented in the given currency.`);
    
        const resultToCoinsArray = [];  // 'result' is coins quantity array. Test expects array as coins stream
        for (let i = 0; i < coins.length; i++) {
            for (let j = 0; j < result[i]; j++) {
                resultToCoinsArray.unshift(coins[i]);
            }
        }
        console.log('result quantities-', result);
        console.log('result converted -', resultToCoinsArray);
        return resultToCoinsArray;
    }

    updateResult(result, currentSet) {
        if (result.length > 0) {            
            result = result.reduce(this.reducer) > currentSet.reduce(this.reducer) ? currentSet : result;
        } else result = currentSet;
        return this.deepCopy(result);
    }

    reducer(accumulator, currentValue) {return accumulator + currentValue; }

    deepCopy(arr) {return JSON.parse(JSON.stringify(arr));}
}

class NegativeTotalsNotAllowed extends Error {}
class CannotBeRepresentedWithGivenCoins extends Error {}
