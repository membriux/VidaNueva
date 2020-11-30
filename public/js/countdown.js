const clock = $('#countdown')
const countdownText = $('.countdown-text')

function main() {
    // If currently live, NO timer
    initializeClock(getNextSunday())
}

// ––––– Countdown Functionality 
function getNextSunday() {
    // Get today's date and days until sunday
    let now = new Date()
    let nowDay = now.getDay()
    let nowHour = now.getHours()
    let nowMinutes = now.getMinutes()
    
    if (nowDay == 0) {
        // Edge Case –– Sunday before 3:00 pm, don't change day
        if (nowHour < 15) { 
            return now 
        }
        
        // Between 3 - 5pm on sunday ask to refresh page
        else if (15 < nowHour < 17 ) {
            return askToRefreshPage()
        } 

    } 
    
    let daysUntilSunday = 7 - now.getDay()
    // Set the time of service
    now.setDate(now.getDate() + daysUntilSunday) 

    // Sunday after live stream get day left
    now.setHours(15)
    now.setMinutes(30)
    now.setSeconds(00)
    
    return now
}

function askToRefreshPage() {
    countdownText.empty()
    clock.empty()
    let refreshButton = `
    <a href='/mensajes'>
        <button class='btn btn-danger'>
            <h3> Presiona para ver en Vivo! </h2>
        </button>
    </a>`
    clock.html(refreshButton)
}



function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return { total, days, hours, minutes, seconds };
  }
  

function initializeClock(endtime) {
    const timeinterval = setInterval(() => {

        const t = getTimeRemaining(endtime);
        if (t.days > 1) {
            clock.html(`${t.days} días ${t.hours} hrs ${t.minutes} min ${t.seconds} sec`);
        }
        else if (t.hours > 1) {
            clock.html(`${t.hours} hrs ${t.minutes} min ${t.seconds} sec`);
        } else {
            clock.html(`${t.minutes} min ${t.seconds} sec`);
        }

        if (t.total <= 0) {
            
            askToRefreshPage();
        }

    },1000);
}



main()
