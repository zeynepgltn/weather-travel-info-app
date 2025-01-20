const express = require('express');
const app = express();
const PORT = 3502; 
// JSON verisi için bir middleware
app.use(express.json());

const continentData = {
    Africa: [
        { country: 'South Africa', attractions: ['Table Mountain', 'Kruger National Park'] },
        { country: 'Egypt', attractions: ['Pyramids of Giza', 'Nile River'] },
        { country: 'Morocco', attractions: ['Chefchaouen', 'Sahara Desert'] },
    ],
    Asia: [
        { country: 'Japan', attractions: ['Mount Fuji', 'Tokyo'] },
        { country: 'India', attractions: ['Taj Mahal', 'Goa'] },
        { country: 'China', attractions: ['Great Wall', 'Forbidden City'] },
    ],
    Europe: [
        { country: 'France', attractions: ['Eiffel Tower', 'Louvre Museum'] },
        { country: 'Italy', attractions: ['Colosseum', 'Venice'] },
        { country: 'Germany', attractions: ['Berlin Wall', 'Neuschwanstein Castle'] },
    ],
    NorthAmerica: [
        { country: 'United States', attractions: ['Grand Canyon', 'Statue of Liberty'] },
        { country: 'Canada', attractions: ['Niagara Falls', 'Banff National Park'] },
        { country: 'Mexico', attractions: ['Chichen Itza', 'Cancun'] },
    ],
    SouthAmerica: [
        { country: 'Brazil', attractions: ['Christ the Redeemer', 'Amazon Rainforest'] },
        { country: 'Argentina', attractions: ['Iguazu Falls', 'Buenos Aires'] },
        { country: 'Peru', attractions: ['Machu Picchu', 'Lima'] },
    ],
    Australia: [
        { country: 'Australia', attractions: ['Sydney Opera House', 'Great Barrier Reef'] },
        { country: 'New Zealand', attractions: ['Milford Sound', 'Aoraki Mount Cook'] },
    ],
    Antarctica: [
        { country: 'Antarctica', attractions: ['Icebergs', 'Penguins'] },
    ],
};

app.get('/api/continent/:name', (req, res) => {
    const continentName = req.params.name;
    const countries = continentData[continentName];

    if (!countries) {
        return res.status(404).json({ message: 'Kıta bulunamadı.' });
    }

    res.json({ continent: continentName, countries });
});

app.get('/api/continents', (req, res) => {
    const continents = Object.keys(continentData);
    res.json({ continents });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`API http://localhost:${PORT} adresinde çalışıyor.`);
});
