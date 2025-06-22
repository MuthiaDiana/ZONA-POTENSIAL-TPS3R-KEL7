// Inisialisasi peta dengan fokus di Kabupaten Lampung Selatan
const map = L.map('map').setView([-5.735, 105.595], 11);

// Tambahkan tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable untuk menyimpan radius circle yang aktif
let activeRadius = null;

// Data lokasi pengelolaan sampah dengan alamat lengkap
const wasteLocations = [
    {name: "TPS Natar", lat: -5.286733593, lng: 105.2066961, type: "tps", icon: "trash", address: "Jl. Tj. Waras, Kec. Natar, Kab. Lampung Selatan"},
    {name: "TPS Penengahan", lat: -5.771438523, lng: 105.7004218, type: "tps", icon: "trash", address: "Penengahan, Kec. Penengahan, Kab. Lampung Selatan"},
    {name: "TPS Pasar Palas Jaya", lat: -5.66161752447374, lng: 105.660036039272, type: "tps", icon: "trash", address: "Tj. Sari, Kec. Palas, Kab. Lampung Selatan"},
    {name: "TPA Lubuk Kamal", lat: -5.682079264002888, lng: 105.6167385, type: "tpa", icon: "trash", address: "Canggu, Kec. Kalianda, Kab. Lampung Selatan"},
    {name: "TPA Karang Anyar", lat: -5.320370754, lng: 105.2965998, type: "tpa", icon: "trash", address: "Karang Anyar, Kec. Jati Agung, Kab. Lampung Selatan"},
    {name: "Bank Sampah Mutiara Jaya", lat: -5.317018305, lng: 105.3780732, type: "bank", icon: "home", address: "Gedung Agung, Kec. Jati Agung, Kab. Lampung Selatan"},
    {name: "Bank Sampah Babul Hikmah", lat: -5.3263168, lng: 105.1864456, type: "bank", icon: "home", address: "Perum, Sohibanila, Kec. Natar, Kab. Lampung Selatan"},
    {name: "Bank Sampah Sahabat Gajah", lat: -5.35699030614617, lng: 105.301806695832, type: "bank", icon: "home", address: "Jl. Airan Raya, Way Huwi, Lampung Selatan, Kab. Lampung Selatan"},
    {name: "Bank Sampah Kertabumi", lat: -5.35617730838066, lng: 105.305583302949, type: "bank", icon: "home", address: "Way Huwi, Kec. Jati Agung, Kab. Lampung Selatan"},
    {name: "Bank Sampah Aksara", lat: -5.61916262273923, lng: 105.63236213988, type: "bank", icon: "home", address: "Bumi Daya, Kec. Palas, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 1", lat: -5.83189, lng: 105.63647, type: "tps3r", icon: "recycle", address: "Waymuli, Kec. Rajabasa, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 3", lat: -5.74299, lng: 105.60527, type: "tps3r", icon: "recycle", address: "Canggu, Kec. Kalianda, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 4", lat: -5.69822, lng: 105.62004, type: "tps3r", icon: "recycle", address: "Karang Raja, Kec. Merbau Mataram, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 5", lat: -5.47687, lng: 105.38079, type: "tps3r", icon: "recycle", address: "Mekar Jaya, Kec. Merbau Mataram, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 6", lat: -5.50914, lng: 105.39128, type: "tps3r", icon: "recycle", address: "Pardasuka, Kec. Katibung, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 7", lat: -5.5178, lng: 105.42538, type: "tps3r", icon: "recycle", address: "Rejomulyo, Kec. Jati Agung Kab.Lampung Selatan"},
    {name: "Zona Potensial TPS3R 8", lat: -5.27196, lng: 105.33041, type: "tps3r", icon: "recycle", address: "Kec. Tj. Bintang, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 9", lat: -5.37141, lng: 105.33368, type: "tps3r", icon: "recycle", address: "Gedung Agung, Kec. Jati Agung, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 11", lat: -5.32169, lng: 105.38095, type: "tps3r", icon: "recycle", address: "Sukabanjar, Kec. Sidomulyo, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 12", lat: -5.49874, lng: 105.47397, type: "tps3r", icon: "recycle", address: "Kec. Ketapang, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 14", lat: -5.59033, lng: 105.4809, type: "tps3r", icon: "recycle", address: "Sido Mekar, Kec. Katibung, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 16", lat: -5.75101, lng: 105.75753, type: "tps3r", icon: "recycle", address: "Sumur Kumbang, Kec. Kalianda, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 18", lat: -5.56205, lng: 105.56865, type: "tps3r", icon: "recycle", address: "Balinuraga, Kec. Way Panji, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 19", lat: -5.57964, lng: 105.42877, type: "tps3r", icon: "recycle", address: "Neglasari, Kec. Katibung, Kab. Lampung Selatan"},
    {name: "Zona Potensial TPS3R 20", lat: -5.45755, lng: 105.34634, type: "tps3r", icon: "recycle", address: "Tj. Baru, Kec. Merbau Mataram, Kab. Lampung Selatan"},
];

