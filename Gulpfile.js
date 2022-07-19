"use strict";

const gulp = require("gulp");
const run = require("gulp-run-command").default;
const pluginDir = "wp-plugin-ljs-map";

gulp.task("build:clean", run("rm -rf ./dist"));

gulp.task(
  "npm:install",
  run("npm install", { cwd: "src/" + pluginDir + "/" })
);

gulp.task(
  "build:build",
  run("npm run build", { cwd: "src/" + pluginDir + "/" })
);

gulp.task(
  "develop:start",
  run("npm run start", { cwd: "src/" + pluginDir + "/" })
);

gulp.task("build:copy:build", () =>
  gulp
    .src(["src/" + pluginDir + "/build/**/*"])
    .pipe(gulp.dest("./dist/" + pluginDir + "/build/"))
);

gulp.task("build:copy:pluginFile", () =>
  gulp.src(["src/index.php"]).pipe(gulp.dest("./dist/"))
);

gulp.task(
  "build",
  gulp.series([
    "build:clean",
    "npm:install",
    "build:build",
    "build:copy:build",
    "build:copy:pluginFile",
  ])
);

gulp.task(
    "dev",
    gulp.series([
      "npm:install",
      "develop:start",
    ])
  );
