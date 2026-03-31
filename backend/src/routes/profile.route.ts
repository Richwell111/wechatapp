import { Request, Response, Router } from "express";
import { upload } from "../middleware/upload";
import { getServerSession } from "../services/getSession.service";
import { prisma } from "../lib/prisma";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.service";

const router = Router();

router.put(
  "/",
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      const session = await getServerSession(req);

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = session.user.id;
      const { bio, name } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      let avatarURL = existingUser.avatar;
      let avatarPublicId = existingUser.avatarPublicId;

      if (req.file) {
        if (existingUser.avatarPublicId) {
          await deleteFromCloudinary(existingUser.avatarPublicId);
        }

        //upload the new avatar
        const result = await uploadToCloudinary(
          req.file.buffer,
          req.file.mimetype,
        );

        avatarURL = result.secure_url;
        avatarPublicId = result.public_id;
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          bio,
          avatar: avatarURL,
          avatarPublicId,
          name,
        },
      });

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        bio: true,
        avatar: true,
        id: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;