// Fungsi untuk mendapatkan ikon berdasarkan tipe lokasi
function getIcon(type) {
    let iconColor, iconClass;
    
    switch(type) {
        case "tps":
            iconColor = "#e74c3c";
            iconClass = "fas fa-trash-alt";
            break;
        case "tpa":
            iconColor = "#f39c12";
            iconClass = "fas fa-trash-alt";
            break;
        case "bank":
            iconColor = "#2ecc71";
            iconClass = "fas fa-home";
            break;
        case "tps3r":
            iconColor = "#3498db";
            iconClass = "fas fa-recycle";
            break;
        default:
            iconColor = "#9b59b6";
            iconClass = "fas fa-map-marker-alt";
    }
    
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background: ${iconColor}; 
                    width: 30px; 
                    height: 30px; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    border: 2px solid white;
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);">
                <i class="${iconClass}" style="color: white; font-size: 14px;"></i>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Fungsi untuk membuat radius circle untuk TPS3R
function createTPS3RRadius(lat, lng, name) {
    // Hapus radius yang aktif sebelumnya
    if (activeRadius) {
        map.removeLayer(activeRadius);
    }
    
    // Buat radius circle baru
    activeRadius = L.circle([lat, lng], {
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.2,
        radius: 200, // 200 meter radius
        weight: 2,
        opacity: 0.8,
        dashArray: '5, 5' // Garis putus-putus
    }).addTo(map);
    
    // Tambahkan popup untuk radius
    activeRadius.bindPopup(`
        <div style="text-align: center;">
            <div style="font-weight: bold; color: #3498db; margin-bottom: 8px;">
                <i class="fas fa-bullseye" style="margin-right: 5px;"></i>
                Zona Layanan TPS3R
            </div>
            <div style="margin-bottom: 5px;"><strong>Lokasi:</strong> ${name}</div>
            <div style="margin-bottom: 5px;"><strong>Radius:</strong> 200 meter</div>
            <div style="font-size: 0.9em; color: #666;">
                Area cakupan layanan pengelolaan sampah
            </div>
        </div>
    `);
    
    // Zoom ke area radius
    map.fitBounds(activeRadius.getBounds(), { padding: [20, 20] });
}

