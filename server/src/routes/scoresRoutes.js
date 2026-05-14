const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/scores - Save a new score
router.post('/', async (req, res) => {
  try {
    const { username, time } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!time) {
      return res.status(400).json({ error: "Time is required" });
    }

    const score = await prisma.score.create({
      data: {
        username: username.trim(),
        time: parseInt(time),
      },
    });

    res.status(201).json({ message: "Score saved", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

// GET /api/scores - Get the leaderboard
router.get('/', async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      orderBy: { time: 'asc' },
      take: 50,
    });
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;