import { promises as fs } from 'node:fs';
import { pdf } from 'pdf-to-img';

async function main() {
  try {
    const document = await pdf('docs/certificates/certificate-of-completion-for-ai-hacking-101.pdf', { scale: 1 });
    const page1Buffer = await document.getPage(1);
    await fs.writeFile('test-thumb.png', page1Buffer);
    console.log("Success");
  } catch(e) {
    console.error(e);
  }
}
main();
