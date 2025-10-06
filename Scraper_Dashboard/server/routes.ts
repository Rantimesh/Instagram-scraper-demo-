import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { runScraper, getScraperStatus } from "./scraper";
import { findCSVFiles, parseCSV, extractInstagramId } from "./csv-ingestion";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/scrape/run", async (req, res) => {
    try {
      const schema = z.object({
        usernames: z.array(z.string()).min(1).max(10)
      });
      
      const { usernames } = schema.parse(req.body);
      
      runScraper(usernames).catch(console.error);
      
      res.json({ 
        success: true, 
        message: "Scraper started",
        runId: Date.now().toString()
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to start scraper" 
      });
    }
  });

  app.get("/api/scrape/status", async (req, res) => {
    const status = getScraperStatus();
    res.json(status || { status: 'idle', logs: [] });
  });

  app.get("/api/reels", async (req, res) => {
    try {
      const csvFiles = await findCSVFiles();
      const allReels: any[] = [];

      for (const file of csvFiles) {
        const reels = await parseCSV(file);
        allReels.push(...reels);
      }

      res.json(allReels);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch reels" 
      });
    }
  });

  app.get("/api/creators", async (req, res) => {
    try {
      const csvFiles = await findCSVFiles();
      const creators = new Set<string>();

      for (const file of csvFiles) {
        const reels = await parseCSV(file);
        reels.forEach(reel => {
          if (reel.username) {
            creators.add(reel.username);
          }
        });
      }

      res.json(Array.from(creators).map(username => ({ username })));
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch creators" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
