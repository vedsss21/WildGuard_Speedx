
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { recentIncidentsData } from '@/lib/data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

// Mock coordinates for incidents
const incidentLocations = [
    { lat: 18.5204, lng: 73.8567 }, // Pune
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: 19.2183, lng: 72.9781 }, // Thane
];

export default function MapViewFull() {
    return (
        <MapContainer center={[19.0760, 72.8777]} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {recentIncidentsData.map((incident, index) => (
                <Marker key={incident.id} position={[incidentLocations[index].lat, incidentLocations[index].lng]}>
                    <Popup>
                        <div className="w-48">
                            <h3 className="font-bold text-lg">{incident.id}</h3>
                            <p><span className='font-semibold'>Location:</span> {incident.location}</p>
                            <p><span className='font-semibold'>Type:</span> {incident.type}</p>
                            <p className='flex items-center gap-2'><span className='font-semibold'>Status:</span>
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
                                        "bg-green-600/20 text-green-700 hover:bg-green-600/30 border-green-600/20",
                                        incident.status === "Active" &&
                                        "bg-red-600/20 text-red-700 hover:bg-red-600/30 border-red-600/20"
                                    )}
                                >
                                    {incident.status}
                                </Badge>
                            </p>
                            <p><span className='font-semibold'>Action Taken:</span> {incident.actionTaken}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

