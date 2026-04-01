import { Router } from "express";
import { getServerSession } from "../services/getSession.service";
import { prisma } from "../lib/prisma";

/**
 * @openapi
 * tags:
 *   name: Conversations
 *   description: Private conversation management
 */

const router = Router();

/**
 * @openapi
 * /api/conversations/{userId}:
 *   post:
 *     summary: Create or get a conversation with a user
 *     tags: [Conversations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to chat with
 *     responses:
 *       200:
 *         description: Conversation data
 */

router.post("/:userId", async (req, res) => {
  try {
    const session = await getServerSession(req);

    if (!session?.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUserId = session.user.id;
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      return res.status(400).json({ message: "Cannot chat with yourself" });
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: { id: currentUserId },
            },
          },
          {
            participants: {
              some: { id: otherUserId },
            },
          },
          {
            participants: {
              every: {
                id: {
                  in: [currentUserId, otherUserId],
                },
              },
            },
          },
        ],
      },
      include: {
        participants: true,
      },
    });

    if (existingConversation) {
      return res.json(existingConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: currentUserId }, { id: otherUserId }],
        },
      },
      include: {
        participants: true,
      },
    });

    return res.json(newConversation);
  } catch (error) {
    console.error("Conversation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;