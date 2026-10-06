const token = "8850814054:AAG6mzh1XQRMKAnqokOgcFKwTqhDNPpk32w";
const chatId = "913924819";
const tunnelUrl = "https://cheap-books-publicly-robinson.trycloudflare.com/telegram";

async function send() {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: "🌿 <b>Welcome to Teuk Massage & Spa Concierge</b>\n\nTap below to explore our healing rituals, check real-time availability, and reserve your sanctuary suite directly inside Telegram without any prepayment.",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌿 Open Spa Booking App",
            web_app: { url: tunnelUrl }
          }
        ],
        [
          {
            text: "🌐 Visit Official Website",
            url: "https://cheap-books-publicly-robinson.trycloudflare.com"
          }
        ]
      ]
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  console.log("Send result:", JSON.stringify(json));
}

send();
