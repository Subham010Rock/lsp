import { setupTypeAcquisition } from "@typescript/ata";
import typescript from "typescript";

export function configureATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata-project",
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code: string, path: string) => {
        // console.log("ATA received:", path);
        // Add the type definition to Monaco
        onDownloadFile(code, path);
      },
      started: () => {
        console.log("ATA start");
      },
      progress: (_downloaded: number, _total: number) => {
        // console.log(`ATA progress: ${downloaded} / ${total}`);
      },
      finished: (files) => {
        console.log(`ATA done. Downloaded ${files.size} files.`);
      },
    },
  });

  return ata;
}
