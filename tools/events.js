let https = require('https');

const CHURCH_CENTER_API_KEY = 'ort_33ba0d91c210f35345a1e855ed05d2b1d9b7529ac3cea3ed11584ec5c0a2e891';
const EVENTS_ENDPOINT_PATH = '/registrations/v2/events?order=starts_at&filter=unarchived%2Cpublished&fields[Event]=name%2Cfeatured%2Clogo_url%2Cevent_time%2Cstarts_at%2Cends_at%2Cregistration_state&per_page=100';
const CHURCH_CENTER_HOSTNAME = 'api.churchcenter.com';

console.log("CHURCH CENTER API KEY: ", CHURCH_CENTER_API_KEY);

const fetchEventsFromAPI = function(completion) {
    let url = `https://${CHURCH_CENTER_HOSTNAME}${EVENTS_ENDPOINT_PATH}`;
    let rawData = '';

    const headers = {
        'Authorization': `Bearer ${CHURCH_CENTER_API_KEY}`,
        'X-PCO-API-Version': '2020-06-16',
        'Accept': 'application/json'
    };

    const options = {
        hostname: CHURCH_CENTER_HOSTNAME,
        path: EVENTS_ENDPOINT_PATH,
        method: 'GET',
        headers: headers
    };

    https.get(options, (res) => {
        res.on('data', (d) => {
            rawData += d;
        });

        res.on('end', () => {
            try {
                let data = JSON.parse(rawData);
                console.log("DATA:", JSON.stringify(data.data))
                return completion(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return completion({ error: 'Failed to parse API response' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching events from Church Center API:', error);
        return completion({ error: 'Failed to fetch data from API' });
    });
};

module.exports = {
    fetchEventsFromAPI
};