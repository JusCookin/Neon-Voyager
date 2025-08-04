import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItinerarySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  // Search
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }
      const results = await storage.searchDestinations(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to search destinations" });
    }
  });

  // Hotels
  app.get("/api/destinations/:id/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotelsByDestination(req.params.id);
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  // Restaurants
  app.get("/api/destinations/:id/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getRestaurantsByDestination(req.params.id);
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  // Attractions
  app.get("/api/destinations/:id/attractions", async (req, res) => {
    try {
      const attractions = await storage.getAttractionsByDestination(req.params.id);
      res.json(attractions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attractions" });
    }
  });

  // Weather
  app.get("/api/destinations/:id/weather", async (req, res) => {
    try {
      const weather = await storage.getWeatherByDestination(req.params.id);
      if (!weather) {
        return res.status(404).json({ error: "Weather data not found" });
      }
      res.json(weather);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  });

  // Itineraries
  app.get("/api/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });

  app.post("/api/itineraries", async (req, res) => {
    try {
      const validatedData = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(validatedData);
      res.status(201).json(itinerary);
    } catch (error) {
      res.status(400).json({ error: "Invalid itinerary data" });
    }
  });

  app.delete("/api/itineraries/:id", async (req, res) => {
    try {
      await storage.deleteItinerary(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete itinerary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
