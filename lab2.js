// Фнукция валидации блока size n пакетов.
function isValid(n) {
    return n > 0 && n % 1 === 0;
}

// Функция сравнения двух массивов по size arrive и отсева непоточных элементов массивов.
function compareBuffer(arrayOfArrival, arrayOfDuration) {
    let newArrayOfArrival = [];
    let newArrayOfDuration = [];
    let setRepeated = new Set([]);
    let arrayRepeated = Array.from(setRepeated);
    for (let j = 0; j < n; j++){
        if ((arrayOfArrival[j] <= size)) {
            if (!(arrayRepeated.includes(arrayOfArrival[j]))) {
                newArrayOfArrival.push(arrayOfArrival[j]);
                newArrayOfDuration.push(arrayOfDuration[j]);
                arrayRepeated.push(arrayOfArrival[j]);
        } else {
            newArrayOfArrival.push(arrayOfArrival[j]);
            newArrayOfDuration.push(-1);
        }
        }
    }
    return [newArrayOfArrival, newArrayOfDuration];
}

// Функция ввода данных из консоли.
function getInputData() {
    const readline = require('readline-sync');
    let size = Number(readline.question("Введите размер буфера: "));
    let n = Number(readline.question("Введите число пакетов в буфере: "));
    if (!isValid(size) || !isValid(n)) {
        console.log("Размер введеного пакета или буфера слишком мал");
        process.exit();
    } else {
        let arrayOfArrival = [];
        let arrayOfDuration = [];
        for (let i = 0; i < n; i++) {
            let arrival = Number(readline.question("Введите время поступления пакета: "));
            let duration = Number(readline.question("Введите время обработки пакета: "));
            arrayOfArrival.push(arrival);
            arrayOfDuration.push(duration); 
        }
        return [n, size, arrayOfArrival, arrayOfDuration];
    }
};

// Функция вывода результата.
function resultHandler(newArrayOfArrival, newArrayOfDuration) {
    let time = -1;
    for (let i = 0; i < newArrayOfArrival.length; i++) {
        if (time <= newArrayOfArrival[i] ) {
            if (!(newArrayOfDuration[i] === -1)) {
                time = newArrayOfArrival[i] + newArrayOfDuration[i];
                console.log("[" + (i+1) + "]" + " Операция завершилась в " + time + " секунду");
            }
        }
        
    }
}

    let [n, size, arrayOfArrival, arrayOfDuration] = getInputData();
    console.log("\nБуфер до обработки:");
    console.log(arrayOfArrival); console.log(arrayOfDuration);
    console.log("\nБуфер после обработки:");
    let [newArrayOfArrival, newArrayOfDuration] = compareBuffer(arrayOfArrival, arrayOfDuration);
    console.log(newArrayOfArrival); console.log(newArrayOfDuration); 
    resultHandler(newArrayOfArrival, newArrayOfDuration);

    
    
