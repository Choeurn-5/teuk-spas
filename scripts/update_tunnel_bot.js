const token = "8850814054:AAG6mzh1XQRMKAnqokOgcFKwTqhDNPpk32w";
const chatId = "913924819";
const tunnelBase = "https://allows-excel-lincoln-kings.trycloudflare.com";
const appUrl = `${tunnelBase}/telegram`;
const webhookUrl = `${tunnelBase}/api/telegram/webhook`;

async function updateAll() {
  // 1. Update Webhook
  const whRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
  const whJson = await whRes.json();
  console.log("Webhook updated:", whJson);

  // 2. Update Default Menu Button
  const mbRes = await fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      menu_button: {
        type: "web_app",
        text: "Book Ritual 🌿",
        web_app: { url: appUrl }
      }
    })
  });
  console.log("Default menu button updated:", await mbRes.json());

  // 3. Update User's specific chat Menu Button
  const userMbRes = await fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      menu_button: {
        type: "web_app",
        text: "Book Ritual 🌿",
        web_app: { url: appUrl }
      }
    })
  });
  console.log("User chat menu button updated:", await userMbRes.json());

  // 4. Send updated interactive message
  const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "✨ <b>Teuk Spa Mini App is Connected!</b>\n\nTap the button below to open the booking app:",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌿 Open Spa Booking App",
              web_app: { url: appUrl }
            }
          ]
        ]
      }
    })
  });
  console.log("New message sent:", await msgRes.json());
}

updateAll();
