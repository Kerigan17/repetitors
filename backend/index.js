const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Разрешить запросы с этого источника
}));
app.use(express.json()); // Для обработки JSON-запросов
app.use(express.urlencoded({ extended: true })); // Для обработки форм

// Ваш токен бота
const BOT_TOKEN = '7839604671:AAFPRBquL8MRYgPL5DgAzgS5nxFGUPmkWu8';
// ID чата (ваш личный chat_id или ID группы/канала)
const CHAT_ID = '577271831';

// Функция для отправки сообщения в Telegram
const sendTelegramMessage = async (text) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML', // Для форматирования текста
        });
        console.log('Сообщение отправлено:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error.response?.data || error.message);
        throw error;
    }
};

// Роут для обработки данных формы
app.post('/send-form', async (req, res) => {
    const { name, contact, studentName, age } = req.body;

    if (!name || !contact || !studentName || !age) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    // Формируем сообщение для Telegram
    const message = `
        <b>Новая заявка:</b>
        <b>Контактные данные:</b>
        👤 Имя: ${name}
        📞 Контакт: ${contact}

        <b>Данные ученика:</b>
        👶 Имя ученика: ${studentName}
        🎂 Возраст: ${age}
    `;

    try {
        await sendTelegramMessage(message);
        res.json({ success: true, message: 'Форма успешно отправлена!' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при отправке формы' });
    }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});