import React, { useEffect, useState } from "react";
import { states, getCitiesByState } from "../DataFiles/States";
import { type IState, type ICity } from "country-state-city";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "../store/locationStore";
import { GetCordinates, GetweeklyWeather } from "../Api/coordinates";

interface CoordinateResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const useLocationSelector = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const {
    selectedState,
    selectedCity,
    citylat,
    citylong,
    setState,
    setCity,
    setCoordinates,
  } = useLocationStore();

  const handleStateChange = (_: React.SyntheticEvent, newValue: IState | null) => {
    if (newValue) {
      const cityList = getCitiesByState(newValue.isoCode);
      setCities(cityList);
      setState(newValue.name);
    } else {
      setCities([]);
      setState(null);
      setCity(null);
      setCoordinates(null, null);
    }
  };

  const handleCoordinates = (_: React.SyntheticEvent, newCity: ICity | null) => {
    setCity(newCity?.name || null);
  };

  // Get Coordinates
  const { data: Coordinatesdata, isLoading, isError } = useQuery({
    queryKey: ["coordinates", selectedCity, selectedState],
    queryFn: async () =>
      selectedCity && selectedState
        ? await GetCordinates(selectedCity)
        : Promise.resolve([]),
    enabled: !!selectedCity && !!selectedState,
  });

  useEffect(() => {
    if (Coordinatesdata) {
      const matchedData = Coordinatesdata.find(
        (item: CoordinateResult) =>
          item.state?.toLowerCase() === selectedState?.toLowerCase()
      );
      if (matchedData) {
        setCoordinates(matchedData.lat, matchedData.lon);
      } else if (Coordinatesdata.length > 0) {
        setCoordinates(Coordinatesdata[0].lat, Coordinatesdata[0].lon);
      } else {
        setCoordinates(null, null);
      }
    }
  }, [Coordinatesdata, selectedState, setCoordinates]);

  // Get Weekly Weather Data
  const {
    data: weeklydata,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
    isFetching: isWeeklyFetching,
  } = useQuery({
    queryKey: ["weekdata", citylat, citylong],
    queryFn: async () => {
      if (citylat && citylong) {
        const data = await GetweeklyWeather(citylat, citylong);
        if (!data?.list) return null;

        // Group by date
        const grouped: Record<string, any[]> = {};
        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        // Create daily summary// Create daily summary with extra details
const dailyData = Object.entries(grouped).map(([date, items]) => {
  const avgTemp =
    items.reduce((sum, i) => sum + i.main.temp, 0) / items.length;
  const avgFeelsLike =
    items.reduce((sum, i) => sum + i.main.feels_like, 0) / items.length;
  const minTemp = Math.min(...items.map((i) => i.main.temp_min));
  const maxTemp = Math.max(...items.map((i) => i.main.temp_max));
  const avgPressure =
    items.reduce((sum, i) => sum + i.main.pressure, 0) / items.length;
  const avgSeaLevel =
    items.reduce((sum, i) => sum + (i.main.sea_level || 0), 0) / items.length;
  const avgGroundLevel =
    items.reduce((sum, i) => sum + (i.main.grnd_level || 0), 0) / items.length;

  const mainWeather = items[Math.floor(items.length / 2)].weather[0];

  return {
    date,
    avgTemp: Math.round(avgTemp),
    feels_like: Math.round(avgFeelsLike),
    temp_min: Math.round(minTemp),
    temp_max: Math.round(maxTemp),
    pressure: Math.round(avgPressure),
    sea_level: Math.round(avgSeaLevel),
    grnd_level: Math.round(avgGroundLevel),
    weather: mainWeather.main,
    icon: mainWeather.icon,
  };
});

        return { city: data.city, list: dailyData };
      }
      return Promise.resolve(null);
    },
    enabled: !!citylat && !!citylong,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!citylat || !citylong) {
      console.log("Waiting for coordinates...");
      return;
    }

    if (weeklydata) {
      console.log("Weekly weather fetched:", weeklydata);
    } else {
      console.log("Data not yet fetched for the current coordinates...");
    }
  }, [weeklydata, citylat, citylong]);

  return {
    states,
    cities,
    citylat,
    citylong,
    isLoading,
    isError,
    handleStateChange,
    handleCoordinates,
    weeklydata,
    isWeeklyLoading,
    isWeeklyError,
    isWeeklyFetching,
    selectedCity,
    selectedState,
  };
};
