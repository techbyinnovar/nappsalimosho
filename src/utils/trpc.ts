import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { AppRouter } from "@/src/server/trpc/routers/_app";

export const trpc = createTRPCReact<AppRouter>();

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getTRPCClient() {
  return trpc.createClient({
    transformer: SuperJSON, 
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`, // ✅ always resolve full URL on server
      }),
    ],
  });
}
