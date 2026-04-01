import { Request, Response, Router } from "express";
import { getServerSession } from "../services/getSession.service";
import { prisma } from "../lib/prisma";

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User discovery and search
 */

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Search for users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const search = (req.query.search as string) || "";

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;