const { chromium } = require('playwright');
require('dotenv').config();

const TARGET_URL = 'https://tuvidanuevasl.churchcenter.com/registrations';
const API_URL = 'https://api.churchcenter.com/registrations/v2/events';
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

let latestToken = null;

async function scrapeToken() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let tokenCaptured = false;

    page.on('request', async (request) => {
        if (request.url().startsWith(API_URL)) {
            const auth = request.headers()['authorization'];
            if (auth && auth.startsWith('Bearer ') && !tokenCaptured) {
                tokenCaptured = true;
                latestToken = auth.replace('Bearer ', '');
                console.log(`✅ Token captured: ${latestToken}`);
            }
        }
    });

    await page.goto(TARGET_URL);
    await page.waitForTimeout(5000); // Allow network requests to fire

    if (!tokenCaptured) {
        console.log('❌ Bearer token not captured.');
    }

    await browser.close();
}

function getChurchCenterToken() {
    return latestToken || process.env.CHURCH_CENTER_API_KEY;
}

module.exports = {
    scrapeToken,
    getChurchCenterToken
};
