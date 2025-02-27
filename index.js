const WhatsAppService = require('./services/WhatsappServices');

async function main() {
    console.log('🚀 Starting WhatsApp bot...');

    await WhatsAppService.connect();

    if (!WhatsAppService.client) {
        console.error('❌ Failed to connect to WhatsApp.');
        return;
    }

    await WhatsAppService.checkBirthdays();

    // await WhatsAppService.sendMessage('5512996443989@c.us', 'Oi Thutuca');

    // await WhatsAppService.sendGroupMessage('120363204956853598@g.us', 'Hello, group! 🎉');

    // const groups = await WhatsAppService.getGroups();
    // if (groups && groups.length > 0) {
    //     console.log('📌 List of Groups:');
    //     groups.forEach(group => console.log(`- ${group.name}: ${group.id._serialized}`));
    // } else {
    //     console.log('⚠️ No groups found.');
    // }
}

main();