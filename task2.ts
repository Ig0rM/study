let matrix = [
    [
        [{value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'b', isFind: true}], 
        {value: 'a', isFind: false},
        {value: 'a', isFind: false},
        {value: 'a', isFind: false},
        {value: 'a', isFind: false},
        {value: 'a', isFind: false}
    ],
    [{value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'c', isFind: true}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'b', isFind: true}], 
    [{value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'b', isFind: true}], 
    [{value: 'a', isFind: true}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'a', isFind: false}, {value: 'b', isFind: true}], 
];
let results = [];
let functionQueue = [];
let timeToResolve = 0;
//using async
let elemSearcher = function(currentEl) {
    return new Promise((resolve, reject) => {
     if (Array.isArray(currentEl)) {
       for (let elem of currentEl) {
         functionQueue.push(elemSearcher.bind(this, elem));
       }

     } else if (currentEl.isFind){
        console.log(currentEl);
        results.push(currentEl);
        timeToResolve += 500; //just to emulate delay
     }
        
      setTimeout(() => {
        resolve('resolved');
      }, timeToResolve);
    });
};
async function searcher(matrix) {
    functionQueue.push(elemSearcher.bind(this, matrix));
    while (functionQueue.length) {
            console.log(functionQueue);
        await functionQueue.shift()();
    }
}

searcher(matrix);

//using timeout
let matrixSearcher = function(currentEl) {
    if (Array.isArray(currentEl)) {
        for (let elem of currentEl) {
            setTimeout(() => matrixSearcher(elem));
        }
        
    } else if (currentEl.isFind){
    	console.log(currentEl);
        results.push(currentEl);
    }
};
matrixSearcher(matrix);
