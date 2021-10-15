import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
// TODO: Import the incident file until env is implemented
import data from './data/F01705150050.json'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWJveWVyYiIsImEiOiJja3VyMTg5MHUzam40MnZ0NGRobmg4YnpuIn0.2_XHiBl4meDJZQnmHFoBhg';

const Map = () => {
  const mapContainerRef = useRef(null);

  // Initialize using hard-coded coordinates from data file referenced above
  // TODO parse data file for initial location of incident
  const [lng, setLng] = useState(-77.440624);
  const [lat, setLat] = useState(37.541885);
  const [zoom, setZoom] = useState(11);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
