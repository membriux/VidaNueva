

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

    // Edge Case –– Sunday before 3:30 pm, don't change day
    if (nowDay == 0) {
        if (nowHour > 15) {
            let daysUntilSunday = 7 - now.getDay()
            // Set the time of service
            now.setDate(now.getDate() + daysUntilSunday) 
        }
    } else {
        let daysUntilSunday = 7 - now.getDay()
        // Set the time of service
        now.setDate(now.getDate() + daysUntilSunday) 
    }

    // Sunday after live stream get day left
    now.setHours(15)
    now.setMinutes(30)
    now.setSeconds(00)
    
    return now
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
    const clock = $('#countdown')
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
            
            clearInterval(timeinterval);
        }

    },1000);
}


main()
