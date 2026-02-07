const fs = require("fs");
const path = require("path");

const root = __dirname;

const folders = {
  css: "assets/css",
  js: "assets/js",
  images: "assets/images",
};

const imageTypes = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];

// إنشاء المجلدات
Object.values(folders).forEach((folder) => {
  fs.mkdirSync(path.join(root, folder), { recursive: true });
});

// نقل الملفات فقط من الجذر
fs.readdirSync(root).forEach((file) => {
  const fullPath = path.join(root, file);

  if (!fs.lstatSync(fullPath).isFile()) return;

  const ext = path.extname(file).toLowerCase();

  if (ext === ".css") {
    fs.renameSync(fullPath, path.join(root, folders.css, file));
  }

  if (ext === ".js" && file !== "organize.js") {
    fs.renameSync(fullPath, path.join(root, folders.js, file));
  }

  if (imageTypes.includes(ext)) {
    fs.renameSync(fullPath, path.join(root, folders.images, file));
  }
});

// جلب كل ملفات HTML
function getHTMLFiles(dir) {
  let results = [];

  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);

    if (fs.lstatSync(full).isDirectory()) {
      results = results.concat(getHTMLFiles(full));
    } else if (file.endsWith(".html")) {
      results.push(full);
    }
  });

  return results;
}

const htmlFiles = getHTMLFiles(root);

// التحقق هل الرابط خارجي
function isExternal(link) {
  return link.startsWith("http") || link.startsWith("//");
}

// تعديل المسارات بأمان
htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");

  // CSS
  content = content.replace(/href="([^"]+\.css)"/g, (match, p1) => {
    if (isExternal(p1) || p1.includes("assets/css")) return match;
    return `href="assets/css/${path.basename(p1)}"`;
  });

  // JS
  content = content.replace(/src="([^"]+\.js)"/g, (match, p1) => {
    if (isExternal(p1) || p1.includes("assets/js")) return match;
    return `src="assets/js/${path.basename(p1)}"`;
  });

  // Images
  content = content.replace(
    /src="([^"]+\.(png|jpg|jpeg|webp|svg|gif))"/g,
    (match, p1) => {
      if (isExternal(p1) || p1.includes("assets/images")) return match;
      return `src="assets/images/${path.basename(p1)}"`;
    }
  );

  fs.writeFileSync(filePath, content);
});

console.log("✅ Smart Organizer Finished Successfully");
