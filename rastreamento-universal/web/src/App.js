
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_URL = "https://SEU_BACKEND_ON_RENDER.onrender.com";

export default function App() {
  const [localizacoes, setLocalizacoes] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/localizacoes/user123`).then(res => {
      setLocalizacoes(res.data);
    });
  }, []);

  return (
    <MapContainer center={[-8.05, -34.88]} zoom={15} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {localizacoes.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]} />
      ))}
    </MapContainer>
  );
}
