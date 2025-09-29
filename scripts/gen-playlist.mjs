import fs from "fs";
import path from "path";

const musicDir = path.join(process.cwd(), "public", "music");
const outFile  = path.join(process.cwd(), "public", "playlist.json");

const allowed = new Set([".mp3", ".m4a", ".aac", ".ogg", ".wav"]);

function main() {
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir, { recursive: true });
  }
  const files = fs.readdirSync(musicDir);

  const tracks = files
    .filter((f) => allowed.has(path.extname(f).toLowerCase()))
    .map((f) => {
      const title = path.basename(f, path.extname(f)).replace(/[_-]+/g, " ");
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        url: `/music/${encodeURIComponent(f)}`,
        filename: f
      };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename, "ru"));

  fs.writeFileSync(outFile, JSON.stringify({ tracks }, null, 2), "utf-8");
  console.log(`playlist.json generated with ${tracks.length} tracks`);
}

main();
