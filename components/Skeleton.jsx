import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

// Base skeleton block with shimmer animation
export function SkeletonBlock({ width, height, borderRadius = 8, style }) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#e5e7eb",
          opacity,
        },
        style,
      ]}
    />
  );
}

// Skeleton for a ride card
export function RideCardSkeleton() {
  return (
    <View
      className="bg-white rounded-2xl mb-4 p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Map + Addresses */}
      <View className="flex flex-row items-center">
        <SkeletonBlock width={80} height={90} borderRadius={12} />
        <View className="flex flex-col ml-4 gap-y-4 flex-1">
          <View className="flex flex-row gap-x-2 items-center">
            <SkeletonBlock width={24} height={24} borderRadius={12} />
            <SkeletonBlock width="80%" height={14} borderRadius={6} />
          </View>
          <View className="flex flex-row gap-x-2 items-center">
            <SkeletonBlock width={24} height={24} borderRadius={12} />
            <SkeletonBlock width="65%" height={14} borderRadius={6} />
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-100 my-4" />

      {/* Details */}
      <View className="gap-y-3">
        <View className="flex flex-row items-center justify-between">
          <SkeletonBlock width={80} height={12} borderRadius={4} />
          <SkeletonBlock width={140} height={12} borderRadius={4} />
        </View>
        <View className="flex flex-row items-center justify-between mt-3">
          <SkeletonBlock width={50} height={12} borderRadius={4} />
          <SkeletonBlock width={100} height={12} borderRadius={4} />
        </View>
        <View className="flex flex-row items-center justify-between mt-3">
          <SkeletonBlock width={65} height={12} borderRadius={4} />
          <SkeletonBlock width={50} height={22} borderRadius={11} />
        </View>
      </View>
    </View>
  );
}

// Skeleton for the home header section
export function HomeHeaderSkeleton() {
  return (
    <View className="my-5">
      <View className="flex flex-row items-center justify-between">
        <View>
          <SkeletonBlock width={130} height={14} borderRadius={6} />
          <SkeletonBlock
            width={180}
            height={24}
            borderRadius={8}
            style={{ marginTop: 8 }}
          />
        </View>
        <SkeletonBlock width={40} height={40} borderRadius={20} />
      </View>

      {/* Search bar skeleton */}
      <SkeletonBlock
        width="100%"
        height={48}
        borderRadius={24}
        style={{ marginTop: 20 }}
      />

      {/* Map section skeleton */}
      <SkeletonBlock
        width={160}
        height={18}
        borderRadius={6}
        style={{ marginTop: 24 }}
      />
      <SkeletonBlock
        width="100%"
        height={300}
        borderRadius={16}
        style={{ marginTop: 12 }}
      />

      {/* Recent rides header */}
      <SkeletonBlock
        width={120}
        height={18}
        borderRadius={6}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}

// Skeleton for chat conversation item
export function ChatItemSkeleton() {
  return (
    <View
      className="bg-white rounded-2xl mb-3 p-4 flex flex-row items-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <SkeletonBlock width={56} height={56} borderRadius={28} />
      <View className="flex-1 ml-4">
        <View className="flex flex-row items-center justify-between">
          <SkeletonBlock width={120} height={14} borderRadius={6} />
          <SkeletonBlock width={40} height={10} borderRadius={4} />
        </View>
        <SkeletonBlock
          width="70%"
          height={12}
          borderRadius={4}
          style={{ marginTop: 8 }}
        />
      </View>
    </View>
  );
}

// Skeleton for profile card
export function ProfileSkeleton() {
  return (
    <View>
      {/* Header */}
      <SkeletonBlock
        width={80}
        height={24}
        borderRadius={8}
        style={{ marginVertical: 20 }}
      />

      {/* Profile Card */}
      <View
        className="bg-white rounded-2xl p-6 items-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <SkeletonBlock width={96} height={96} borderRadius={48} />
        <SkeletonBlock
          width={140}
          height={20}
          borderRadius={8}
          style={{ marginTop: 16 }}
        />
        <SkeletonBlock
          width={180}
          height={14}
          borderRadius={6}
          style={{ marginTop: 8 }}
        />
        <View className="flex flex-row mt-6 w-full">
          <View className="flex-1 items-center">
            <SkeletonBlock width={30} height={20} borderRadius={6} />
            <SkeletonBlock
              width={40}
              height={10}
              borderRadius={4}
              style={{ marginTop: 4 }}
            />
          </View>
          <View className="flex-1 items-center">
            <SkeletonBlock width={30} height={20} borderRadius={6} />
            <SkeletonBlock
              width={40}
              height={10}
              borderRadius={4}
              style={{ marginTop: 4 }}
            />
          </View>
          <View className="flex-1 items-center">
            <SkeletonBlock width={40} height={20} borderRadius={6} />
            <SkeletonBlock
              width={50}
              height={10}
              borderRadius={4}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>
      </View>

      {/* Menu items skeleton */}
      <View
        className="bg-white rounded-2xl mt-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            className={`flex flex-row items-center px-5 py-4 ${i < 5 ? "border-b border-gray-100" : ""}`}
          >
            <SkeletonBlock width={40} height={40} borderRadius={20} />
            <SkeletonBlock
              width={120}
              height={14}
              borderRadius={6}
              style={{ marginLeft: 16 }}
            />
            <View className="flex-1" />
            <SkeletonBlock width={60} height={12} borderRadius={4} />
          </View>
        ))}
      </View>
    </View>
  );
}
