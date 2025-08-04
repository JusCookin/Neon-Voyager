import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: real("rating").notNull(),
  imageUrl: text("image_url").notNull(),
  location: json("location").$type<{ lat: number; lng: number }>().notNull(),
  category: text("category").notNull(),
});

export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationId: varchar("destination_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: real("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  imageUrl: text("image_url").notNull(),
  amenities: json("amenities").$type<string[]>().notNull(),
});

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationId: varchar("destination_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  cuisineType: text("cuisine_type").notNull(),
  priceRange: text("price_range").notNull(),
  rating: real("rating").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const attractions = pgTable("attractions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationId: varchar("destination_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  location: json("location").$type<{ lat: number; lng: number }>().notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  destinationId: varchar("destination_id").notNull(),
  items: json("items").$type<Array<{ id: string; type: string; time: string }>>().notNull(),
  createdAt: text("created_at").notNull(),
});

export const weather = pgTable("weather", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationId: varchar("destination_id").notNull(),
  temperature: integer("temperature").notNull(),
  condition: text("condition").notNull(),
  humidity: integer("humidity").notNull(),
  windSpeed: integer("wind_speed").notNull(),
  icon: text("icon").notNull(),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({ id: true });
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true });
export const insertRestaurantSchema = createInsertSchema(restaurants).omit({ id: true });
export const insertAttractionSchema = createInsertSchema(attractions).omit({ id: true });
export const insertItinerarySchema = createInsertSchema(itineraries).omit({ id: true, createdAt: true });
export const insertWeatherSchema = createInsertSchema(weather).omit({ id: true });

export type Destination = typeof destinations.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type Restaurant = typeof restaurants.$inferSelect;
export type Attraction = typeof attractions.$inferSelect;
export type Itinerary = typeof itineraries.$inferSelect;
export type Weather = typeof weather.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type InsertAttraction = z.infer<typeof insertAttractionSchema>;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type InsertWeather = z.infer<typeof insertWeatherSchema>;
