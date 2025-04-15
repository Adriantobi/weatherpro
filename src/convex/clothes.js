import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadClothingItem = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) {
      throw new Error("Failed to retrieve image URL");
    }

    // Store in database with metadata
    const clothingId = await ctx.db.insert("clothes", {
      storageId: args.storageId,
      userId: identity.subject,
      imageUrl,
    });

    return { clothingId, imageUrl };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addAnalysis = mutation({
  args: {
    clothingId: v.id("clothes"),
    analysis: v.object({
      tags: v.array(v.string()),
      type: v.string(),
      style: v.string(),
      warmthLevel: v.number(),
    }),
  },
  handler: async (ctx, { clothingId, analysis }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    // Update the clothing item with analysis
    await ctx.db.patch(clothingId, {
      ...analysis,
    });
  },
});

export const getUserWardrobe = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity(); //{subject: "user_2vG0bc04pO5yds4JnSaFaHptOd9"};

    if (!identity) {
      return;
      // throw new Error("User not authenticated");
    }

    const wardrobe = await ctx.db
      .query("clothes")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    return wardrobe;
  },
});

export const deleteClothingItem = mutation({
  args: {
    clothingId: v.id("clothes"),
  },
  handler: async (ctx, { clothingId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    // Delete the clothing item from the database
    await ctx.db.delete(clothingId);

    // Delete the image from storage
    const clothingItem = await ctx.db.get(clothingId);
    if (clothingItem) await ctx.storage.delete(clothingItem.storageId);
  },
});
