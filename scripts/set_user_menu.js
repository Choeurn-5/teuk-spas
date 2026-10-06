const token = "8850814054:AAG6mzh1XQRMKAnqokOgcFKwTqhDNPpk32w";
const chatId = "913924819";
const tunnelUrl = "https://cheap-books-publicly-robinson.trycloudflare.com/telegram";

async function setMenu() {
  const url = `https://api.telegram.org/bot${token}/setChatMenuButton`;
  const body = {
    chat_id: chatId,
    menu_button: {
      type: "web_app",
      text: "Book Ritual 🌿",
      web_app: {
        url: tunnelUrl
      }
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  console.log("Set menu button for user chat:", JSON.stringify(json));
}

setMenu();
