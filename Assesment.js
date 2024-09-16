const math = require('mathjs');


function decodeValue(encodedValue, base) {
    return parseInt(encodedValue, base);
}


function createVandermondeMatrix(xValues) {
    const n = xValues.length;
    const matrix = Array.from({ length: n }, (_, i) => 
        Array.from({ length: n }, (_, j) => Math.pow(xValues[i], j))
    );
    return matrix;
}


function findConstantTerm(roots) {
    const xValues = roots.map(root => root[0]);
    const yValues = roots.map(root => root[1]);
    
    
    const A = createVandermondeMatrix(xValues);
    
    
    const b = yValues.map(value => [value]);

    
    const coefficients = math.lusolve(A, b).map(row => row[0]);
    
   
    return coefficients[0];
}


function main(inputJson) {
    const data = JSON.parse(inputJson);
    const k = data.keys.k;
    
    const roots = [];

    for (const key in data) {
        if (key !== 'keys') {
            const base = parseInt(data[key].base, 10);
            const encodedValue = data[key].value;
            const decodedValue = decodeValue(encodedValue, base);
            const x = parseInt(key, 10);
            const y = decodedValue;
            roots.push([x, y]);
        }
    }
    
    
    if (roots.length < k) {
        throw new Error("Not enough roots to determine the polynomial.");
    }

    const constantTerm = findConstantTerm(roots);
    return constantTerm;
}

console.log(main(jsonInput));