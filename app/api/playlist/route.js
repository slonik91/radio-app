import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), "public", "music");
    if (!fs.existsSync(musicDir)) {
      return NextResponse.json({ tracks: [] });
    }

    const files = fs.readdirSync(musicDir);
    const allowed = new Set([".mp3", ".m4a", ".aac", ".ogg", ".wav"]);

    const tracks = files
      .filter((f) => allowed.has(path.extname(f).toLowerCase()))
      .map((f) => {
        const title = path.basename(f, path.extname(f)).replace(/[_-]+/g, " ");
        return {
          title: title.charAt(0).toUpperCase() + title.slice(1),
          url: `/music/${encodeURIComponent(f)}`,
          filename: f,
        };
      })
      .sort((a, b) => a.filename.localeCompare(b.filename, "ru"));

    return NextResponse.json({ tracks });
  } catch (e) {
    return NextResponse.json({ tracks: [], error: String(e) }, { status: 500 });
  }
}
