
const map = L.map('map').setView([38.0, -97.0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    {
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-90, -100, 3),
        elementId: 'marker1'
    },
    {
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-90, -100, 3),
        elementId: 'marker2'
    },
    {
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-90, -100, 3),
        elementId: 'marker3'
    }
];

async function fetchLocality(lat, lng) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || 'Unknown location';
}

coordinates.forEach(async (coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}`).openPopup();

    document.getElementById(coord.elementId).innerText = `Marker ${index + 1}: ${coord.lat}, ${coord.lng}`;

    const locality = await fetchLocality(coord.lat, coord.lng);
    document.getElementById(coord.elementId).innerText += ` - Locality: ${locality}`;
});
