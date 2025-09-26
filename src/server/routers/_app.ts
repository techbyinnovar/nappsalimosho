import { router } from "../trpc";
import { schoolRouter } from "./school";
import { memberRouter } from "./member";
import { eventRouter } from './event';

export const appRouter = router({
  school: schoolRouter,
  member: memberRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
