import { setupTypeAcquisition } from "@typescript/ata";
import typescript from "typescript";
import { TypeDefinitionRegistry } from "./TypeDefinitionRegistry";

export interface ATAProgress {
  downloaded: number;
  total: number;
}

export function configureATA(
  onDownloadFile: (code: string, path: string) => void,
  onProgress?: (progress: ATAProgress) => void,
) {
  // Wire up the TypeDefinitionRegistry as the injector
  TypeDefinitionRegistry.setInjector(onDownloadFile);

  const ata = setupTypeAcquisition({
    projectName: "my-ata-project",
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code: string, path: string) => {
        // Route through the registry for deduplication & batch injection
        TypeDefinitionRegistry.register(code, path);
      },
      started: () => {
        console.log("ATA start");
      },
      progress: (downloaded: number, total: number) => {
        if (onProgress) {
          onProgress({ downloaded, total });
        }
      },
      finished: (files) => {
        const stats = TypeDefinitionRegistry.getStats();
        console.log(
          `ATA done. Downloaded ${files.size} files. ` +
            `Registry: ${stats.totalDefinitions} defs, ` +
            `${stats.uniquePackages} packages, ` +
            `${(stats.totalBytes / 1024).toFixed(0)}KB total, ` +
            `${stats.deduplicatedCount} deduplicated`,
        );
      },
    },
  });

  return ata;
}
