import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileName = `${Date.now()}-${file.name}`;

    // Define upload path
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    // Save file
    await writeFile(uploadPath, buffer);

    // Return public URL
    return NextResponse.json({
      imageUrl: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
