import { useLayoutEffect, useState } from 'react';
import config from '../../config';

const { H } = window;

const { MAP_API_KEY } = config;

export function useCreateMap(mapRef) {
  const [map, setMap] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useLayoutEffect(() => {
    if (!mapRef.current || !MAP_API_KEY) return undefined;

    const platform = new H.service.Platform({ apikey: MAP_API_KEY });
    const layer = platform.createDefaultLayers();

    // Romanias most extreme points https://en.wikipedia.org/wiki/List_of_extreme_points_of_Romania
    const mapBounds = new H.geo.Rect(48.15, 20.19, 43.4, 29.4);

    const hMap = new H.Map(mapRef.current, layer.vector.normal.map, {
      center: { lat: 45.9432, lng: 24.9668 },
      bounds: mapBounds,
    });

    const events = new H.mapevents.MapEvents(hMap);
    const behavior = new H.mapevents.Behavior(events);
    behavior.disable(H.mapevents.Behavior.Feature.WHEEL_ZOOM);

    // eslint-disable-next-line no-unused-vars, new-cap
    const ui = new H.ui.UI.createDefault(hMap, layer);

    const onResizeWindow = () => {
      hMap.getViewPort().resize();
    };

    const mapEngine = hMap.getEngine();

    const onMapRendered = (event) => {
      if (mapEngine === event.target) {
        setIsMapLoading(false);
      }
    };

    const onMapDragStartHandler = (event) => {
      if (event.originalEvent.pointerType === 'mouse') return;

      if (event.targetPointers.length === 1) {
        behavior.disable(H.mapevents.Behavior.Feature.PANNING);
      }
    };

    const onMapDragEndHandler = (event) => {
      if (event.originalEvent.pointerType === 'mouse') return;

      behavior.enable(H.mapevents.Behavior.Feature.PANNING);
    };

    mapEngine.addEventListener('render', onMapRendered);
    window.addEventListener('resize', onResizeWindow);
    hMap.addEventListener('dragstart', onMapDragStartHandler);
    hMap.addEventListener('dragend', onMapDragEndHandler);

    setMap(hMap);

    return () => {
      mapEngine.removeEventListener('render', onMapRendered);
      window.removeEventListener('resize', onResizeWindow);
      hMap.dispose();
    };
  }, [mapRef, setMap]);

  return { map, isMapLoading };
}

export default useCreateMap;