const allMarkers = []; // untuk menyimpan semua marker
// Tambahkan marker untuk setiap lokasi
wasteLocations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], {
        icon: getIcon(location.type)
    }).addTo(map);
    
    // Simpan tipe lokasi di marker agar bisa difilter nanti
    marker._type = location.type;

    // Simpan ke array global
    allMarkers.push(marker);

    // Fungsi untuk mendapatkan ikon Font Awesome berdasarkan tipe
    function getPopupIcon(type) {
        switch(type) {
            case "tps":
                return '<i class="fas fa-trash-alt" style="color: #e74c3c; margin-right: 8px;"></i>';
            case "tpa":
                return '<i class="fas fa-trash-alt" style="color: #f39c12; margin-right: 8px;"></i>';
            case "bank":
                return '<i class="fas fa-home" style="color: #2ecc71; margin-right: 8px;"></i>';
            case "tps3r":
                return '<i class="fas fa-recycle" style="color: #3498db; margin-right: 8px;"></i>';
            default:
                return '<i class="fas fa-map-marker-alt" style="color: #95a5a6; margin-right: 8px;"></i>';
        }
    }
    
    // Fungsi untuk mendapatkan nama tipe yang lebih deskriptif
    function getTypeDescription(type) {
        switch(type) {
            case "tps":
                return "Tempat Penampungan Sementara";
            case "tpa":
                return "Tempat Pemrosesan Akhir";
            case "bank":
                return "Bank Sampah";
            case "tps3r":
                return "Zona Potensial TPS3R (Reduce, Reuse, Recycle)";
            default:
                return type.toUpperCase();
        }
    }
    
    // Buat konten popup
    let popupContent = `
        <div style="min-width: 250px; font-family: 'Poppins', sans-serif;">
            <div style="font-weight: bold; font-size: 1.2rem; color: #2c3e50; margin-bottom: 10px; display: flex; align-items: center;">
                ${getPopupIcon(location.type)}
                ${location.name}
            </div>
            
            <div style="border-left: 3px solid ${location.type === 'tpa' ? '#f39c12' : location.type === 'tps' ? '#e74c3c' : location.type === 'bank' ? '#2ecc71' : '#3498db'}; padding-left: 10px; margin-bottom: 10px;">
                <div style="margin-bottom: 5px;">
                    <strong style="color: #34495e;">Tipe:</strong> 
                    <span style="color: #7f8c8d;">${getTypeDescription(location.type)}</span>
                </div>
                
                <div style="margin-bottom: 5px;">
                    <strong style="color: #34495e;">Koordinat:</strong> 
                    <span style="color: #7f8c8d; font-family: monospace;">${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}</span>
                </div>
                
                ${location.address ? `
                <div style="margin-bottom: 8px;">
                    <strong style="color: #34495e;">Alamat:</strong> 
                    <span style="color: #7f8c8d;">${location.address}</span>
                </div>
                ` : ''}
            </div>
    `;
    
    // Tambahkan informasi khusus berdasarkan tipe lokasi
    if (location.type === 'tps3r') {
        popupContent += `
            <div style="background: linear-gradient(135deg, #e8f4fd, #d6eaf8); padding: 12px; border-radius: 8px; margin-top: 10px; border: 1px solid #3498db;">
                <div style="font-size: 0.9em; color: #2c3e50; display: flex; align-items: center; margin-bottom: 5px;">
                    <i class="fas fa-info-circle" style="color: #3498db; margin-right: 8px;"></i>
                    <strong>Zona Layanan TPS3R</strong>
                </div>
                <div style="font-size: 0.85em; color: #5d6d7e; margin-bottom: 8px;">
                    Klik marker ini untuk melihat zona layanan radius 200 meter
                </div>
                <div style="font-size: 0.8em; color: #7b7d7d; font-style: italic;">
                    💡 TPS3R: Tempat Pengolahan Sampah Reduce, Reuse, Recycle
                </div>
            </div>
        `;
    } else if (location.type === 'tpa') {
        popupContent += `
            <div style="background: linear-gradient(135deg, #fef9e7, #fcf3cf); padding: 12px; border-radius: 8px; margin-top: 10px; border: 1px solid #f39c12;">
                <div style="font-size: 0.9em; color: #2c3e50; display: flex; align-items: center; margin-bottom: 5px;">
                    <i class="fas fa-exclamation-triangle" style="color: #f39c12; margin-right: 8px;"></i>
                    <strong>Tempat Pemrosesan Akhir</strong>
                </div>
                <div style="font-size: 0.85em; color: #5d4e00;">
                    Lokasi pengolahan dan pembuangan akhir sampah
                </div>
            </div>
        `;
    } else if (location.type === 'bank') {
        popupContent += `
            <div style="background: linear-gradient(135deg, #e8f8f0, #d5f4e6); padding: 12px; border-radius: 8px; margin-top: 10px; border: 1px solid #2ecc71;">
                <div style="font-size: 0.9em; color: #2c3e50; display: flex; align-items: center; margin-bottom: 5px;">
                    <i class="fas fa-recycle" style="color: #2ecc71; margin-right: 8px;"></i>
                    <strong>Bank Sampah</strong>
                </div>
                <div style="font-size: 0.85em; color: #1e8449;">
                    Pusat pengumpulan dan pengolahan sampah berbasis masyarakat
                </div>
            </div>
        `;
    } else if (location.type === 'tps') {
        popupContent += `
            <div style="background: linear-gradient(135deg, #fdf2f2, #fadbd8); padding: 12px; border-radius: 8px; margin-top: 10px; border: 1px solid #e74c3c;">
                <div style="font-size: 0.9em; color: #2c3e50; display: flex; align-items: center; margin-bottom: 5px;">
                    <i class="fas fa-clock" style="color: #e74c3c; margin-right: 8px;"></i>
                    <strong>Tempat Penampungan Sementara</strong>
                </div>
                <div style="font-size: 0.85em; color: #922b21;">
                    Lokasi pengumpulan sampah sementara sebelum diangkut ke TPA
                </div>
            </div>
        `;
    }
    
    // Tambahkan tombol aksi
    popupContent += `
        <div style="margin-top: 15px; display: flex; gap: 8px;">
            <button onclick="getDirections(${location.lat}, ${location.lng})" 
                    style="flex: 1; background: linear-gradient(135deg, #3498db, #2980b9); color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85em; display: flex; align-items: center; justify-content: center; gap: 5px; transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(52,152,219,0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <i class="fas fa-route"></i> Rute
            </button>
            <button onclick="shareLocation('${location.name}', ${location.lat}, ${location.lng})" 
                    style="flex: 1; background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85em; display: flex; align-items: center; justify-content: center; gap: 5px; transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(46,204,113,0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <i class="fas fa-share-alt"></i> Bagikan
            </button>
        </div>
    `;
    
    popupContent += `</div>`;
    
    // Bind popup ke marker
    marker.bindPopup(popupContent, {
        maxWidth: 350,
        minWidth: 250,
        className: 'custom-popup'
    });
    
    // Tambahkan event listener khusus untuk TPS3R
    if (location.type === 'tps3r') {
        marker.on('click', function(e) {
            // Buka popup terlebih dahulu
            this.openPopup();
            
            // Tunggu sebentar lalu tampilkan radius
            setTimeout(() => {
                createTPS3RRadius(location.lat, location.lng, location.name);
            }, 300);
        });
    }
});

