// App.js — CleanPath FINAL (Click to zoom + Clean/Free filter + Splash fix + Larger logos)

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Logo from "./CP.png"; // YOUR LOGO

// Fix leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Cleanliness levels
const LEVELS = ["gold", "silver", "bronze"];
const randomLevel = () => LEVELS[Math.floor(Math.random() * LEVELS.length)];

// Make 80 spots
const BASE_SPOTS = [];
while (BASE_SPOTS.length < 80) {
  BASE_SPOTS.push({
    name: `CleanPath Spot ${BASE_SPOTS.length + 1}`,
    category: "Public Toilet",
    address: `Area ${BASE_SPOTS.length + 1}, Parbhani`,
  });
}

const spotsData = BASE_SPOTS.map((spot, idx) => {
  const level = randomLevel();
  return {
    id: idx + 1,
    ...spot,
    lat: 19.24 + (idx % 10) * 0.004,
    lng: 76.74 + Math.floor(idx / 10) * 0.004,
    level,
    clean: level === "bronze" ? "No" : "Yes",
    free: Math.random() > 0.5 ? "Yes" : "No",
    verified: Math.random() > 0.5,
  };
});

// Distance function
function calcDistance(lat1, lon1, lat2, lon2) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Badge UI
function CleanBadge({ level }) {
  const icons = { gold: "🥇", silver: "🥈", bronze: "🥉" };
  return (
    <span
      style={{
        background: "#f3f4f6",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        marginLeft: 4,
      }}
    >
      {icons[level]} {level}
    </span>
  );
}

// Fly-to component
function MapFlyTo({ selectedSpot }) {
  const map = useMap();

  useEffect(() => {
    if (selectedSpot) {
      map.flyTo([selectedSpot.lat, selectedSpot.lng], 17, {
        duration: 1.2,
      });
    }
  }, [selectedSpot]);

  return null;
}

