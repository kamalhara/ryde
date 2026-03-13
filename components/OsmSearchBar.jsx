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
    setTimeout(() => {
      if (!isFocused) {
        setResults([]);
      }
    }, 200);
  };

  const handleSearchPress = () => {
    if (results.length > 0) {
      handleSelectLocation(results[0]);
    }
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
    if (results.length > 0) {
      handleSelectLocation(results[0]);
    }
  };

  return (
    <View
      className={`flex flex-row items-center justify-start gap-2 px-4 mb-5 relative z-50 rounded-2xl ${ContainerStyle}`}
      style={{
        borderWidth: 1.5,
        borderColor: isFocused ? "#0286ff" : "#e5e7eb",
        backgroundColor: isFocused ? "#f0f7ff" : "#f9fafb",
      }}
    >
      <TouchableOpacity
        onPress={handleSearchPress}
        className="justify-center items-center w-6 h-6"
      >
        <Image
          source={icon ? icon : icons.search}
          className="w-5 h-5"
          resizeMode="contain"
          tintColor={isFocused ? "#0286ff" : "#9ca3af"}
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
          placeholder={initalLocation ?? "Where do you want to go?"}
          placeholderTextColor="#9ca3af"
          className="px-2 py-3 text-[15px]"
          style={{
            fontFamily: "Jakarta-Medium",
            color: "#1f2937",
            backgroundColor: "transparent",
          }}
        />

        {results.length > 0 && (
          <View
            className="absolute top-14 w-full bg-white rounded-2xl z-50"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <FlatList
              data={results}
              keyExtractor={(item) => item.place_id.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={`px-4 py-3 flex-row items-start ${
                    index < results.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  onPress={() => handleSelectLocation(item)}
                >
                  <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mt-0.5 mr-3">
                    <Image
                      source={icons.point}
                      className="w-4 h-4"
                      tintColor="#6b7280"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      className="text-sm text-gray-900"
                      style={{ fontFamily: "Jakarta-SemiBold" }}
                    >
                      {item.display_name.split(",")[0]}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-xs text-gray-400 mt-0.5"
                      style={{ fontFamily: "Jakarta-Medium" }}
                    >
                      {item.display_name.split(",").slice(1).join(",").trim()}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View className="px-4 py-2 border-t border-gray-100">
              <Text
                className="text-[10px] text-gray-300 text-center"
                style={{ fontFamily: "Jakarta-Medium" }}
              >
                Powered by OpenStreetMap
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
