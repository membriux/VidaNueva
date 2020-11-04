
let https = require('https');
let fs = require('fs')

const YOUTUBE_APIKEY = process.env.YOUTUBE_APIKEY
const channelId = 'UC_aDAeNyjmPONJC0Vfxlsgg'
const maxResults = 4

const getVideosList = function(completion) {
  let playlistId = 'UU_aDAeNyjmPONJC0Vfxlsgg'
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&part=contentDetails&maxResults=${maxResults}&playlistId=${playlistId}&key=${YOUTUBE_APIKEY}`
  let rawData = ''

  // console.log(url)
  https.get(url, (res) => {
    res.on('data', (d) => {
      rawData += d
    });
  
    res.on('end', () => {
      let data = JSON.parse(rawData);
      return completion(data)
      // storeData(data, 'example.json')
      // console.log(data);
    });
  });
}

const isLiveNow = function(completion) {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${YOUTUBE_APIKEY}&eventType=live&type=video`
  let rawData = ''

  // console.log(url)
  https.get(url, (res) => {
    res.on('data', (d) => {
      rawData += d
    });
  
    res.on('end', () => {
      let data = JSON.parse(rawData);
      return completion(data)
    });
  });

}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getVideosList,
  isLiveNow
}

