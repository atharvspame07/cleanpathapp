// App.js — CleanPath v2.0 (80 Real Spots + Sponsored + Save + Blue Header)

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

const PUBLIC_LOGO = process.env.PUBLIC_URL + "/CP.png";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ----------------------------------------------------
   🥇 CleanBadge (EMOJI ONLY)
---------------------------------------------------- */
function CleanBadge({ level }) {
  const icons = { gold: "🥇", silver: "🥈", bronze: "🥉" };
  return (
    <span style={{ marginLeft: 4, fontSize: 18 }}>
      {icons[level]}
    </span>
  );
}

/* ----------------------------------------------------
   FLY TO SPOT
---------------------------------------------------- */
function MapFlyTo({ selected }) {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 17, {
        duration: 1.2,
      });
    }
    // eslint-disable-next-line 
  }, [selected]);

  return null;
}

/* ----------------------------------------------------
   DISTANCE FUNCTION
---------------------------------------------------- */
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

/* ----------------------------------------------------
   80 REAL SPOTS (Paste your spots 1–80 below)
---------------------------------------------------- */

const initialSpots = [
   { id: 1, name: "Parbhani Railway Station Washroom", category: "Railway Station", address: "Station Road", lat: 19.266889, lng: 76.76767, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 2, name: "Parbhani Bus Stand Public Toilet", category: "Bus Stand", address: "Bus Stand, Parbhani", lat: 19.26045, lng: 76.77391, level: "bronze", clean: "No", free: "Yes", verified: true },
  { id: 3, name: "Hotel President Washroom", category: "Hotel", address: "Railway Station Road", lat: 19.266321, lng: 76.76884, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 4, name: "Hotel Ajanta Washroom", category: "Hotel", address: "National Highway", lat: 19.247091, lng: 76.760114, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 5, name: "Hotel Nisarg Washroom", category: "Hotel", address: "Jintur Road", lat: 19.2676, lng: 76.77602, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 6, name: "Sai Café Washroom", category: "Cafe", address: "Station Road", lat: 19.265552, lng: 76.76999, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 7, name: "Golai Public Toilet", category: "Public Toilet", address: "Golai Area", lat: 19.264991, lng: 76.77342, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 8, name: "Indian Oil Petrol Pump Washroom", category: "Petrol Pump", address: "Gangakhed Road", lat: 19.261248, lng: 76.763609, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 9, name: "HP Petrol Pump Washroom", category: "Petrol Pump", address: "Jintur Road", lat: 19.27114, lng: 76.777401, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 10, name: "Bharat Petroleum Basmat Road Washroom", category: "Petrol Pump", address: "Basmat Road", lat: 19.268281, lng: 76.781221, level: "gold", clean: "Yes", free: "Yes", verified: true },

  { id: 11, name: "Civil Hospital Public Washroom", category: "Hospital", address: "Civil Hospital Road", lat: 19.261504, lng: 76.771283, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 12, name: "Lotus Hospital Washroom", category: "Hospital", address: "Sangvi Road", lat: 19.25998, lng: 76.767102, level: "gold", clean: "Yes", free: "Yes", verified: true },
  { id: 13, name: "Global Hospital Washroom", category: "Hospital", address: "Jintur Naka", lat: 19.270901, lng: 76.774882, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 14, name: "CIDCO Market Public Toilet", category: "Public Toilet", address: "CIDCO Market", lat: 19.254891, lng: 76.770212, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 15, name: "City Mall Washroom", category: "Mall", address: "Sangvi Road", lat: 19.258821, lng: 76.768821, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 16, name: "Nehru Garden Public Toilet", category: "Public Toilet", address: "Nehru Garden", lat: 19.262312, lng: 76.772903, level: "silver", clean: "Yes", free: "Yes", verified: false },
  { id: 17, name: "Hotel Skylark Washroom", category: "Hotel", address: "Sangvi Road", lat: 19.257302, lng: 76.769114, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 18, name: "Cafe Coffee Spot Washroom", category: "Cafe", address: "MG Road", lat: 19.265204, lng: 76.77222, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 19, name: "Shivneri Public Toilet", category: "Public Toilet", address: "Shivaji Nagar", lat: 19.268412, lng: 76.770772, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 20, name: "HP Pump Washroom – Gangakhed Road", category: "Petrol Pump", address: "Gangakhed Naka", lat: 19.261112, lng: 76.76452, level: "silver", clean: "Yes", free: "Yes", verified: true },

  { id: 21, name: "Hotel Yatri Niwas Washroom", category: "Hotel", address: "Basmat Road", lat: 19.264312, lng: 76.779102, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 22, name: "Sai Garden Public Toilet", category: "Public Toilet", address: "Sai Garden", lat: 19.269012, lng: 76.77345, level: "silver", clean: "Yes", free: "Yes", verified: false },
  { id: 23, name: "Galaxy Hospital Washroom", category: "Hospital", address: "Zilla Parishad Road", lat: 19.260912, lng: 76.770229, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 24, name: "Cafe Midtown Washroom", category: "Cafe", address: "Market Road", lat: 19.263302, lng: 76.77155, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 25, name: "Hotel Shubham Palace Washroom", category: "Hotel", address: "Sangvi Naka", lat: 19.259782, lng: 76.766602, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 26, name: "Public Toilet – Industrial Area", category: "Public Toilet", address: "MIDC", lat: 19.250812, lng: 76.77592, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 27, name: "Indian Oil Pump Washroom – Jintur Road", category: "Petrol Pump", address: "Jintur Naka", lat: 19.27222, lng: 76.776812, level: "gold", clean: "Yes", free: "Yes", verified: true },
  { id: 28, name: "City Hospital Washroom", category: "Hospital", address: "MG Road", lat: 19.2671, lng: 76.7729, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 29, name: "Sunrise Café Washroom", category: "Cafe", address: "Railway Station Road", lat: 19.26652, lng: 76.76922, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 30, name: "Hotel Rajkamal Washroom", category: "Hotel", address: "Market Road", lat: 19.264812, lng: 76.771902, level: "silver", clean: "Yes", free: "No", verified: true },

  { id: 31, name: "Public Toilet – Sangvi Road", category: "Public Toilet", address: "Sangvi Road", lat: 19.258112, lng: 76.769312, level: "silver", clean: "Yes", free: "Yes", verified: false },
  { id: 32, name: "Hotel Tanmay Residency Washroom", category: "Hotel", address: "CIDCO", lat: 19.255782, lng: 76.770912, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 33, name: "Indian Oil Pump – Basmat Road", category: "Petrol Pump", address: "Basmat Road", lat: 19.268922, lng: 76.781902, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 34, name: "Hotel Greenpark Washroom", category: "Hotel", address: "Jintur Road", lat: 19.270501, lng: 76.775221, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 35, name: "Cafe Aroma Washroom", category: "Cafe", address: "MG Road", lat: 19.263902, lng: 76.772002, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 36, name: "District Court Public Toilet", category: "Public Toilet", address: "Court Area", lat: 19.259312, lng: 76.770112, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 37, name: "HP Pump – Selu Road Washroom", category: "Petrol Pump", address: "Selu Road", lat: 19.247912, lng: 76.76452, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 38, name: "Vighnaharta Hospital Washroom", category: "Hospital", address: "MIDC Road", lat: 19.251412, lng: 76.776102, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 39, name: "Cafe Royal Washroom", category: "Cafe", address: "Railway Road", lat: 19.266711, lng: 76.770312, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 40, name: "Hotel Maharaja Washroom", category: "Hotel", address: "Sangvi", lat: 19.259002, lng: 76.767602, level: "silver", clean: "Yes", free: "No", verified: true },

  { id: 41, name: "Nagar Parishad Toilet – Railway Flyover", category: "Public Toilet", address: "Flyover Road", lat: 19.267661, lng: 76.769882, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 42, name: "HP Pump – Market Road", category: "Petrol Pump", address: "Market Road", lat: 19.264212, lng: 76.771912, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 43, name: "Parbhani Medical College Washroom", category: "Hospital", address: "Medical College", lat: 19.257712, lng: 76.769702, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 44, name: "Cafe 9th Street Washroom", category: "Cafe", address: "MG Road", lat: 19.263301, lng: 76.77181, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 45, name: "Hotel Rajdhani Washroom", category: "Hotel", address: "Bus Stand Road", lat: 19.260911, lng: 76.773321, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 46, name: "Swachh Toilet – Fish Market", category: "Public Toilet", address: "Fish Market", lat: 19.265412, lng: 76.773902, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 47, name: "Indian Oil Pump – Jintur Naka", category: "Petrol Pump", address: "Jintur Naka", lat: 19.271512, lng: 76.775801, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 48, name: "Shivam Hospital Washroom", category: "Hospital", address: "CIDCO", lat: 19.255122, lng: 76.770522, level: "gold", clean: "Yes", free: "Yes", verified: true },
  { id: 49, name: "Coffee Culture Washroom", category: "Cafe", address: "Station Road", lat: 19.265701, lng: 76.770122, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 50, name: "Hotel Reeva Palace Washroom", category: "Hotel", address: "Basmat Road", lat: 19.269902, lng: 76.78012, level: "silver", clean: "Yes", free: "No", verified: true },

  { id: 51, name: "Public Toilet – Weekly Market", category: "Public Toilet", address: "Weekly Market", lat: 19.261722, lng: 76.772612, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 52, name: "IOCL Pump – Selu Naka", category: "Petrol Pump", address: "Selu Naka", lat: 19.248512, lng: 76.765812, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 53, name: "LifeCare Hospital Washroom", category: "Hospital", address: "Gangakhed Road", lat: 19.259402, lng: 76.76391, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 54, name: "Café Bliss Washroom", category: "Cafe", address: "CIDCO", lat: 19.255902, lng: 76.770612, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 55, name: "Hotel Blue Diamond Washroom", category: "Hotel", address: "Market Road", lat: 19.264102, lng: 76.77202, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 56, name: "Public Toilet – Shahu College Road", category: "Public Toilet", address: "Shahu College", lat: 19.271212, lng: 76.77212, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 57, name: "HP Pump – Sangvi Phata", category: "Petrol Pump", address: "Sangvi Phata", lat: 19.258102, lng: 76.767322, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 58, name: "CarePlus Hospital Washroom", category: "Hospital", address: "Basmat Road", lat: 19.267902, lng: 76.781122, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 59, name: "Café Urban Street Washroom", category: "Cafe", address: "Station Road", lat: 19.266112, lng: 76.77091, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 60, name: "Hotel Royal Inn Washroom", category: "Hotel", address: "CIDCO Road", lat: 19.255712, lng: 76.770012, level: "silver", clean: "Yes", free: "No", verified: true },

  { id: 61, name: "MIDC Public Toilet", category: "Public Toilet", address: "MIDC", lat: 19.250212, lng: 76.776502, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 62, name: "HP Pump – NH 222", category: "Petrol Pump", address: "Highway", lat: 19.245812, lng: 76.760912, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 63, name: "Nirmal Hospital Washroom", category: "Hospital", address: "MG Road", lat: 19.263712, lng: 76.772602, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 64, name: "Cafe City Brew Washroom", category: "Cafe", address: "Golai", lat: 19.264712, lng: 76.773222, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 65, name: "Hotel Metro Plaza Washroom", category: "Hotel", address: "Station Road", lat: 19.266212, lng: 76.769212, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 66, name: "Public Toilet – Gandhi Market", category: "Public Toilet", address: "Gandhi Market", lat: 19.263422, lng: 76.772712, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 67, name: "IOCL Pump – Gangakhed Road", category: "Petrol Pump", address: "Gangakhed Road", lat: 19.261922, lng: 76.763322, level: "gold", clean: "Yes", free: "Yes", verified: true },
  { id: 68, name: "Sparsh Hospital Washroom", category: "Hospital", address: "CIDCO", lat: 19.255302, lng: 76.770112, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 69, name: "Cafe Express Washroom", category: "Cafe", address: "Market Road", lat: 19.264212, lng: 76.771712, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 70, name: "Hotel Amar Palace Washroom", category: "Hotel", address: "Basmat Road", lat: 19.268912, lng: 76.780712, level: "silver", clean: "Yes", free: "No", verified: true },

  { id: 71, name: "Public Toilet – Zilla Parishad", category: "Public Toilet", address: "Z.P. Office", lat: 19.260412, lng: 76.771112, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 72, name: "HP Pump – Jintur Road", category: "Petrol Pump", address: "Jintur Road", lat: 19.270412, lng: 76.775712, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 73, name: "Gokul Hospital Washroom", category: "Hospital", address: "Midc Road", lat: 19.251812, lng: 76.776112, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 74, name: "Cafe Royal Bakes Washroom", category: "Cafe", address: "Station Road", lat: 19.266302, lng: 76.769802, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 75, name: "Hotel Landmark Washroom", category: "Hotel", address: "CIDCO", lat: 19.255902, lng: 76.770312, level: "silver", clean: "Yes", free: "No", verified: true },
  { id: 76, name: "Public Toilet – Kadam Hospital Road", category: "Public Toilet", address: "Kadam Road", lat: 19.262512, lng: 76.771602, level: "bronze", clean: "No", free: "Yes", verified: false },
  { id: 77, name: "IOCL Pump – Highway Junction", category: "Petrol Pump", address: "NH 222", lat: 19.245912, lng: 76.762122, level: "gold", clean: "Yes", free: "Yes", verified: true },
  { id: 78, name: "Suyash Hospital Washroom", category: "Hospital", address: "Sangvi Road", lat: 19.257112, lng: 76.769012, level: "silver", clean: "Yes", free: "Yes", verified: true },
  { id: 79, name: "Cafe Fresh Brew Washroom", category: "Cafe", address: "Golai Road", lat: 19.265012, lng: 76.773012, level: "gold", clean: "Yes", free: "No", verified: true },
  { id: 80, name: "Hotel White House Washroom", category: "Hotel", address: "Station Road", lat: 19.266512, lng: 76.769312, level: "silver", clean: "Yes", free: "No", verified: true }
];

