import type { AstroIntegration } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pdf } from 'pdf-to-img';

export default function pdfThumbnailGenerator(): AstroIntegration {
  return {
    name: 'pdf-thumbnail-generator',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        logger.info('Generating PDF thumbnails...');
        const certsDir = path.join(process.cwd(), 'src/content/certificates');
        const outputDir = path.join(process.cwd(), 'public/images/certificates');
        const publicPdfsDir = path.join(process.cwd(), 'public/certificates');
        
        try {
          await fs.mkdir(outputDir, { recursive: true });
          await fs.mkdir(publicPdfsDir, { recursive: true });
          
          async function findPdfs(dir: string): Promise<string[]> {
            let entries;
            try {
              entries = await fs.readdir(dir, { withFileTypes: true });
            } catch (e) {
              return [];
            }
            
            const files = await Promise.all(entries.map(async (entry) => {
              const res = path.resolve(dir, entry.name);
              return entry.isDirectory() ? findPdfs(res) : res;
            }));
            
            return files.flat().filter(file => file.endsWith('.pdf'));
          }

          const pdfFiles = await findPdfs(certsDir);

          if (pdfFiles.length === 0) {
            logger.info('No PDF certificates found.');
            return;
          }

          for (const pdfPath of pdfFiles) {
            const pdfFilename = path.basename(pdfPath);
            const basename = path.basename(pdfPath, '.pdf');
            const outputPath = path.join(outputDir, `${basename}.png`);
            const publicPdfPath = path.join(publicPdfsDir, pdfFilename);
            
            // Copy PDF to public directory so it can be downloaded/viewed by the browser
            try {
              await fs.copyFile(pdfPath, publicPdfPath);
            } catch (err) {
              logger.error(`Failed to copy PDF ${pdfFilename} to public directory: ${err}`);
            }

            try {
              await fs.access(outputPath);
              logger.info(`Skipping ${basename}.png (already exists)`);
              continue;
            } catch {
              // file doesn't exist, generate it
            }

            try {
              logger.info(`Generating thumbnail for ${basename}...`);
              // scale: 2 for higher resolution thumbnail
              const document = await pdf(pdfPath, { scale: 2 });
              const page1Buffer = await document.getPage(1);
              await fs.writeFile(outputPath, page1Buffer);
              logger.info(`Generated ${basename}.png`);
            } catch (err) {
              logger.error(`Failed to generate thumbnail for ${basename}: ${err}`);
            }
          }
        } catch (err) {
          logger.error(`Thumbnail generation failed: ${err}`);
        }
      }
    }
  };
}
