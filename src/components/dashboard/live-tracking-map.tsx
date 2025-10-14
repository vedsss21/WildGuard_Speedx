"use client";

import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { PawPrint, Rabbit, Bird } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const getAnimalIcon = (animal: string) => {
    let icon;
    let color;
    switch(animal) {
        case 'Leopard':
            icon = <PawPrint className="h-6 w-6" />;
            color = '#f59e0b'; // Amber-500
            break;
        case 'Elephant':
            icon = <Rabbit className="h-6 w-6" />; // Placeholder, no elephant icon
            color = '#64748b'; // Slate-500
            break;
        case 'Bird':
            icon = <Bird className="h-6 w-6" />;
            color = '#3b82f6'; // Blue-500
            break;
        default:
            icon = <PawPrint className="h-6 w-6" />;
            color = '#10b981'; // Emerald-500
            break;
    }

    const iconHtml = ReactDOMServer.renderToString(
        <div style={{ color: color }}>
          {icon}
        </div>
      );
      
      return L.divIcon({
        html: iconHtml,
        className: 'bg-transparent border-0',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
};


const initialAnimalData = [
    { id: 'leo1', type: 'Leopard', lat: 19.0760, lng: 72.8777 },
    { id: 'ele1', type: 'Elephant', lat: 19.08, lng: 72.88 },
    { id: 'bird1', type: 'Bird', lat: 19.07, lng: 72.87 },
]

export default function LiveTrackingMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});
    const [animals, setAnimals] = useState(initialAnimalData);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) { 
            mapRef.current = L.map(mapContainerRef.current).setView([19.0760, 72.8777], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            animals.forEach(animal => {
                const marker = L.marker([animal.lat, animal.lng], { icon: getAnimalIcon(animal.type) })
                    .addTo(mapRef.current!)
                    .bindPopup(`<b>${animal.type}</b><br>ID: ${animal.id}`);
                markersRef.current[animal.id] = marker;
            });
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimals(prevAnimals => 
                prevAnimals.map(animal => ({
                    ...animal,
                    lat: animal.lat + (Math.random() - 0.5) * 0.001,
                    lng: animal.lng + (Math.random() - 0.5) * 0.001,
                }))
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        animals.forEach(animal => {
            const marker = markersRef.current[animal.id];
            if (marker) {
                marker.setLatLng([animal.lat, animal.lng]);
            }
        });
    }, [animals]);

    return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
}
