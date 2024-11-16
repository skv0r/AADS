// Фнукция валидации блока size n пакетов.
function isValid(n) {
    return n > 0 && n % 1 === 0;
}

// Функция сравнения двух массивов по size arrive и отсева непоточных элементов массивов с учетом приоритета.
function compareBuffer(arrayOfArrival, arrayOfDuration, arrayOfPriority) {
    let newArrayOfArrival = [];
    let newArrayOfDuration = [];
    let newArrayOfPriority = [];
    let setRepeated = new Set([]);
    let arrayRepeated = Array.from(setRepeated);
    
    // Собираем массив пакетов со всеми параметрами
    let packets = [];
    for (let j = 0; j < arrayOfArrival.length; j++) {
        packets.push({
            arrival: arrayOfArrival[j],
            duration: arrayOfDuration[j],
            priority: arrayOfPriority[j]
        });
    }

    // Сортировка пакетов по приоритету (более высокий приоритет - первее), а при равных приоритетах по времени прибытия
    packets.sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority; // Чем выше приоритет, тем раньше обрабатывается
        } else {
            return a.arrival - b.arrival; // При равном приоритете по времени поступления
        }
    });

    // Отсеивание непоточных элементов и формирование новых массивов
    for (let j = 0; j < packets.length; j++) {
        if (packets[j].arrival <= size) {
            if (!arrayRepeated.includes(packets[j].arrival)) {
                newArrayOfArrival.push(packets[j].arrival);
                newArrayOfDuration.push(packets[j].duration);
                newArrayOfPriority.push(packets[j].priority);
                arrayRepeated.push(packets[j].arrival);
            } else {
                newArrayOfArrival.push(packets[j].arrival);
                newArrayOfDuration.push(-1);
                newArrayOfPriority.push(packets[j].priority);
            }
        }
    }

    return [newArrayOfArrival, newArrayOfDuration, newArrayOfPriority];
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
        let arrayOfPriority = [];
        for (let i = 0; i < n; i++) {
            let arrival = Number(readline.question("Введите время поступления пакета: "));
            let duration = Number(readline.question("Введите время обработки пакета: "));
            let priority = Number(readline.question("Введите приоритет пакета (чем выше число, тем выше приоритет): "));
            arrayOfArrival.push(arrival);
            arrayOfDuration.push(duration);
            arrayOfPriority.push(priority);
        }
        return [n, size, arrayOfArrival, arrayOfDuration, arrayOfPriority];
    }
};

// Функция вывода результата с учётом приоритета.
function resultHandler(newArrayOfArrival, newArrayOfDuration, newArrayOfPriority) {
    let time = -1;
    for (let i = 0; i < newArrayOfArrival.length; i++) {
        if (time <= newArrayOfArrival[i]) {
            if (newArrayOfDuration[i] !== -1) {
                time = newArrayOfArrival[i] + newArrayOfDuration[i];
                console.log("[" + (i+1) + "]" + " Операция с приоритетом " + newArrayOfPriority[i] + " завершилась в " + time + " секунду");
            }
        }
    }
}

let [n, size, arrayOfArrival, arrayOfDuration, arrayOfPriority] = getInputData();
console.log("\nБуфер до обработки:");
console.log(arrayOfArrival);
console.log(arrayOfDuration);
console.log(arrayOfPriority);
console.log("\nБуфер после обработки:");
let [newArrayOfArrival, newArrayOfDuration, newArrayOfPriority] = compareBuffer(arrayOfArrival, arrayOfDuration, arrayOfPriority);
console.log(newArrayOfArrival);
console.log(newArrayOfDuration);
console.log(newArrayOfPriority);
resultHandler(newArrayOfArrival, newArrayOfDuration, newArrayOfPriority);
