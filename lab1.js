//Сортировка Расчестка
function combSorting(array) {
    var interval = Math.floor(array.length / 1.25);
    while (interval > 0) {
        for (var i = 0; i + interval < array.length; i++) {
            if (array[i] > array[i + interval]) {
                var small = array[i + interval];
                array[i + interval] = array[i];
                array[i] = small;
            }
        }
        interval = Math.floor(interval / 1.25);
    }
    return array;
}


//Сортировка текста по длине слова, где числа не учитываются, по убыванию
function sortText(text) {
    var words = text.split(' ');
    var sortedWords = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var latinWord = word.replace(/[^a-z]/gi, '');
        if (latinWord.length > 0) {
            sortedWords.push(latinWord);
        }
    }
    sortedWords.sort(function (a, b) {
        return b.length - a.length;
    });
    return sortedWords.join(' ').toLowerCase();
};

// Функиця для сортировки предложения на латинице побуквенно без лишних знаков.
function stringToSingleArrayUnicode(string) {
    var array = [];
    for (var i = 0; i < string.length; i++) {
        if ((string[i]).match(/[a-z]/)) {
            array.push((string[i]).charCodeAt(0));
        }
    }
    return array;
}

//Функция для вывода количества повторящихся букв в предложении на основе сортировки расчетской.
function outputRepeatLetters(text) {
    let arrayUnicode = combSorting(stringToSingleArrayUnicode(sortText(text)));
    let setUnicode = [...new Set(arrayUnicode)];
    let output = '';
    const latinAlpabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 97; i < latinAlpabet.length + 97; i++) {
        let repeat = 0;
        for (let j = 0; j < setUnicode.length; j++) {
            if (i == setUnicode[j]) {
                repeat = arrayUnicode.filter(num => num === i).length;
            }
        }
        output += (String.fromCharCode(i) + ' - ' + repeat + '\n');
    }
    return output;
}
//Запуск счетчика времени выполнения программы.
const start = new Date().getTime();
const fs = require('fs');
//Чтение и обновление файла
fs.writeFileSync('analysis.txt', '');
let randomLatinText = fs.readFileSync('original.txt', 'utf8');
sortedSentence = sortText(randomLatinText)
fs.writeFileSync('result.txt', sortedSentence);
fs.appendFileSync('analysis.txt', 'Введенный текст:\n' + randomLatinText + '\n' + 'Вариант 2: Латиница, По кол-ву символов в слове, по убыванию, игнорировать числа, Сортировка Расчестка\nКоличество слов: ' + ((sortedSentence.split(' ')).length + '\n'));
//Запуск сортировки
let output = outputRepeatLetters(randomLatinText);
//Окончание счетчика времени выполнения программы.
const end = new Date().getTime();
fs.appendFileSync('analysis.txt', ('Время выполнения программы: ' + (end - start) + 'ms\n'));
fs.appendFileSync('analysis.txt', output);