// Fungsi untuk mendapatkan rute (placeholder)
function getDirections(lat, lng) {
    // Buka Google Maps dengan arah ke lokasi
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// Fungsi untuk berbagi lokasi
function shareLocation(name, lat, lng) {
    const text = `Lokasi: ${name}\nKoordinat: ${lat}, ${lng}\nMaps: https://www.google.com/maps?q=${lat},${lng}`;
    
    if (navigator.share) {
        // Gunakan Web Share API jika tersedia
        navigator.share({
            title: 'Lokasi Pengelolaan Sampah',
            text: text,
            url: `https://www.google.com/maps?q=${lat},${lng}`
        }).catch(console.error);
    } else {
        // Fallback: copy ke clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Informasi lokasi telah disalin ke clipboard!');
        }).catch(() => {
            // Fallback untuk browser lama
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Informasi lokasi telah disalin ke clipboard!');
        });
    }
}

// Tambahkan CSS untuk styling popup yang lebih baik
const popupStyle = document.createElement('style');
popupStyle.textContent = `
    .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        border: 1px solid #e1e8ed !important;
    }
    
    .custom-popup .leaflet-popup-content {
        margin: 15px !important;
        line-height: 1.5 !important;
    }
    
    .custom-popup .leaflet-popup-tip {
        border-top-color: #ffffff !important;
    }
    
    .leaflet-popup-close-button {
        color: #7f8c8d !important;
        font-size: 18px !important;
        padding: 8px !important;
        transition: all 0.3s ease !important;
    }
    
    .leaflet-popup-close-button:hover {
        color: #e74c3c !important;
        transform: scale(1.1) !important;
    }
`;
document.head.appendChild(popupStyle);


// Event listener untuk klik pada peta (untuk menghilangkan radius)
map.on('click', function(e) {
    // Cek apakah yang diklik bukan marker
    if (e.originalEvent.target.className.indexOf('custom-icon') === -1) {
        if (activeRadius) {
            map.removeLayer(activeRadius);
            activeRadius = null;
        }
    }
});

