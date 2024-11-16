class Stack {
    constructor(maxSize) {
        this.stack = [];
        this.maxStack = [];
        this.minStack = [];
        this.sum = 0;
        this.count = 0;
        this.maxSize = maxSize;
    }

    push(value) {
        if (this.count >= this.maxSize) {
            console.error('Стек переполнен. Невозможно добавить элемент.');
            return;
        }
        this.stack.push(value);
        this.sum += value;
        this.count++;

        if (this.maxStack.length === 0 || value >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(value);
        }

        if (this.minStack.length === 0 || value <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(value);
        }
    }

    pop() {
        if (this.count === 0) {
            console.error('Стек пуст. Невозможно удалить элемент.');
            return;
        }
        const poppedValue = this.stack.pop();
        this.sum -= poppedValue;
        this.count--;

        if (poppedValue === this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.pop();
        }

        if (poppedValue === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }

        return poppedValue;
    }

    max() {
        return this.maxStack[this.maxStack.length - 1];
    }

    min() {
        return this.minStack[this.minStack.length - 1];
    }

    avg() {
        if (this.stack.length === 0) return 0;
        return this.sum / this.count;
    }
}

// Ввод данных с клавиатуры
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите максимальный размер стека: ', (maxSize) => {
    const myStack = new Stack(parseInt(maxSize));
    
    readline.question('Введите количество запросов: ', (q) => {
        let queries = 0;

        const processQuery = () => {
            if (queries < q) {
                readline.question('Введите запрос (push v, pop, max, min, avg): ', (input) => {
                    const parts = input.split(' ');
                    const command = parts[0];

                    switch (command) {
                        case 'push':
                            const value = parseInt(parts[1]);
                            myStack.push(value);
                            break;
                        case 'pop':
                            myStack.pop();
                            break;
                        case 'max':
                            console.log('Максимум:', myStack.max());
                            break;
                        case 'min':
                            console.log('Минимум:', myStack.min());
                            break;
                        case 'avg':
                            console.log('Среднее значение:', myStack.avg());
                            break;
                        default:
                            console.log('Неверная команда');
                    }
                    queries++;
                    processQuery(); // Запрос следующей команды
                });
            } else {
                readline.close();
            }
        };

        processQuery(); // Запускаем обработку запросов
    });
});
