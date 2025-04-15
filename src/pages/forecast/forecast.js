import {
  MapPinIcon,
  PlusIcon,
  ShirtIcon,
  ShuffleIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { HfInference } from "@huggingface/inference";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import WeatherProFooter from "../../components/weather-pro-footer";
import cloud from "../../assets/vector-images/cloud.png";
import "./forecast.css";
import { useNavigate } from "react-router";

export default function ForeCastPage() {
  const [place, setPlace] = useState("London");
  const [recommendations, setRecs] = useState([]);
  const [openWardrobe, setOpenWardrobe] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const upload = useMutation(api.clothes.uploadClothingItem);
  const getRecs = useMutation(api.recommendations.getRecommendations);
  const generateUploadUrl = useMutation(api.clothes.generateUploadUrl);
  const addAnalysis = useMutation(api.clothes.addAnalysis);
  const getWardrobe = useQuery(api.clothes.getUserWardrobe);
  const deleteClothing = useMutation(api.clothes.deleteClothingItem);
  const wardrobeRef = useRef(null);
  const wardrobeButtonRef = useRef(null);
  const navigate = useNavigate();
  const SunIcon = () => (
    <svg
      className="sunIcon"
      id="layer-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 426.52 418.44"
    >
      <path d="M278.52,41.99c-.28,2.49-2.2,3.88-3.05,6.44-4.38,13.17.85,27.08-3.42,40.58-1.88,5.94-4.78,4.76-7.97,8.03-5.91,6.05-6.92,25.92-.5,31.42,1.04.89,8.58,5.19,9.71,5.38,3.42.57,5.58-1.91,8.72-2.86,11.26-3.39,17.67-2.66,26.04-11.97,10.53-11.71,13.65-28.5,29.5-34.5,6.01-2.27,11.92-2.13,18.02-4.98,6.11-2.85,9.1-8.19,14.96-10.53.86.85-2.68,6.01-3.47,7.02-7.89,10.08-20.56,19.61-30,28s-5.88,10.63-9.33,20.66c-4.1,11.93-11.31,17.15-20.95,24.32-9.48,7.05-14.13,2.85-4.1,15.85,7.89-1.55,10.25-8.91,18.34-11.88,13.76-5.05,23.44,2.87,35.85-6.15,4.2-3.06,6.4-6.99,11.46-9.54,3.01-1.51,13.77-5.79,16.21-3.28.73,3.1-3.16,1.69-5.72,2.76-13.41,5.6-18.59,20.29-31.23,25.76-5.62,2.43-7.62-.24-13.31.71-13.57,2.26-15.95,17.03-26.27,23.78l.67,17.84c11.78,1.6,17.61,13.15,28.06,16.44,14.3,4.5,27.24-2.22,41.06-.06,14.78,2.31,21.52,18.22,40.37,19.68,3.06.24,5.5-.95,8.37-.43-3.08,1.94-9.94,3.48-13.5,3.5-10.45.05-27.73-4.62-38.3-6.69-15.81-3.1-14.33,2.16-27.17,5.23-11.05,2.64-18.67-.56-29.26-3.8-2.46-.75-11.98-5.77-13.81-4.32l-2.83,11.47c8.65,4.26,16.92,2.27,25.19,8.31,7.87,5.75,12.66,19.53,20.69,22.31,5.7,1.97,11.48,1.53,17.67,4.33,2.74,1.24,11.24,7.2,12.31,9.7,1.71,3.99-5.25-1.73-5.94-2.07-11.96-5.92-24.18-2.67-36.04-7.96-8.41-3.76-7.15-11.92-18.78-15.22-7.4-2.1-11.57.09-17.7-.21-4.89-.24-12.02-6.66-14.13.93-.93,3.33,5.4,10.43,6.88,15.24,3.71,12.04-.57,18.07,8.7,29.3,11.23,13.61,25.81,15.19,29.58,35.42,1,5.37.32,10.18,2.24,15.76,1.96,5.71,7.07,12.07,11.21,16.28-2.16-.57-6.47-2.4-8.04-3.73-3.99-3.36-16.69-21.03-20.4-26.33-2.47-3.52-5.06-11.18-8.12-13.88-4.86-4.3-21.07-6.12-25.99-14.01l-17.58-32.92c-19.65,4.5.09,20.23,2.67,29.83.5,1.87,1.2,6.63,1.24,8.56.2,10.08-5.47,16.58-.35,26.55,4.67,9.1,13.84,16.53,9.54,28.94l-4.8-12.68c-5.12-8.38-13.46-14.51-16.97-24.02-2.95-8,3.2-12.94-2.01-23-3.25-6.27-10.11-9.41-13.64-14.36-2.62-3.66-2.96-11.09-7.86-9.78-3.63.97-1.42,3.92-1.89,6.06-2.96,13.58-7.38,14.47-12.65,24.44-7.99,15.11,2.73,32.97.75,47.75-1.77,13.22-12.82,20.21-15.64,35.36-.21,1.15.32,9.71-2.26,7.22-.74-2.17-.93-4.17-1.06-6.45-.44-7.79.31-22.12,1.06-30.03.55-5.87,3.69-11.83,3.03-18.02-.46-4.34-4.95-8.64-6.81-13.21-7.39-18.18,1.94-32.4,4.37-50.31-8.03-3.13-11.39-3.76-13.75,5.38-1.69,6.53-1.15,12.46-3.97,19.02-5.1,11.85-19.85,13.05-22.62,28.39-1.76,9.75.28,13.31-6.84,22.16-1.14,1.41-3.9,5.18-5.41,3.59,9.65-12.28,3.74-28.67,8.27-42.73,1.63-5.05,7.1-5.58,10.15-9.85,7.99-11.14-.43-23.67,4.39-35.3-6.56-9.18-12.44,1.31-20.54,4.15-7.19,2.52-13.69,1.44-20.6,5.4-15.55,8.89-16.6,29.29-36.14,35.86-11.97,4.03-17.84,1.16-28.55,11.45-2.73,2.63-3.64,4.9-5.98,7.51,1.6-11.09,9.92-15.01,17-21.49,3.25-2.97,6.17-6.68,9.51-9.49,4.36-3.67,12.84-7.41,15.93-12.07,2.54-3.84,2.21-8.17,3.77-12.23,6.93-18.06,19.6-19.88,33.66-30.42l-4.47-10.35c-8.56,2.4-13.87,11.39-22.62,13.34-4.41.99-9.81,1.02-14.3.71-3.23-.22-4.83-1.98-8.51-1.61-9.5.97-13.08,8.6-20.75,12.33-3.82,1.85-13.78,5.58-16.23,1.28,2.5.16,4.71-.61,6.98-1.53,12.04-4.86,16.19-15.45,26.96-21.03,8.32-4.31,8.36.02,14.29-.63,11.16-1.23,15.16-9.55,21.23-16.86,1.84-2.22,6.99-3.48,5.07-7.96-.84-1.96-8.24-2.36-10.77-3.27-10.07-3.6-16.84-13.08-26.53-14.47-4.79-.69-13.89-.74-18.73-.25-5.75.58-12.11,3.86-18.12,3.88-17.11.07-24.81-14.41-41.14-17.64-.84-.17-13.48-.21-10.25-3.24,9.81-2.51,19.73.04,29.51.98,3.23.31,6.55-.23,9.87.13,5.99.65,14.32,3.95,20.17,3.4,5.34-.5,19.4-12.43,27.96-10.6l39.42,9c8.58-18.71-16.49-13.5-27.16-19.19s-15.56-21.11-25.49-23.51c-4.41-1.07-10.81-.48-15.31-1.69-3.73-1-16.93-8.03-15.47-12.53,13.66,11.42,31.3,3.53,46.5,10.5,4.48,2.06,4.85,6.61,9.09,9.91,9.22,7.16,16.21,3.96,26.41,3.52,4.34-.19,7.1,2.52,9.96-.98,5.9-7.23-1.08-11.84-3.18-18.73-1.44-4.71-1.38-9.66-2.58-14.42-5.71-22.67-33.91-24.25-40.2-46.8-1.8-6.46-1.28-13.18-4.31-19.69-2.78-5.99-8.18-10.25-12.2-15.29,10.11,2.02,14.47,11.12,20.49,18,3.58,4.09,8.11,8.23,11.51,12.49,3.14,3.92,5.23,10.35,9.49,13.51,3.98,2.95,8.98,2.79,13.49,4.51,13.99,5.33,17.79,13.65,25.2,25.8,1.22,2,4.75,11.87,7.31,11.79,18.3-6.82,3.37-14.76-1.67-24.43-3.37-6.46-3.36-12.96-2.81-20.17.29-3.75,2.37-6.74,1.8-10.74-1.71-12.08-20.95-23.16-14.8-38.76,2.19,2.22,1.89,6.02,3.26,9.23,5,11.72,17.16,17.78,22.21,29.77,2.79,6.61-.72,7.04-.43,12.36.67,12.27,9.6,16.6,17.49,23.59,2.27,2.01,2.45,5.25,5.86,5.07,7.71-.41,6.94-8.53,9.11-14,2.89-7.29,9.01-12.29,10.22-20.77,2.8-19.68-11.78-34.61-2.44-54.45,5.04-10.71,10.07-12.46,10.69-26.3V0c5.89,13.14,4.52,31,4.06,45.53-.14,4.39-2.52,14.13-1.89,17.72.8,4.54,13.64,18.44,12.9,26.24l-5.98,35.86c.85,2.73,9.5,1.77,11.94,1.16,5.45-10.79.13-19.31,7.99-30.01,6.53-8.9,17.05-12.45,18.74-24.26.79-5.49-.39-10.12,1.21-15.79.49-1.73,7.98-16.78,10.04-14.45ZM269.18,276.64c25.74-21.6,24.17-32.87,27.36-64.14.62-6.07,3.21-13.24,3.06-19.02-1.14-43.38-56.56-64.52-92.83-58.75-16.2,2.58-28.24,3.56-40.73,15.26-36.5,34.22-51.02,80.75-12.45,120.19,18.96,19.39,38.16,21.75,64.54,22.71,18.38.67,36.69-4.21,51.05-16.26Z" />
    </svg>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wardrobeRef.current &&
        !wardrobeRef.current.contains(event.target) &&
        wardrobeButtonRef.current &&
        !wardrobeButtonRef.current.contains(event.target)
      ) {
        setOpenWardrobe(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wardrobeRef, wardrobeButtonRef]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await fetchDisplayWeatherData(place);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [place]);

  const getDayOfWeek = (date) => {
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const dateFormat = (date) => {
    // format date as 25 Feb' 25
    const options = { day: "numeric", month: "short", year: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(date),
    );
    return formattedDate.replace(/ /g, " ");
  };

  const getLowHigh = (date, data) => {
    const dailyData = data.find(
      (d) =>
        // remove the time from the date
        d.date === date.split("T")[0],
    );

    if (dailyData) {
      return {
        low: dailyData.tempMin,
        high: dailyData.tempMax,
      };
    }
    return { low: null, high: null };
  };

  function getDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {});
  }

  const handleUpload = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    // Step 1: Generate an upload URL
    const uploadUrl = await generateUploadUrl();

    // Step 2: Upload the file to the generated URL
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();

    // Step 3: Call the mutation with the storageId
    const response = await upload({ storageId });

    // Step 4: Hugging Face analysis
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    try {
      // Step 1: Fetch the image from Convex storage
      const fetchUrl = await fetch(response.imageUrl);
      const imageBlob = await fetchUrl.blob();
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Create a promise to handle the image loading
      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve();
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(imageBlob);
      });

      // Get JPEG data
      const jpegBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.95);
      });

      const jpegFile = new File([jpegBlob], "image.jpg", {
        type: "image/jpeg",
      });

      // Step 2: Choose a model - here are some good options:
      // For general image classification:
      // Convert to Uint8Array
      const arrayBuffer = await jpegFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const classification = await hf.imageClassification({
        model: "google/vit-base-patch16-224",
        data: uint8Array,
      });

      // Step 3: Process results
      const tags = classification.map((pred) => pred.label);
      const primaryTag = classification[0].label; // Most confident prediction

      // Step 4: Determine clothing type and style
      const type = determineClothingType(primaryTag, tags);
      const style = determineClothingStyle(primaryTag, tags);

      addAnalysis({
        clothingId: response.clothingId,
        analysis: {
          tags,
          type,
          style,
          warmthLevel: estimateWarmthLevel(type, style),
        },
      });
    } catch (error) {
      console.error("Hugging Face analysis failed:", error);
    }
  };

  function determineClothingType(primaryTag, allTags) {
    // Map AI labels to your clothing types
    const typeMapping = {
      "t-shirt": "top",
      shirt: "top",
      jacket: "outerwear",
      jeans: "pants",
      sweatshirt: "outerwear",
      cardigan: "outerwear",
      // Add more mappings as needed
    };

    // Find the first matching type
    for (const tag of [primaryTag, ...allTags]) {
      const lowerTag = tag.toLowerCase();
      for (const key of Object.keys(typeMapping)) {
        if (lowerTag.includes(key)) {
          return typeMapping[key];
        }
      }
    }

    return "accessory";
  }

  function determineClothingStyle(primaryTag, allTags) {
    // Similar logic for style detection
    // This might look for words like 'formal', 'casual', etc.
    const styleKeywords = {
      formal: ["suit", "dress", "blazer"],
      casual: ["t-shirt", "jeans", "sneakers"],
      sporty: ["jersey", "shorts", "trainers"],
    };

    for (const [style, keywords] of Object.entries(styleKeywords)) {
      if (
        keywords.some((keyword) => allTags.some((tag) => tag.includes(keyword)))
      ) {
        return style;
      }
    }

    return "casual"; // Default style
  }

  function estimateWarmthLevel(type, style) {
    // Simple heuristic for warmth level (1-5)
    const warmthMap = {
      outerwear: 4,
      sweater: 3,
      top: 2,
      pants: 2,
      shorts: 1,
    };
    return warmthMap[type] || 2;
  }

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract relevant weather information
      return {
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        humidity: data.main.humidity,
        conditions: data.weather[0].main, // "Rain", "Clouds", etc.
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      throw new Error("Could not fetch weather data");
    }
  };

  const fetchDisplayWeatherData = async (location) => {
    try {
      // Fetch coordinates for the location
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      );
      const geoData = await geoResponse.json();
      if (!geoData.length) {
        throw new Error("Location not found");
      }
      const { lat, lon } = geoData[0];

      // Fetch weather data using coordinates
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&timezone=auto`,
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract current, daily, and hourly weather information
      const current = {
        temp: data.current_weather.temperature,
        time: data.current_weather.time,
      };

      // Extract daily and hourly weather information
      const daily = data.daily.time.map((date, index) => ({
        date,
        tempMin: data.daily.temperature_2m_min[index],
        tempMax: data.daily.temperature_2m_max[index],
      }));

      const hourly = data.hourly.time.slice(0, 9).map((time, index) => ({
        time,
        temp: data.hourly.temperature_2m[index],
      }));

      return { current, daily, hourly };
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      throw new Error("Could not fetch weather data");
    }
  };

  const handleGetRecommendations = async () => {
    try {
      // Fetch weather data for the specified location
      const weatherData = await fetchWeatherData(place);
      const recs = await getRecs({ weather: weatherData }); // Pass 'place' dynamically
      setRecs(recs);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="mainPage">
          <div className="GeneratorWindow">
            <div className="flex h-fit w-full items-center justify-between px-4 py-2 absolute top-0">
              <div className="relative">
                <span
                  className="cursor-pointer"
                  ref={wardrobeButtonRef}
                  onClick={() => setOpenWardrobe(!openWardrobe)}
                >
                  <ShirtIcon size={24} strokeWidth={1.5} />
                </span>
                {openWardrobe && (
                  <div className="Wardrobe" ref={wardrobeRef}>
                    <div className="flex items-center justify-between py-4 px-2">
                      <h2 className="text-2xl border-b border-black">
                        <span className="font-atherosser">Your </span>
                        <span className="font-magazineLetter">Wardrobe</span>
                      </h2>
                      <span className="flex items-center justify-center">
                        <input
                          type="file"
                          id="file-upload"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          style={{ cursor: "pointer" }}
                        >
                          <PlusIcon size={24} strokeWidth={1.5} />
                        </label>
                      </span>
                    </div>
                    {getWardrobe?.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-4 px-2 h-32">
                        <p className="text-xl text-black">
                          Your wardrobe is empty.
                        </p>
                        <p className="text-md text-zinc-600">
                          Upload some clothes to get started!
                        </p>
                      </div>
                    ) : (
                      <div className="itemDiv">
                        <ul className="flex flex-wrap justify-between gap-4 overflow-y-auto no-scrollbar">
                          {getWardrobe?.map((item) => (
                            <li
                              key={item._id}
                              className="itemBox group relative"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.style}
                                className="item"
                              />
                              <span
                                className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={async () => {
                                  await deleteClothing({
                                    clothingId: item._id,
                                  });
                                }}
                              >
                                <XIcon size={8} strokeWidth={1.5} />
                              </span>
                            </li>
                          ))}{" "}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow flex h-full w-full">
              <div className="bg-[#f1f4eb] h-screen px-4 py-2 flex flex-col items-center justify-center min-w-[616px] w-[616px]">
                {Object.keys(recommendations).length > 0 ? (
                  Object.entries(recommendations).map(([key, item]) =>
                    item ? (
                      <div key={key} className="genItemBox">
                        <img
                          src={item.imageUrl}
                          alt={item.style}
                          className="item"
                        />
                        <p className="text-lg font-atherosser">{item.style}</p>
                      </div>
                    ) : (
                      <div
                        key={`no-${key}`}
                        className="flex flex-col items-center justify-center mb-4"
                      >
                        <p className="text-md text-zinc-600">
                          You may not have an item in the {key} category.
                        </p>
                      </div>
                    ),
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-xl text-black">
                      No recommendations available.
                    </p>
                    <p className="text-md text-zinc-600">
                      Click "Regenerate" to get new outfit ideas!
                    </p>
                  </div>
                )}
                <button
                  className="font-magazineLetter text-4xl flex flex-col justify-center items-center gap-4"
                  onClick={handleGetRecommendations}
                >
                  <ShuffleIcon size={32} strokeWidth={1.5} />
                  Regenerate
                </button>
              </div>
              {/*<div>
                  {weatherData && weatherData.hourly.length > 0 && (
                    <div className="flex flex-col items-center justify-center py-4 px-2 gap-3">
                      {weatherData.hourly.map((hour) => (
                        <div
                          className="flex flex-col items-center justify-center gap-1"
                          key={hour.time}
                        >
                          <p className="font-melagllikItalic">{hour.time}</p>
                          <p className="font-melagllikItalic">{hour.temp}°</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              */}
            </div>
          </div>
          <div className="bg-[#fcfef1] flex justify-between items-start w-full">
            <div className="weekView">
              {weatherData &&
                weatherData.daily.length > 0 &&
                weatherData.daily.map((day) => (
                  <div
                    className="flex flex-col items-center justify-center gap-1"
                    key={day.date}
                  >
                    <p className="font-melagllikItalic">
                      {getDayOfWeek(day.date)}
                    </p>
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-melagllikItalic">
                        <span className="text-xl">{day.tempMax}°</span>{" "}
                        <span className="text-sm">High</span>
                      </p>
                      <span className="border-t border-t-black w-full"></span>
                      <p className="font-melagllikItalic">
                        <span className="text-xs">Low</span>{" "}
                        <span className="text-xl">{day.tempMin}°</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center self-center py-4 px-2 gap-3 absolute top-1/2 left-1/2 trnslate-x-[-50%] translate-y-[-50%] ml-20">
              {weatherData && weatherData.current && (
                <>
                  {weatherData.current.temp >= 20 ? (
                    <SunIcon />
                  ) : (
                    <img
                      src={cloud}
                      alt="Weather Icon"
                      className="w-113 h-auto"
                    />
                  )}
                  <div className="flex flex-col items-center justify-center font-planetKosmos text-5xl absolute inset-0">
                    {weatherData.current.temp}°
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="locationBar">
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full max-w-48 py-1 px-3 text-md pl-6 bg-transparent border-b border-black outline-none font-atherosser backdrop-blur-3xl"
              required
            />
            <MapPinIcon
              className="absolute left-1 top-4 -translate-y-1/2"
              size={16}
              strokeWidth={1.5}
            />
          </div>
          {weatherData && weatherData.current && weatherData.daily && (
            <div className="currentDetails">
              <div className="location !font-newRomantics !text-sm !flex !items-center gap-2">
                <MapPinIcon size={16} strokeWidth={1.5} />
                {place}
              </div>
              <div className="curDate !font-newRomantics">
                {dateFormat(Date.now())}
              </div>
              <div className="day !font-melagllik !text-xl">
                {getDayOfWeek(Date.now())}
              </div>
              <div className="flex items-center absolute right-10 bottom-6 gap-4">
                <p className="font-melagllik flex flex-col gap-2">
                  <span className="text-sm">High</span>
                  <span className="text-sm">
                    {
                      getLowHigh(weatherData?.current?.time, weatherData?.daily)
                        .high
                    }
                    °
                  </span>
                </p>
                <span className="border-l border-l-black h-[30px]"></span>
                <p className="font-melagllik flex flex-col-reverse gap-2">
                  <span className="text-sm">Low</span>
                  <span className="text-sm">
                    {
                      getLowHigh(weatherData?.current?.time, weatherData?.daily)
                        .low
                    }
                    °
                  </span>
                </p>
              </div>
            </div>
          )}
          <WeatherProFooter />
        </div>
      </SignedIn>
      <SignedOut>{navigate("/sign-in")}</SignedOut>
    </>
  );
}
