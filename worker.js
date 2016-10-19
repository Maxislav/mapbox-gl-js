/**
 * Created by maxislav on 18.10.16.
 */
onmessage = function(event)
{
    var n = event.data.from;
    while (n < event.data.to) {
        n += 1;
        if(isPrime(n)){
            // found a prime!
            postMessage(n);
        }
    }
};

function isPrime(number){
    for (var i = 2; i <= Math.sqrt(number); i += 1){
        if (number % i == 0){
            return false;
        }
    }
    return true;
}