import fs from "fs";
import { ServerSettings } from "../db/models/server/server.js";
export const reNameResizedImages = async () => {
  const uploadsFolderPath = "./uploads/portfolio";
  const serverSettings = await ServerSettings.findOne({
    name: `server-settings`,
  });
  if (serverSettings.reNameFixed === true) {
    return;
  } else {
    serverSettings.reNameFixed = true;
    await serverSettings.save().then(() => {
      try {
        // Get the list of files in the uploads folder
        const files = fs.readdirSync(uploadsFolderPath);

        // Iterate over each file
        for (const file of files) {
          // Check if it's an image file and contains "_resized" in the file name
          if (
            (file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".png") ||
              file.endsWith(".jfif")) &&
            file.includes("resized_")
          ) {
            const filePath = `${uploadsFolderPath}/${file}`;

            // Remove the "_resized" string from the file name
            const newFileName = file.replace("resized_", "");
            const newFilePath = `${uploadsFolderPath}/${newFileName}`;
            console.log(newFileName);
            // Rename the file
            fs.renameSync(filePath, newFilePath);
            console.log("File renamed successfully:", newFilePath);
          }
        }
      } catch (error) {
        console.error("Error renaming resized images:", error);
      }
    });
  }
};
