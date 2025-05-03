const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to convert 24-hour time to 12-hour format
function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Route handler
router.get("/", (req, res) => {
    axios.get("https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=date&zone=WLY01&date=2025-05-04")
        .then((respond) => {
            const output = respond.data;
            // Convert prayer times to 12-hour format
            const convertedPrayerTimes = output.prayerTime.map(prayer => ({
                ...prayer,
                imsak: convertTo12Hour(prayer.imsak),
                fajr: convertTo12Hour(prayer.fajr),
                syuruk: convertTo12Hour(prayer.syuruk),
                dhuha: convertTo12Hour(prayer.dhuha),
                dhuhr: convertTo12Hour(prayer.dhuhr),
                asr: convertTo12Hour(prayer.asr),
                maghrib: convertTo12Hour(prayer.maghrib),
                isha: convertTo12Hour(prayer.isha)
            }));
            // Update output with converted times
            output.prayerTime = convertedPrayerTimes;
            res.status(200).json({ output });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch prayer times' });
        });
});

module.exports = router;