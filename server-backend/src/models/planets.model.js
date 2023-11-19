require('colors');
const { parse } = require('csv-parse');
const fs = require('fs');

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
fs.createReadStream('kepler_data.csv')
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
    })
    .on('end', () => {
        console.log(
            habitablePlanets.map((planet) => {
                return planet['kepler_name'];
            })
        );
        console.log(
            `${
                habitablePlanets.length.toString().green
            } habitable planets found!!`
        );
    });

module.exports = {
    planets: habitablePlanets,
};