export default function App() {
  const [spots, setSpots] = useState(spotsData);
  const [query, setQuery] = useState("");
  const [filterClean, setFilterClean] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [userLoc, setUserLoc] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Splash screen
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Add spot form
  const [newSpot, setNewSpot] = useState({
    name: "",
    address: "",
    category: "Public Toilet",
  });

  // Splash screen timeout
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLoc({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLoc({ lat: 19.27, lng: 76.77 })
    );
  }, []);

  const handleAdminLogin = () => {
    const pin = prompt("Enter Admin PIN:");
    if (pin === "1234") setIsAdmin(true);
    else alert("Wrong PIN");
  };

  const handleAddSpot = (e) => {
    e.preventDefault();
    if (!newSpot.name || !newSpot.address) return alert("Missing info");

    const offset = Math.random() * 0.01 - 0.005;
    const level = randomLevel();

    const spot = {
      id: Date.now(),
      ...newSpot,
      lat: userLoc.lat + offset,
      lng: userLoc.lng + offset,
      level,
      clean: level === "bronze" ? "No" : "Yes",
      free: "Yes",
      verified: true,
    };

    setSpots((prev) => [...prev, spot]);
    setNewSpot({ name: "", address: "", category: "Public Toilet" });
  };

  const toggleVerify = (id) =>
    setSpots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s))
    );

  const deleteSpot = (id) =>
    window.confirm("Delete spot?") &&
    setSpots((prev) => prev.filter((s) => s.id !== id));

  // Filter + search
  const filtered = spots
    .filter((p) =>
      `${p.name} ${p.address} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .filter((p) => (filterClean ? p.clean === "Yes" : true))
    .filter((p) => (filterFree ? p.free === "Yes" : true))
    .map((p) => ({
      ...p,
      distance: userLoc
        ? calcDistance(userLoc.lat, userLoc.lng, p.lat, p.lng)
        : null,
    }))
    .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

  const center = userLoc || { lat: 19.27, lng: 76.77 };

  // -------------------------------------------------
  // SPLASH SCREEN  (logo ONLY, no text)
  // -------------------------------------------------
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Splash Logo" style={{ width: 220 }} />
      </div>
    );

  // -------------------------------------------------
  // MAIN UI
  // -------------------------------------------------
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* HEADER */}
      <header
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={Logo} alt="logo" style={{ width: 65 }} />
          <h2 style={{ margin: 0, fontSize: "1.9rem" }}>CleanPath</h2>
        </div>

        <button
          onClick={handleAdminLogin}
          style={{
            background: isAdmin ? "#10b981" : "#e5e7eb",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
          }}
        >
          {isAdmin ? "Admin ✔" : "Admin Login"}
        </button>
      </header>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          padding: 16,
          gap: 16,
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 12,
            height: "85vh",
            overflowY: "auto",
          }}
        >
          {/* SEARCH */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spots..."
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 12,
            }}
          />

          {/* FILTERS */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => setFilterClean(!filterClean)}
              style={{
                padding: "8px 12px",
                background: filterClean ? "#2563eb" : "#e5e7eb",
                color: filterClean ? "#fff" : "#000",
                borderRadius: 8,
                border: "none",
              }}
            >
              Clean Only
            </button>

            <button
              onClick={() => setFilterFree(!filterFree)}
              style={{
                padding: "8px 12px",
                background: filterFree ? "#10b981" : "#e5e7eb",
                color: filterFree ? "#fff" : "#000",
                borderRadius: 8,
                border: "none",
              }}
            >
              Free Only
            </button>
          </div>

          <div style={{ fontSize: 13, marginBottom: 12 }}>
            Showing <b>{filtered.length}</b> spots
          </div>

          {/* ADMIN ADD */}
          {isAdmin && (
            <form
              onSubmit={handleAddSpot}
              style={{
                background: "#f3f4f6",
                padding: 12,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <b>Add New Spot</b>

              <input
                placeholder="Name"
                value={newSpot.name}
                onChange={(e) =>
                  setNewSpot((s) => ({ ...s, name: e.target.value }))
                }
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 6,
                  border: "1px solid #ccc",
                  borderRadius: 6,
                }}
              />

              <input
                placeholder="Address"
                value={newSpot.address}
                onChange={(e) =>
                  setNewSpot((s) => ({ ...s, address: e.target.value }))
                }
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 6,
                  border: "1px solid #ccc",
                  borderRadius: 6,
                }}
              />

              <select
                value={newSpot.category}
                onChange={(e) =>
                  setNewSpot((s) => ({ ...s, category: e.target.value }))
                }
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 6,
                  borderRadius: 6,
                }}
              >
                <option>Public Toilet</option>
                <option>Hospital</option>
                <option>Hotel</option>
                <option>Petrol Pump</option>
                <option>Cafe</option>
                <option>Railway Station</option>
                <option>Bus Stand</option>
                <option>College</option>
              </select>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: 10,
                  padding: 8,
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Save Spot
              </button>
            </form>
          )}

          {/* SPOT LIST */}
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedSpot(p)}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <b>{p.name}</b> <CleanBadge level={p.level} />
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>{p.address}</div>
                <div style={{ fontSize: 12 }}>
                  {p.verified ? "🟢 Verified" : "❌ Unverified"} • Clean:{" "}
                  {p.clean} • Free: {p.free}
                </div>

                {isAdmin && (
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVerify(p.id);
                      }}
                      style={{
                        padding: "2px 6px",
                        background: p.verified ? "#f97316" : "#22c55e",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                    >
                      {p.verified ? "Unverify" : "Verify"}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSpot(p.id);
                      }}
                      style={{
                        padding: "2px 6px",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div style={{ fontSize: 13 }}>
                {p.distance ? p.distance.toFixed(1) + " km" : "..."}
              </div>
            </div>
          ))}
        </div>

        {/* MAP */}
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 12,
            height: "85vh",
          }}
        >
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={12}
            style={{ height: "100%", borderRadius: 12 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <MapFlyTo selectedSpot={selectedSpot} />

            {filtered.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <b>{p.name}</b> <br />
                  <CleanBadge level={p.level} /> <br />
                  {p.address} <br />
                  Clean: {p.clean} <br />
                  Free: {p.free} <br />
                  {p.verified ? "🟢 Verified" : "❌ Unverified"}
                  <br />
                  <br />
                  <a
                    href={`https://www.google.com/maps?q=${p.lat},${p.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
