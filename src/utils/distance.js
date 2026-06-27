export function calcularDistancia(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

export function sedesMasCercanas(userLat, userLng, sedes) {
  return sedes
    .map((s) => ({
      ...s,
      distancia: parseFloat(calcularDistancia(userLat, userLng, s.lat, s.lng)),
    }))
    .sort((a, b) => a.distancia - b.distancia);
}
