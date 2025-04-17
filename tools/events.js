let https = require('https');

const EVENTS_ENDPOINT_PATH = '/registrations/v2/events?order=starts_at&filter=unarchived%2Cpublished&fields[Event]=name%2Cfeatured%2Clogo_url%2Cevent_time%2Cstarts_at%2Cends_at%2Cregistration_state&per_page=100';
const CHURCH_CENTER_HOSTNAME = 'api.churchcenter.com';

const fetchEventsFromAPI = async function (completion, retry = false) {
    try {
        // 🧠 Line 9: Only scrape a new token if one doesn't exist yet
        if (!process.env.CHURCH_CENTER_API_KEY) {
            console.log('⚠️ No Church Center API token found, scraping new token...');
            await scrapeToken();
        }

        const token = await getChurchCenterToken();
        console.log("🔑 Using Church Center API Token:", token);

        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-PCO-API-Version': '2020-06-16',
            'Accept': 'application/json'
        };

        const options = {
            hostname: CHURCH_CENTER_HOSTNAME,
            path: EVENTS_ENDPOINT_PATH,
            method: 'GET',
            headers: headers
        };

        let rawData = '';

        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                rawData += d;
            });

            res.on('end', async () => {
                try {
                    const data = JSON.parse(rawData);

                    if (!data || !data.data) {
                        throw new Error("Missing expected data");
                    }

                    return completion(data);
                } catch (error) {
                    console.error('❌ Error parsing JSON or invalid data:', error);

                    if (!retry) {
                        console.log('🔁 Retrying with fresh token...');
                        await scrapeToken(); // refresh token
                        return fetchEventsFromAPI(completion, true); // retry once
                    }

                    return completion({ error: 'Failed to parse or retry API response' });
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Error fetching events from Church Center API:', error);
            return completion({ error: 'Failed to fetch data from API' });
        });

        req.end();
    } catch (err) {
        console.error('❌ Failed to get Church Center token:', err);
        return completion({ error: 'Token fetch failed' });
    }
};

module.exports = {
    fetchEventsFromAPI
};
