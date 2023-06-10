import fs from "fs";
import sharp from "sharp";
import { ServerSettings } from "../db/models/server/server.js";

export const makeSizeSmaller = async () => {
  let serverSettings = await ServerSettings.find({});
  if (serverSettings.length === 0) {
    const newServerSettings = new ServerSettings({
      name: `server-settings`,
      portfolioReSize: false,
      reNameFixed: false,
    });
    await newServerSettings.save();
  } else if (serverSettings.length !== 0) {
    if (serverSettings[0] && serverSettings[0].portfolioReSize === true) {
      return;
    }
  }
  const uploadsFolderPath = "./uploads/portfolio";

  try {
    let settings = await ServerSettings.findOne({ name: `server-settings` });
    settings.portfolioReSize = true;
    await settings.save();

    // Get the list of files in the uploads folder
    const files = fs.readdirSync(uploadsFolderPath);

    // Iterate over each file
    for (const file of files) {
      // Check if it's an image file (you can customize this check based on your file types)
      if (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".jfif")
      ) {
        // Construct the input and output file paths
        const inputFilePath = `${uploadsFolderPath}/${file}`;

        // Remove the "resized_" prefix from the file name
        const newFileName = file.replace("resized_", "");
        const outputFilePath = `${uploadsFolderPath}/resized_${newFileName}`;
        const tempOutputFilePath = `${uploadsFolderPath}/temp_${newFileName}`;

        // Set the desired width and height for the resized image
        const desiredWidth = 800;
        const desiredHeight = 600;

        // Resize the image to a temporary file
        await sharp(inputFilePath)
          .resize(desiredWidth, desiredHeight)
          .toFile(tempOutputFilePath);

        console.log("Image resized successfully:", tempOutputFilePath);

        // Delete the original file
        fs.unlinkSync(inputFilePath);
        console.log("Original file deleted successfully:", inputFilePath);

        // Replace the original file with the resized image
        fs.renameSync(tempOutputFilePath, outputFilePath);
        console.log("Resized image replaced successfully:", outputFilePath);
      }
    }
  } catch (error) {
    console.error("Error resizing images:", error);
  }
};