// Event listener untuk item lokasi di panel
document.querySelectorAll('.location-item').forEach(item => {
    item.addEventListener('click', function() {
        const lat = parseFloat(this.dataset.lat);
        const lng = parseFloat(this.dataset.lng);
        
        // Animasi ke lokasi
        map.flyTo([lat, lng], 14, {
            animate: true,
            duration: 1.5
        });
        
        // Buka popup untuk marker di lokasi ini
        setTimeout(() => {
            const marker = findMarkerByLatLng(lat, lng);
            if (marker) {
                marker.openPopup();
                
                // Jika ini TPS3R, tampilkan radius juga
                const location = wasteLocations.find(loc => loc.lat === lat && loc.lng === lng);
                if (location && location.type === 'tps3r') {
                    setTimeout(() => {
                        createTPS3RRadius(lat, lng, location.name);
                    }, 500);
                }
            }
        }, 1600);
    });
});

// Fungsi untuk mencari marker berdasarkan lat lng
function findMarkerByLatLng(lat, lng) {
    let foundMarker = null;
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            const markerLat = layer.getLatLng().lat;
            const markerLng = layer.getLatLng().lng;
            if (Math.abs(markerLat - lat) < 0.0001 && Math.abs(markerLng - lng) < 0.0001) {
                foundMarker = layer;
            }
        }
    });
    return foundMarker;
}

// Event listener untuk reset view
document.getElementById('reset-view').addEventListener('click', function() {
    // Hapus radius aktif
    if (activeRadius) {
        map.removeLayer(activeRadius);
        activeRadius = null;
    }
    
    map.flyTo([-5.735, 105.595], 11, {
        animate: true,
        duration: 1.5
    });
});

