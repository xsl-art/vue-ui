/* eslint-disable no-console */
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const componentsDir = resolve(rootDir, "src/components");
const tempDir = resolve(rootDir, ".temp/component-entries");

const externals = ["vue", ...Object.keys(pkg.dependencies)];

function ensureTempDir() {
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });
}

function getComponentNames() {
  return fs
    .readdirSync(componentsDir)
    .filter((name) => fs.statSync(resolve(componentsDir, name)).isDirectory());
}

function writeTempEntry(fileName, content) {
  const filePath = resolve(tempDir, fileName);
  fs.writeFileSync(filePath, content, "utf-8");
  return filePath;
}

async function buildComponent(name) {
  const entryFile = writeTempEntry(
    `${name}.ts`,
    `export { default } from "@/components/${name}";\nexport * from "@/components/${name}";\nimport "@/styles/_var.scss";\nimport "@/components/${name}/style.scss";\n`,
  );

  await build({
    configFile: false,
    root: rootDir,
    publicDir: false,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
    build: {
      outDir: resolve(rootDir, `dist/es/components/${name}`),
      emptyOutDir: true,
      lib: {
        entry: entryFile,
        formats: ["es"],
        fileName: () => "index.mjs",
        cssFileName: "style",
      },
      rollupOptions: {
        external: externals,
        output: {
          exports: "named",
        },
      },
    },
  });
}

async function buildResolver() {
  const entryFile = writeTempEntry(
    "resolver.ts",
    `export * from "@/resolver";\n`,
  );

  await build({
    configFile: false,
    root: rootDir,
    publicDir: false,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
    build: {
      outDir: resolve(rootDir, "dist/es/resolver"),
      emptyOutDir: true,
      lib: {
        entry: entryFile,
        formats: ["es"],
        fileName: () => "index.mjs",
      },
      rollupOptions: {
        external: [...externals, "unplugin-vue-components"],
        output: {
          exports: "named",
        },
      },
    },
  });
}

async function main() {
  ensureTempDir();
  const componentNames = getComponentNames();

  for (const name of componentNames) {
    console.log(`Building component: ${name}`);
    await buildComponent(name);
  }

  console.log("Building resolver");
  await buildResolver();

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("Component build finished");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
