// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export const runtime = "nodejs"; // Vercel Blob requires edge runtime

export async function POST(req: Request) {
  try {
    // ✅ Optionally restrict upload to authenticated users (like admin)
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Ensure multipart form-data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public", // or "private" if you want signed URLs only
    });

    // ✅ Return the public URL
    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
