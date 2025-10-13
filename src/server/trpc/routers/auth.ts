// src/server/trpc/routers/auth.ts
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
