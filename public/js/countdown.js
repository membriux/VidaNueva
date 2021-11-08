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

    if (nowDay == 0 && nowHour > 15 && nowHour < 17) {
        return askToRefreshPage()
    } else if (nowDay == 0 && nowHour < 15) {
        return now
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


function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
}

function initializeClock(endtime) {
    const timeinterval = setInterval(() => {
        const t = getTimeRemaining(endtime);
        if (t.days > 0) {
            clock.html(`${t.days} días ${t.hours} hrs ${t.minutes} min ${t.seconds} sec`);
        }
        else if (t.hours > 0) {
            clock.html(`${t.hours} hrs ${t.minutes} min ${t.seconds} sec`);
        } else {
            clock.html(`${t.minutes} min ${t.seconds} sec`);
        }

    }, 1000);
}



main()
