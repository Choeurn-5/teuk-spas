const adminToken = "8850814054:AAG6mzh1XQRMKAnqokOgcFKwTqhDNPpk32w";
const customerToken = "8998881678:AAF2dlHharlDMDdzFb8_y8leenq1gQ4xW2o";
const adminChatId = "913924819";

const tunnelBase = "https://allows-excel-lincoln-kings.trycloudflare.com";
const appUrl = `${tunnelBase}/telegram`;
const webhookUrl = `${tunnelBase}/api/telegram/webhook`;

async function setup() {
  console.log("=== 1. CONFIGURING ADMIN BOT (@TeukSpaBot) ===");
  // Reset admin menu button to default
  const resetAdminMb = await fetch(`https://api.telegram.org/bot${adminToken}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menu_button: { type: "default" } })
  });
  console.log("Admin default menu button reset:", await resetAdminMb.json());

  // Reset admin chat-specific menu button
  const resetAdminChatMb = await fetch(`https://api.telegram.org/bot${adminToken}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: adminChatId, menu_button: { type: "default" } })
  });
  console.log("Admin user chat menu button reset:", await resetAdminChatMb.json());

  // Remove webhook from admin bot (admin bot is send-only)
  const delWh = await fetch(`https://api.telegram.org/bot${adminToken}/deleteWebhook`);
  console.log("Admin webhook deleted (send-only mode):", await delWh.json());

  console.log("\n=== 2. CONFIGURING CUSTOMER BOT (@TeukSpaBookingBot) ===");
  // Set customer bot description
  await fetch(`https://api.telegram.org/bot${customerToken}/setMyDescription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: "Welcome to Teuk Massage & Spa in Siem Reap, Cambodia.\n\nReserve bespoke traditional Khmer rituals and natural botanical treatments directly in Telegram. No prepayment required."
    })
  });

  await fetch(`https://api.telegram.org/bot${customerToken}/setMyShortDescription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      short_description: "Official booking concierge for Teuk Massage & Spa 🌿"
    })
  });

  // Set default Menu Button on customer bot
  const setCustMb = await fetch(`https://api.telegram.org/bot${customerToken}/setChatMenuButton`, {
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
  console.log("Customer bot Menu Button set:", await setCustMb.json());

  // Set webhook for customer bot to handle /start and incoming messages
  const setCustWh = await fetch(`https://api.telegram.org/bot${customerToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
  console.log("Customer bot webhook set:", await setCustWh.json());

  console.log("\n✅ TWO-BOT ARCHITECTURE SETUP COMPLETE!");
}

setup();
