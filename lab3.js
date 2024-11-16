const n = 3;
const array = [-1, 0, 5];
console.log("n = ", n);
console.log("array = ", array);

function calculateHeight(array, n) {
    // Массив для хранения уровней узлов
    let levels = Array(n).fill(-1); // Инициализация с -1 (неизвестный уровень)

    // Функция для рекурсивного вычисления высоты
    function findHeight(node) {
        // Если узел уже обработан, возвращаем его уровень
        if (levels[node] !== -1) {
            return levels[node];
        }

        // Проверка на корректность индекса родителя
        if (array[node] === -1) {
            levels[node] = 1; // Высота корня равна 1
        } else {
            let parent = array[node];
            
            // Проверка на допустимый индекс
            if (parent < 0 || parent >= n) {
                throw new Error(`Некорректный родительский индекс: ${parent}`);
            }

            levels[node] = findHeight(parent) + 1; // Высота = высота родителя + 1
        }

        return levels[node];
    }

    // Вычисляем высоту для каждого узла
    for (let i = 0; i < n; i++) {
        findHeight(i);
    }

    // Возвращаем максимальную высоту
    return Math.max(...levels);
}

// Пример ввода
const height = calculateHeight(array, n);
console.log("Высота дерева:", height);
