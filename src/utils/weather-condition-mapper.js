/**
 * Maps Fork U weather state strings to Three.js effect types
 * Compatible with weather-overlay config (development_mode, test_effect)
 */
export function mapWeatherStateToEffect(weatherState) {
  if (!weatherState) return 'none';

  const s = String(weatherState).toLowerCase().replace(/_/g, '-');

  if (s === 'lightning-rainy' || s === 'lightning_rainy') return 'rain_storm';
  if (s === 'pouring') return 'rain_storm';
  if (s === 'rainy-drizzle' || s === 'rainy_drizzle') return 'rain_drizzle';
  if (s === 'rainy') return 'rain';
  if (s === 'hail') return 'hail';
  if (s === 'lightning') return 'lightning';
  if (s === 'snowy' || s === 'snow') return 'snow_gentle';
  if (s === 'snowy-rainy' || s === 'snowy_rainy') return 'snow_storm';
  if (s === 'snowy2') return 'snow_layered';
  if (s === 'snowy3') return 'snow_gentle';
  if (s === 'fog' || s === 'foggy') return 'fog_light';
  if (s === 'sunny' || s === 'clear') return 'sun_beams';
  if (s === 'sunny2') return 'sun_beams';
  if (s === 'clear-night' || s === 'clear_night') return 'stars';
  if (s === 'cloudy' || s === 'partlycloudy' || s === 'partly-cloudy' || s === 'partly_cloudy') return 'clouds';
  if (s === 'windy-variant' || s === 'windy_variant') return 'clouds';
  if (s === 'windy') return 'clouds';
  if (s === 'exceptional') return 'none';

  return 'none';
}