/* ----------------------------------------------------
   MAIN APP
---------------------------------------------------- */
export default function App() {
  const [spots, setSpots] = useState(initialSpots);
  const [query, setQuery] = useState("");
  const [filterClean, setFilterClean] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [userLoc, setUserLoc] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ----------------------------
     LOAD saved spots
  ---------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("cleanpath-spots");
    if (saved) setSpots(JSON.parse(saved));
  }, []);

  /* ----------------------------
     SAVE whenever spots change
  ---------------------------- */
  useEffect(() => {
    localStorage.setItem("cleanpath-spots", JSON.stringify(spots));
  }, [spots]);

  /* ----------------------------
     SPLASH SCREEN
  ---------------------------- */
  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  /* ----------------------------
     USER LOCATION
  ---------------------------- */
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

  /* ----------------------------
     ADMIN LOGIN
  ---------------------------- */
  const handleAdminLogin = () => {
    const pin = prompt("Enter Admin PIN:");
    if (pin === "1234") {
      setIsAdmin(true);
      alert("Admin Mode Activated");
    } else alert("Wrong PIN");
  };

  /* ----------------------------
     ADD NEW SPOT
  ---------------------------- */
  const [newSpot, setNewSpot] = useState({
    name: "",
    address: "",
    category: "Public Toilet",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSpot.name || !newSpot.address)
      return alert("Enter name & address");

    const offset = Math.random() * 0.002 - 0.001;
    const level = ["gold", "silver", "bronze"][
      Math.floor(Math.random() * 3)
    ];

    const spot = {
      id: Date.now(),
      ...newSpot,
      lat: userLoc.lat + offset,
      lng: userLoc.lng + offset,
      level,
      clean: level === "bronze" ? "No" : "Yes",
      free: "Yes",
      verified: true,
      sponsored: false,
    };

    setSpots((prev) => [...prev, spot]);
    setNewSpot({ name: "", address: "", category: "Public Toilet" });
  };

  /* ----------------------------
     FILTERING
  ---------------------------- */
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
    .sort((a, b) => {
      if (a.sponsored && !b.sponsored) return -1;
      if (!a.sponsored && b.sponsored) return 1;
      return (a.distance ?? 9999) - (b.distance ?? 9999);
    });

  const center = userLoc || { lat: 19.27, lng: 76.77 };

  /* ----------------------------------------------------
     SPLASH SCREEN
  ---------------------------------------------------- */
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
        <img src={PUBLIC_LOGO} alt="logo" style={{ width: 300 }} />
      </div>
    );

  /* ----------------------------------------------------
     MAIN UI
  ---------------------------------------------------- */
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
{/* WHITE HEADER WITH BLUE TITLE */}
<header
  style={{
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    color: "black",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <img
      src={PUBLIC_LOGO}
      alt="logo"
      style={{
        width: 80,
        filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
      }}
    />

    {/* CleanPath text BLUE */}
    <h1 style={{ margin: 0, fontSize: 26, color: "#2563eb" }}>CleanPath</h1>
  </div>

  <button
    onClick={handleAdminLogin}
    style={{
      padding: "8px 14px",
      borderRadius: 8,
      border: "2px solid #2563eb",
      background: isAdmin ? "#2563eb" : "white",
      color: isAdmin ? "white" : "#2563eb",
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    {isAdmin ? "Admin ✔" : "Admin Login"}
  </button>
</header>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 16,
          padding: 16,
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "white",
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
            placeholder="Search spots…"
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
                borderRadius: 8,
                border: "none",
                background: filterClean ? "#2563eb" : "#e5e7eb",
                color: filterClean ? "white" : "black",
              }}
            >
              Clean Only
            </button>

            <button
              onClick={() => setFilterFree(!filterFree)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                background: filterFree ? "#16a34a" : "#e5e7eb",
                color: filterFree ? "white" : "black",
              }}
            >
              Free Only
            </button>
          </div>

          <div style={{ fontSize: 13, marginBottom: 12 }}>
            Showing <b>{filtered.length}</b> spots
          </div>

          {/* ADMIN ADD NEW SPOT */}
          {isAdmin && (
            <form
              onSubmit={handleAdd}
              style={{
                background: "#f3f4f6",
                padding: 12,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <h4>Add New Spot</h4>

              <input
                placeholder="Name"
                value={newSpot.name}
                onChange={(e) =>
                  setNewSpot((s) => ({ ...s, name: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: 6,
                  marginBottom: 6,
                  borderRadius: 6,
                  border: "1px solid #bbb",
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
                  padding: 6,
                  marginBottom: 6,
                  borderRadius: 6,
                  border: "1px solid #bbb",
                }}
              />

              <select
                value={newSpot.category}
                onChange={(e) =>
                  setNewSpot((s) => ({ ...s, category: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: 6,
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  marginBottom: 6,
                }}
              >
                <option>Public Toilet</option>
                <option>Hotel</option>
                <option>Petrol Pump</option>
                <option>Cafe</option>
                <option>Hospital</option>
                <option>Bus Stand</option>
                <option>Railway Station</option>
              </select>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: 8,
                  background: "#2563eb",
                  border: "none",
                  borderRadius: 6,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Add Spot
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <b>{p.name}</b>
                  <CleanBadge level={p.level} />
                  {p.sponsored && (
                    <span style={{ color: "#1d4ed8", marginLeft: 6 }}>
                      ⭐ Sponsored
                    </span>
                  )}
                </div>

                <div style={{ fontSize: 12, color: "#666" }}>
                  {p.address}
                </div>

                <div style={{ fontSize: 12 }}>
                  {p.verified ? "🟢 Verified" : "❌ Unverified"} • Free:{" "}
                  {p.free}
                </div>

                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    {/* VERIFY */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpots((s) =>
                          s.map((x) =>
                            x.id === p.id
                              ? { ...x, verified: !x.verified }
                              : x
                          )
                        );
                      }}
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        border: "none",
                        background: p.verified ? "#f97316" : "#16a34a",
                        color: "white",
                        fontSize: 11,
                      }}
                    >
                      {p.verified ? "Unverify" : "Verify"}
                    </button>

                    {/* SPONSORED */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpots((s) =>
                          s.map((x) =>
                            x.id === p.id
                              ? { ...x, sponsored: !x.sponsored }
                              : x
                          )
                        );
                      }}
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        border: "none",
                        background: p.sponsored ? "#1d4ed8" : "#e5e7eb",
                        color: p.sponsored ? "white" : "black",
                        fontSize: 11,
                      }}
                    >
                      {p.sponsored ? "Un-Sponsor" : "Sponsor"}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Delete this spot?")) {
                          setSpots((s) =>
                            s.filter((x) => x.id !== p.id)
                          );
                        }
                      }}
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        border: "none",
                        background: "#ef4444",
                        color: "white",
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
            background: "white",
            padding: 16,
            borderRadius: 12,
            height: "85vh",
          }}
        >
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            style={{ height: "100%", borderRadius: 12 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <MapFlyTo selected={selectedSpot} />

            {filtered.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <b>{p.name}</b> <br />
                  <CleanBadge level={p.level} />
                  <br />
                  {p.address} <br />
                  Clean: {p.clean} <br />
                  Free: {p.free} <br />
                  {p.verified ? "🟢 Verified" : "❌ Unverified"}
                  <br />
                  {p.sponsored && "🔥 Sponsored"} <br />
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
