require('colors');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

// filter out only planets that are habitable
function isHabitablePlanet(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

// read data

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
            // path.join(__dirname, '../../data/kepler_data.csv')
        )
            .pipe(
                parse({
                    comment: '#',
                    columns: true,
                })
            )
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
            .on('end', () => {
                console.log(
                    `${
                        habitablePlanets.length.toString().green
                    } habitable planets found!!`
                );
                resolve();
            });
    });
}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets,
};
