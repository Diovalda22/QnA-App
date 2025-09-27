import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getProfileByUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { username } = input;

      const profile = await db.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          image: true,
          username: true,
          email: true,
          name: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with username ${username} not found`,
        });
      }

      return profile;
    }),
});
