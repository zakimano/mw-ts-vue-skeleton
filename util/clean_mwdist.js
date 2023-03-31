const path = require("path");
const fse = require("fs-extra");

// This script is used to delete all files from the mwdist directory.

function main() {
  const mwdist = path.resolve(__dirname, "..", "mwdist");
  if (!fse.existsSync(mwdist)) {
    return;
  }
  const paths_ = fse.readdirSync(mwdist);
  console.log("cleaning mwdist:");
  console.log(paths_);

  paths_.forEach((pth_) => {
    const pth = path.resolve(mwdist, pth_);
    if (fse.existsSync(pth)) {
      console.log(`deleting: ${pth}`);
      fse.rmSync(pth, { recursive: true });
    }
  });
}

main();
