/**
 * SEDES OFICIALES — RATEL-CASE
 *
 * Coordenadas obtenidas directamente desde Google Maps
 * por el propietario del negocio (clic derecho → copiar coordenadas).
 * Estas son las coordenadas canónicas — no modificar sin verificación en Maps.
 *
 * Para actualizar: Google Maps → clic derecho sobre el pin → copiar lat,lng
 * Última verificación: junio 2025 (propietario)
 */

export const sedes = [
  {
    id: 1,
    nombre: "Jesús María",
    direccion: "Av. Horacio Urteaga 1458",
    codigoPostal: "15072",
    distrito: "Jesús María",
    departamento: "Lima",
    lat: -12.075697010530684,
    lng: -77.05006846924681,
    horario: "Lun–Sáb: 9am–8pm | Dom: 10am–6pm",
    telefono: "+51 924 225 117",
    referencia: "Frente al parque Cahuide",
    gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=-12.075697010530684,-77.05006846924681&travelmode=driving",
  },
  {
    id: 2,
    nombre: "Independencia",
    direccion: "Av. Chinchaysuyo 119",
    codigoPostal: "15332",
    distrito: "Independencia",
    departamento: "Lima",
    lat: -11.979836100513294,
    lng: -77.05852824208795,
    horario: "Lun–Sáb: 9am–8pm | Dom: 10am–6pm",
    telefono: "+51 902 767 684",
    referencia: "A 1 cuadra del Mercado Unicachi",
    gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=-11.979836100513294,-77.05852824208795&travelmode=driving",
  },
  {
    id: 3,
    nombre: "Lima Centro",
    direccion: "Av. Argentina 344 Int. C69",
    codigoPostal: "15079",
    distrito: "Cercado de Lima",
    departamento: "Lima",
    lat: -12.04334751788536,
    lng: -77.04700846707084,
    horario: "Lun–Sáb: 9am–8pm | Dom: 10am–6pm",
    telefono: "+51 924 110 730",
    referencia: "Interior C69, galería comercial Av. Argentina",
    gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=-12.04334751788536,-77.04700846707084&travelmode=driving",
  },
  {
    id: 4,
    nombre: "San Martín de Porres",
    direccion: "Av. Perú 1940",
    codigoPostal: "",
    distrito: "San Martín de Porres",
    departamento: "Lima",
    lat: -12.031719618998807,
    lng: -77.06662140828226,
    horario: "Lun–Sáb: 9am–8pm | Dom: 10am–6pm",
    telefono: "+51 926 679 795",
    referencia: "A 2 cuadras del Hospital Santa Rosa",
    gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=-12.031719618998807,-77.06662140828226&travelmode=driving",
  },
];

export const distritos = [...new Set(sedes.map(s => s.distrito))];