// Event listener untuk fullscreen
document.getElementById('fullscreen').addEventListener('click', function() {
    const elem = document.getElementById('map');
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Variable untuk menyimpan marker dan circle lokasi pengguna
let userLocationMarker = null;
let userLocationCircle = null;

// Lokasi pengguna
document.getElementById('locate-me').addEventListener('click', function() {
    map.locate({setView: true, maxZoom: 15});
});

map.on('locationfound', function(e) {
    // Hapus marker dan circle lokasi sebelumnya jika ada
    if (userLocationMarker) {
        map.removeLayer(userLocationMarker);
    }
    if (userLocationCircle) {
        map.removeLayer(userLocationCircle);
    }
    
    // Buat marker lokasi pengguna
    userLocationMarker = L.marker(e.latlng, {
        icon: L.divIcon({
            className: 'user-location-icon',
            html: `<div style="background: #e74c3c; 
                        width: 20px; 
                        height: 20px; 
                        border-radius: 50%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        border: 3px solid white;
                        box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
                        animation: pulse 2s infinite;">
                    <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
                   </div>
                   <style>
                   @keyframes pulse {
                       0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
                       70% { box-shadow: 0 0 0 20px rgba(231, 76, 60, 0); }
                       100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
                   }
                   </style>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        })
    }).addTo(map);
    
    // Buat circle radius 200 meter
    userLocationCircle = L.circle(e.latlng, {
        color: '#e74c3c',
        fillColor: '#e74c3c',
        fillOpacity: 0.15,
        radius: 200, // 200 meter radius
        weight: 2,
        opacity: 0.8,
        dashArray: '5, 5'
    }).addTo(map);
    
    // Popup untuk lokasi pengguna
    userLocationMarker.bindPopup(`
        <div style="text-align: center;">
            <div style="font-weight: bold; color: #e74c3c; margin-bottom: 8px;">
                <i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i>
                Lokasi Anda
            </div>
            <div style="margin-bottom: 5px;"><strong>Koordinat:</strong> ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}</div>
            <div style="margin-bottom: 5px;"><strong>Akurasi:</strong> ±${Math.round(e.accuracy)} meter</div>
            <div style="margin-bottom: 8px;"><strong>Radius Tampilan:</strong> 200 meter</div>
            <div style="font-size: 0.9em; color: #666;">
                Area dalam radius 200m dari lokasi Anda
            </div>
        </div>
    `).openPopup();
    
    // Zoom ke area yang mencakup circle
    map.fitBounds(userLocationCircle.getBounds(), { padding: [20, 20] });
});

// Animasi background bubbles
function createBubbles() {
    const bubbles = document.querySelectorAll('.bg-bubbles li');
    bubbles.forEach((bubble, index) => {
        const randomSize = Math.random() * 80 + 20;
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 10;
        const randomDuration = Math.random() * 20 + 15;
        
        bubble.style.width = `${randomSize}px`;
        bubble.style.height = `${randomSize}px`;
        bubble.style.left = `${randomLeft}%`;
        bubble.style.animationDelay = `${randomDelay}s`;
        bubble.style.animationDuration = `${randomDuration}s`;
    });
}

createBubbles();

// Menambahkan efek pada tombol aksi
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.classList.contains('report') ? 'Laporan' : 'Penambahan';
        alert(`Fitur ${type} Lokasi akan segera tersedia!`);
    });
});

// Tambahkan kontrol untuk menampilkan/menyembunyikan semua radius TPS3R
const showAllRadiusBtn = document.createElement('button');
showAllRadiusBtn.className = 'map-btn';
showAllRadiusBtn.id = 'show-all-radius';
showAllRadiusBtn.innerHTML = '<i class="fas fa-bullseye"></i>';
showAllRadiusBtn.style.cssText = `
    position: absolute;
    top: 185px;
    right: 20px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    color: #3498db;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    font-size: 1.2rem;
`;

document.getElementById('map').appendChild(showAllRadiusBtn);


let allRadiusVisible = false;
let allRadiusCircles = [];

showAllRadiusBtn.addEventListener('click', function () {
    if (!allRadiusVisible) {
      // Tambah radius dan sembunyikan marker TPS3R
      wasteLocations.forEach(location => {
        if (location.type === 'tps3r') {
          const circle = L.circle([location.lat, location.lng], {
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 0.1,
            radius: 200,
            weight: 1,
            opacity: 0.6,
            dashArray: '3, 3'
          }).addTo(map);
          allRadiusCircles.push(circle);
        }
      });
  
      allMarkers.forEach(marker => {
        if (marker._type === 'tps3r') {
          map.removeLayer(marker);
        }
      });
  
      this.style.background = '#3498db';
      this.style.color = 'white';
      this.title = 'Sembunyikan Semua Zona TPS3R';
      allRadiusVisible = true;
  
    } else {
      // Hapus radius dan tampilkan lagi marker TPS3R
      allRadiusCircles.forEach(circle => map.removeLayer(circle));
      allRadiusCircles = [];
  
      allMarkers.forEach(marker => {
        if (marker._type === 'tps3r') {
          marker.addTo(map);
        }
      });
  
      this.style.background = 'rgba(255, 255, 255, 0.9)';
      this.style.color = '#3498db';
      this.title = 'Tampilkan Semua Zona TPS3R';
      allRadiusVisible = false;
    }
  });
  


// Hover effect untuk tombol
showAllRadiusBtn.addEventListener('mouseenter', function() {
    if (!allRadiusVisible) {
        this.style.background = '#3498db';
        this.style.color = 'white';
        this.style.transform = 'scale(1.1)';
    }
});

showAllRadiusBtn.addEventListener('mouseleave', function() {
    if (!allRadiusVisible) {
        this.style.background = 'rgba(255, 255, 255, 0.9)';
        this.style.color = '#3498db';
        this.style.transform = 'scale(1)';
    }
});


// Event listener untuk tombol laporkan masalah sampah
document.querySelector('.action-btn.report').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default
    window.open('https://dlh.lampungprov.go.id/pages/pengaduan-pelanggan?__cf_chl_tk=_rJ52Qal2e0QV4uLIiWbnx5gE6igMqvX7a__lxV6xY0-1750507609-1.0.1.1-.tVjre0vQCFOnu6SlkdTwYnA4Wg2UYt3Luwky10z2Rk', '_blank');
});

// Hapus event listener yang sudah ada untuk tombol report (jika ada)
const reportBtn = document.querySelector('.action-btn.report');
const newReportBtn = reportBtn.cloneNode(true);
reportBtn.parentNode.replaceChild(newReportBtn, reportBtn);

// Tambahkan event listener baru
newReportBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://dlh.lampungprov.go.id/pages/pengaduan-pelanggan?__cf_chl_tk=_rJ52Qal2e0QV4uLIiWbnx5gE6igMqvX7a__lxV6xY0-1750507609-1.0.1.1-.tVjre0vQCFOnu6SlkdTwYnA4Wg2UYt3Luwky10z2Rk', '_blank');
});