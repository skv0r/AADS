const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function generateRandomPrime(min = 3, max = 50) {
    let prime;
    do {
        prime = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!isPrime(prime));
    return prime;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    return x1 < 0 ? x1 + m0 : x1;
}

function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Функция для проверки максимального ASCII-кода в сообщении
function getMaxAsciiCode(message) {
    return Math.max(...message.split('').map(char => char.charCodeAt(0)));
}

// Генерация ключей с автоматическим подбором p и q
function generateKeys(message) {
    const maxAsciiCode = getMaxAsciiCode(message);
    
    let p, q, n;
    do {
        p = generateRandomPrime();
        q = generateRandomPrime();
        n = p * q;
    } while (n <= maxAsciiCode); // Проверка, что n больше максимального ASCII-кода

    const phi = (p - 1) * (q - 1);

    let e;
    do {
        e = Math.floor(Math.random() * (phi - 2)) + 2;
    } while (gcd(e, phi) !== 1);

    const d = modInverse(e, phi);

    return { p, q, n, e, d };
}

function encrypt(message, publicKey) {
    const { e, n } = publicKey;

    // Проверка, что все символы в допустимом диапазоне
    for (const char of message) {
        if (char.charCodeAt(0) >= n) {
            throw new Error(
                `Ошибка: Символ "${char}" с ASCII-кодом ${char.charCodeAt(0)} превышает модуль n = ${n}. Выберите другие p и q.`
            );
        }
    }

    return message
        .split('')
        .map(char => modExp(char.charCodeAt(0), e, n));
}

function decrypt(cipher, privateKey) {
    const { d, n } = privateKey;
    return cipher
        .map(num => String.fromCharCode(modExp(num, d, n)))
        .join('');
}

function main() {
    rl.question('Введите сообщение для шифрования: ', message => {
        if (!message) {
            console.log("Сообщение не может быть пустым. Попробуйте снова.");
            return rl.close();
        }

        const keys = generateKeys(message);

        console.log(`Программа выбрала простые числа: p = ${keys.p}, q = ${keys.q}`);
        console.log(`Открытый ключ (e, n): (${keys.e}, ${keys.n})`);
        console.log(`Закрытый ключ (d, n): (${keys.d}, ${keys.n})`);

        try {
            const publicKey = { e: keys.e, n: keys.n };
            const privateKey = { d: keys.d, n: keys.n };

            const encrypted = encrypt(message, publicKey);
            console.log(`Зашифрованное сообщение: ${encrypted}`);

            const decrypted = decrypt(encrypted, privateKey);
            console.log(`Расшифрованное сообщение: ${decrypted}`);

            if (decrypted !== message) {
                console.error("Ошибка: расшифрованное сообщение не совпадает с исходным. Попробуйте заново.");
            }
        } catch (error) {
            console.error(error.message);
            console.log("Попробуйте заново с другими параметрами.");
        }

        rl.close();
    });
}

main();
