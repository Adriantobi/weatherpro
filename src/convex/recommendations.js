import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRecommendations = mutation({
  args: {
    weather: v.object({
      temp: v.number(),
      feelsLike: v.number(),
      minTemp: v.number(),
      maxTemp: v.number(),
      humidity: v.number(),
      conditions: v.string(), // "Rain", "Clouds", etc.
      description: v.string(),
      windSpeed: v.number(),
      icon: v.string(),
    }),
  },
  handler: async (ctx, args = {}) => {
    const { weather } = args;
    if (!weather) {
      throw new Error("The 'weather' field is required.");
    }

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const { temp, conditions } = weather;
    const warmthNeeded = calculateWarmthLevel(temp, conditions);

    const wardrobe = await ctx.db
      .query("clothes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const suitableItems = wardrobe.filter((item) =>
      isSuitableForWeather(item, warmthNeeded, conditions),
    );

    const outfit = generateOutfit(suitableItems);
    return { ...outfit };
  },
});

function calculateWarmthLevel(temp, conditions) {
  if (temp < 5) return 5; // very warm
  if (temp < 10) return 4;
  if (temp < 15) return 3;
  if (temp < 20) return 2;
  return 1; // light clothing
}

function isSuitableForWeather(item, warmthNeeded, conditions) {
  return item.warmthLevel >= warmthNeeded;
}

function generateOutfit(items) {
  const grouped = items.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return {
    top: grouped.top?.[Math.floor(Math.random() * grouped.top.length)] || null,
    bottom:
      grouped.bottom?.[Math.floor(Math.random() * grouped.bottom.length)] ||
      null,
    outerwear:
      grouped.outerwear?.[
        Math.floor(Math.random() * grouped.outerwear.length)
      ] || null,
    accessory:
      grouped.accessory?.[
        Math.floor(Math.random() * grouped.accessory.length)
      ] || null,
  };
}
