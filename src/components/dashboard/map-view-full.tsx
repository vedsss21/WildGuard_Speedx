"use client";

import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { recentIncidentsData } from '@/lib/data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from '@/contexts/language-context';

// Mock coordinates for incidents
const incidentLocations = [
    { lat: 18.5204, lng: 73.8567 }, // Pune
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: 19.2183, lng: 72.9781 }, // Thane
];

const PopupContent = ({ incident, t }: { incident: (typeof recentIncidentsData)[0], t: (key: string) => string }) => (
    <div className="w-48">
        <h3 className="font-bold text-lg">{incident.id}</h3>
        <p><span className='font-semibold'>{t('mapPopup.location')}:</span> {incident.location}</p>
        <p><span className='font-semibold'>{t('mapPopup.type')}:</span> {t(`incidentTypes.${incident.type.toLowerCase().replace(/ /g, '')}` as any)}</p>
        <p className='flex items-center gap-2'><span className='font-semibold'>{t('mapPopup.status')}:</span>
            <Badge
                variant={
                    incident.status === "Resolved"
                        ? "default"
                        : incident.status === "Active"
                            ? "destructive"
                            : "secondary"
                }
                className={cn(
                    "text-xs",
                    incident.status === "Resolved" &&
                    "bg-green-100 text-green-800 border-green-200",
                    incident.status === "Active" &&
                    "bg-red-100 text-red-800 border-red-200"
                )}
            >
                {t(`incidentStatuses.${incident.status.toLowerCase()}` as any)}
            </Badge>
        </p>
        <p><span className='font-semibold'>{t('mapPopup.actionTaken')}:</span> {t(`actionsTaken.${incident.actionTaken.toLowerCase().replace(/\. /g, ' ').replace(/\./g, '').replace(/ /g, '-')}` as any)}</p>
    </div>
);


export default function MapViewFull() {
    const { t } = useTranslation();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) { 
            mapRef.current = L.map(mapContainerRef.current).setView([19.0760, 72.8777], 8);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            recentIncidentsData.forEach((incident, index) => {
                const popupContent = ReactDOMServer.renderToString(
                    <PopupContent incident={incident} t={t}/>
                );

                L.marker([incidentLocations[index].lat, incidentLocations[index].lng])
                    .addTo(mapRef.current!)
                    .bindPopup(popupContent);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [t]);

    return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
}
