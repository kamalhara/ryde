import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../constants";

export default function OSMSearchBar({
  onSelect,
  icon,
  ContainerStyle,
  textInputBackgroundColor,
  initalLocation,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query,
          )}&limit=5`,
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.log("OSM error:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelectLocation = (item) => {
    const location = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      address: item.display_name,
    };
    onSelect(location);
    setQuery(item.display_name);
    setResults([]);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay clearing results to allow selection
    setTimeout(() => {
      if (!isFocused) {
        setResults([]);
      }
    }, 200);
  };

  const handleSearchPress = () => {
    // Select first result if available
    if (results.length > 0) {
      handleSelectLocation(results[0]);
    }
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    // Select first result if available
    if (results.length > 0) {
      handleSelectLocation(results[0]);
    }
  };

  return (
    <View
      className={`${ContainerStyle} flex flex-row items-center justify-start gap-2 px-4 mb-5 relative z-50`}
    >
      <TouchableOpacity
        onPress={handleSearchPress}
        className="justify-center items-center w-6 h-6"
      >
        <Image
          source={icon ? icon : icons.search}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View className="flex-1 relative">
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="search"
          placeholder={initalLocation ?? "where you want to go ?"}
          placeholderTextColor="gray"
          className="px-4 py-3 rounded-full text-base font-semibold"
          style={{
            backgroundColor: textInputBackgroundColor || "white",
          }}
        />

        {results.length > 0 && (
          <View className="absolute top-14 w-full bg-white rounded-xl shadow-md z-50">
            <FlatList
              data={results}
              keyExtractor={(item) => item.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-200"
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text numberOfLines={2} className="font-medium">
                    {item.display_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
