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
        } else {
            packets[j].duration = -1;
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

// Функция вывода результата с учётом приоритета и расчета статистики.
function resultHandler(newArrayOfArrival, newArrayOfDuration, newArrayOfPriority) {
    let time = -1;
    let totalWaitingTime = 0;
    let processedPackets = 0;
    let totalProcessingTime = 0;
    let idleTime = 0;
    let discardedPackets = 0;

    for (let i = 0; i < newArrayOfArrival.length; i++) {
        if (newArrayOfDuration[i] === -1) {
            // Пакет отброшен
            discardedPackets++;
            console.log("[" + (i+1) + "] Пакет с приоритетом " + newArrayOfPriority[i] + " отброшен.");
            continue;
        }

        if (time < newArrayOfArrival[i]) {
            // Если процессор простаивает
            idleTime += newArrayOfArrival[i] - time;
            time = newArrayOfArrival[i];
        }

        // Время ожидания пакета
        let waitingTime = time - newArrayOfArrival[i];
        totalWaitingTime += waitingTime;

        // Время завершения обработки пакета
        time += newArrayOfDuration[i];
        totalProcessingTime += newArrayOfDuration[i];

        processedPackets++;

        console.log("[" + (i+1) + "] Операция с приоритетом " + newArrayOfPriority[i] + " завершилась в " + time + " секунду. Время ожидания: " + waitingTime + " сек.");
    }

    // Статистика
    const totalPackets = newArrayOfArrival.length;
    const totalTime = newArrayOfArrival[newArrayOfArrival.length - 1] + newArrayOfDuration[newArrayOfDuration.length - 1]; // Общее время работы системы
    const discardedPercentage = (discardedPackets / totalPackets) * 100; // Процент отброшенных пакетов
    const averageWaitingTime = totalWaitingTime / processedPackets; // Среднее время ожидания пакета

    console.log("\n--- Статистика ---");
    console.log("Общее количество пакетов: " + totalPackets);
    console.log("Обработано пакетов: " + processedPackets);
    console.log("Отброшено пакетов: " + discardedPackets + " (" + discardedPercentage.toFixed(2) + "%)");
    console.log("Среднее время ожидания пакетов: " + averageWaitingTime.toFixed(2) + " сек.");
    console.log("Время простоя процессора: " + idleTime + " сек.");
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
