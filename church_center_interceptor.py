import os
import asyncio
import requests
from dotenv import load_dotenv
from playwright.async_api import async_playwright

# Load .env file
load_dotenv()

# URLs and constants
target_url = "https://tuvidanuevasl.churchcenter.com/registrations"
api_url = "https://api.churchcenter.com/registrations/v2/events"

# Webhook (partial) from .env
discord_suffix = os.getenv("DISCORD_WEBHOOK")
webhook_url = f"https://discord.com/api/webhooks/{discord_suffix}"

def send_discord_notification(token):
    message = {
        "content": f"🎉 Successfully captured Bearer token:\n```\n{token}\n```"
    }
    try:
        response = requests.post(webhook_url, json=message)
        if response.status_code == 204:
            print("✅ Sent token to Discord webhook!")
        else:
            print(f"⚠️ Failed to send to Discord (Status {response.status_code})")
    except Exception as e:
        print(f"❌ Error sending to Discord: {e}")

def update_server_env_variable(token):
    try:
        os.environ["CHURCH_CENTER_API_KEY"] = token
        print("🔐 Updated CHURCH_CENTER_API_KEY environment variable")
    except Exception as e:
        print(f"❌ Failed to update environment variable: {e}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Intercept API requests
        async def handle_request(request):
            if request.url.startswith(api_url):
                headers = request.headers
                auth_header = headers.get("authorization")
                if auth_header and auth_header.startswith("Bearer "):
                    print("✅ Found Bearer Token:")
                    print(auth_header)
                    send_discord_notification(auth_header)
                    update_server_env_variable(auth_header)

        page.on("request", handle_request)

        await page.goto(target_url)
        print(f"🌐 Navigated to {target_url}")

        await page.wait_for_timeout(5000)
        await browser.close()

asyncio.run(main())
