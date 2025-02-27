const wppconnect = require('@wppconnect-team/wppconnect');

class WhatsAppService {
    constructor() {
        this.client = null;
        this.birthdays = [
            { name: 'Luana', date: '02-27' },
            { name: 'Max', date: '02-27' }
        ];
    }

    async connect() {
        try {
            this.client = await wppconnect.create({
                session: 'whatsapp-session',
                autoClose: false,
                puppeteerOptions: { headless: true },
                catchQR: (qrCode, asciiQR) => {
                    console.log('🔹 Scan this QR Code to log in:');
                    console.log(asciiQR);
                },
                statusFind: (status) => {
                    console.log('🔹 WhatsApp status:', status);
                }
            });

            console.log('✅ WhatsApp session is ready!');
        } catch (error) {
            console.error('❌ Error connecting to WhatsApp:', error);
        }
    }

    async sendMessage(phone, message) {
        if (!this.client) {
            console.error('❌ Client not initialized. Call connect() first.');
            return;
        }

        try {
            const result = await this.client.sendText(phone, message);
            console.log('📩 Message sent:', result);
        } catch (error) {
            console.error('❌ Error sending message:', error);
        }
    }

    async sendGroupMessage(groupId, message) {
        if (!this.client) {
            console.error('❌ Client not initialized. Call connect() first.');
            return;
        }

        try {
            const result = await this.client.sendText(groupId, message);
            console.log('📩 Message sent to group:', result);
        } catch (error) {
            console.error('❌ Error sending group message:', error);
        }
    }

    async getGroups() {
        if (!this.client) {
            console.error('❌ Client not initialized. Call connect() first.');
            return [];
        }

        try {
            return await this.client.listChats({ onlyGroups: true });
        } catch (error) {
            console.error('❌ Error getting groups:', error);
            return [];
        }
    }

    async checkBirthdays() {
        const today = new Date().toISOString().slice(5, 10);

        console.log(today);

        this.birthdays.forEach(person => {
            if (person.date === today) {
                console.log(`🎉 It's ${person.name}'s birthday! Sending messages...`);
                let text = `🎉 Hoje é o niver do(a) ${person.name}! Envie mensagem...`
                this.sendGroupMessage('120363204956853598@g.us', text);
            }
        });
    }

    async sendBirthdayMessages(name) {
        if (!this.client) {
            console.error('❌ Client not initialized. Call connect() first.');
            return;
        }

        const message = `🎉 Happy Birthday, ${name}! 🎂 Have a great day!`;

        const recipients = ['5511999999999@c.us', '5511888888888@c.us'];
        for (const phone of recipients) {
            await this.sendMessage(phone, message);
        }

        // Example group message
        const groups = await this.getGroups();
        if (groups.length > 0) {
            await this.sendGroupMessage(groups[0].id._serialized, message);
        }
    }
}

module.exports = new WhatsAppService();