import { Router } from "express";
import { getServerSession } from "../services/getSession.service";
import { prisma } from "../lib/prisma";
import { io } from "../socket";

/**
 * @openapi
 * tags:
 *   name: Messages
 *   description: Chat message management
 */

const router = Router();

/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - conversationId
 *             properties:
 *               content:
 *                 type: string
 *               conversationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */

router.post("/", async (req, res) => {
  try {
    const session = await getServerSession(req);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content, conversationId } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: true,
      },
    });

    if (!conversationId) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation?.participants.some(
      (user) => user.id === session.user.id,
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //create the message
    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    //emit the new message to the conversation room
    io.to(conversationId).emit("message:new", message);
    
    res.status(201).json(message);
  } catch (error) {
    console.error("Create message error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @openapi
 * /api/messages/{conversationId}:
 *   get:
 *     summary: Get messages for a conversation
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get("/:conversationId", async (req, res) => {
  try {
    const session = await getServerSession(req);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { conversationId } = req.params;

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    //ensure user is participant
    const isParticipant = conversation?.participants.some(
      (user) => user.id === session.user.id,
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //fetch the messages
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
      },
    });

    return res.json({ messages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;