const readline = require('readline');

class PhoneBook {
    constructor(limit) {
        this.contacts = new Map(); // Хранит номера и имена
        this.limit = limit; // Максимальное количество контактов
    }

    // Добавить контакт
    add(number, name) {
        if (!this.isValidNumber(number)) {
            console.log("Ошибка: неверный формат номера. Номер должен содержать от 1 до 7 цифр и не начинаться с нуля.");
            return;
        }
        if (this.contacts.size >= this.limit) {
            console.log("Ошибка: превышен лимит телефонной книги.");
            return;
        }
        const contactName = name.trim() === "" ? "Не названный контакт" : name;

        // Проверка на дублирующиеся номера
        if (this.contacts.has(number)) {
            console.log(`Ошибка: номер ${number} уже существует с именем "${this.contacts.get(number)}".`);
            return;
        }

        // Проверка на дублирующиеся имена
        for (const [num, existingName] of this.contacts.entries()) {
            if (existingName === contactName) {
                console.log(`Ошибка: имя "${contactName}" уже связано с номером ${num}.`);
                return;
            }
        }

        this.contacts.set(number, contactName);
        console.log(`Добавлено: ${number} -> ${contactName}`);
    }

    // Удалить контакт
    del(number) {
        if (!this.isValidNumber(number)) {
            console.log("Ошибка: неверный формат номера. Номер должен содержать от 1 до 7 цифр и не начинаться с нуля.");
            return;
        }
        if (this.contacts.has(number)) {
            this.contacts.delete(number);
            console.log(`Удалено: ${number}`);
        } else {
            console.log("Ошибка: номер не найден.");
        }
    }

    // Найти контакт
    find(number) {
        if (!this.isValidNumber(number)) {
            console.log("Ошибка: неверный формат номера. Номер должен содержать от 1 до 7 цифр и не начинаться с нуля.");
            return;
        }
        if (this.contacts.has(number)) {
            console.log(this.contacts.get(number));
        } else {
            console.log("Не найдено");
        }
    }

    // Проверка корректности номера
    isValidNumber(number) {
        return /^[1-9][0-9]{0,6}$/.test(number);
    }
}

// Настройка ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let phoneBook;

// Запрос лимита перед началом работы
rl.question("Введите максимальное количество контактов: ", (limit) => {
    if (!/^\d+$/.test(limit) || parseInt(limit) <= 0) {
        console.log("Ошибка: лимит должен быть положительным числом.");
        rl.close();
        return;
    }

    phoneBook = new PhoneBook(parseInt(limit));
    console.log("Телефонная книга готова к работе.");
    console.log("Введите команды (add <номер> <имя>, del <номер>, find <номер>, или exit для выхода):");

    rl.setPrompt('Введите команду> ');
    rl.prompt();

    rl.on('line', (line) => {
        const [operation, number, ...nameParts] = line.trim().split(" ");
        const name = nameParts.join(" ");

        switch (operation) {
            case "add":
                if (!number) {
                    console.log("Ошибка: номер не указан для команды add.");
                    break;
                }
                phoneBook.add(number, name);
                break;
            case "del":
                if (!number) {
                    console.log("Ошибка: номер не указан для команды del.");
                    break;
                }
                phoneBook.del(number);
                break;
            case "find":
                if (!number) {
                    console.log("Ошибка: номер не указан для команды find.");
                    break;
                }
                phoneBook.find(number);
                break;
            case "exit":
                rl.close();
                return;
            default:
                console.log("Ошибка: неизвестная команда.");
        }

        rl.prompt();
    }).on('close', () => {
        console.log("До свидания!");
        process.exit(0);
    });
});
