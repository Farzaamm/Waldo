const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// POST - Save score
router.post('/', async (req, res) => {
  try {
    const { username, time } = req.body;

    if (!username || !time) {
      return res.status(400).json({ error: "Username and time are required" });
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

// GET - Leaderboard
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