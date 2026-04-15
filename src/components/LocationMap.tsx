"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location } from "@/components/FindUsSection";

interface LocationMapProps {
  locations: Location[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [31.5, -97.5],
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    // Use CartoDB Voyager tiles for a clean, modern look
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    // Attribution in bottom-right, minimal
    L.control
      .attribution({ position: "bottomright", prefix: false })
      .addAttribution('&copy; <a href="https://carto.com/">CARTO</a>')
      .addTo(map);

    mapInstanceRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    const sageIcon = L.divIcon({
      className: "",
      html: `<div style="width:12px;height:12px;background:#5E7D5B;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], { icon: sageIcon });
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:160px;">
          <strong style="font-size:13px;color:#1C1C1C;">${loc.name}</strong>
          <br/><span style="font-size:11px;color:#6B6B6B;">${loc.city}, ${loc.state}</span>
          <br/><a href="https://maps.google.com/?q=${encodeURIComponent(loc.name + ", " + loc.city + ", " + loc.state)}" target="_blank" rel="noopener" style="font-size:11px;color:#5E7D5B;text-decoration:none;">Get Directions →</a>
        </div>`,
        { closeButton: false, offset: [0, -4] }
      );
      markersRef.current!.addLayer(marker);
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [locations]);

  return <div ref={mapRef} className="h-full w-full" />;
}
