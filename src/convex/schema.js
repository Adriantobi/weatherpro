import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clothes: defineTable({
    storageId: v.string(),
    userId: v.string(),
    imageUrl: v.string(), // URL to the image
    tags: v.optional(v.array(v.string())),
    style: v.optional(v.string()),
    type: v.optional(v.string()), // "shirt", "pants", etc.
    warmthLevel: v.optional(v.union(v.number(), v.null())), // 1-5 scale
  }).index("by_user", ["userId"]),
});
