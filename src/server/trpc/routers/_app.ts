// src/server/trpc/routers/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { schoolRouter } from "./school";
import { memberRouter } from "./member";
import { eventRouter } from "./event";

export const appRouter = router({
  auth: authRouter,
  school: schoolRouter,
  member: memberRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
