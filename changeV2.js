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
            iterateAtMost[i] = change / coins[i];
        }
        // console.log('iterateAtMost b4 optimize', iterateAtMost);
        
        for (let i = iterateAtMost.length - 1; i > -1; i--) {  
            for (let j = i - 1; j > -1; j--) {
                let temp = coins[j] / coins[i];
                if (temp == Math.round(temp)) {
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
            // console.log('totalBeforeLastCoin-', totalBeforeLastCoin);
            currentSet[lastIndex] = Math.round( (change - totalBeforeLastCoin) / coins[lastIndex] ); // NOTE 1
            const totalForCurrentSet = totalBeforeLastCoin + ( currentSet[lastIndex] * coins[lastIndex] );
            // // console.log('totalForCurrentSet-', totalForCurrentSet);
            // console.log('totalForCurrentSet, change, result, currentSet - ', totalForCurrentSet, change, result, currentSet);
            if ( totalForCurrentSet == change && currentSet[lastIndex] >=0 ) {
                result = this.updateResult(this.deepCopy(result), this.deepCopy(currentSet) );
            }

            currentSet[lastIndex - 1] = currentSet[lastIndex - 1] + 1;
            // console.log('currentSet after +1 - ', currentSet);
            
            for (let i = iterateAtMost.length - 1; i > -1; i--) {  // NOTE 2
                // console.log('condition - ', currentSet[i], iterateAtMost[i], currentSet[i] > iterateAtMost[i]);
                
                if (currentSet[i] > iterateAtMost[i]) {
                    if (i == 0) isDone = true;
                    else { currentSet[i] = 0; currentSet[i - 1] = currentSet[i - 1] + 1; }  // NOTE N
                    // console.log('i, currentSet - ', i, currentSet);
                } else {
                    // console.log('in break');
                    break;
                }
            }

        }
        // console.log(result);
        
        if (result.length == 0 ) {
            const msg = `The total ${change} cannot be represented in the given currency.`;
            // console.log(msg);
            throw new CannotBeRepresentedWithGivenCoins(msg);
        }
    
        return this.convertQuantitiesToCoinsStream(coins, result);
    }

    convertQuantitiesToCoinsStream(coins, result) {
        const resultToCoinsArray = [];
        for (let i = 0; i < coins.length; i++) {
            for (let j = 0; j < result[i]; j++) {
                resultToCoinsArray.unshift(coins[i]);
            }
        }
        console.log('new2-', result);
        console.log('new2-', resultToCoinsArray);
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
