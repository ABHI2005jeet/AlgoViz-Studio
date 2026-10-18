import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';

function waitForServer(url, timeout = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (_res) => {
        resolve();
      }).on('error', (err) => {
        if (Date.now() - start > timeout) {
          reject(new Error('Server wait timed out: ' + err.message));
        } else {
          setTimeout(check, 200);
        }
      });
    };
    check();
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function stepForward(page, steps) {
  for (let i = 0; i < steps; i++) {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find(b => b.textContent.trim() === 'Next');
      if (nextBtn) nextBtn.click();
    });
    await sleep(40);
  }
}

async function run() {
  console.log('Building project...');
  // We already built, but let's make sure
  console.log('Starting preview server on port 5173...');
  const server = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '5173'], {
    stdio: 'ignore'
  });

  try {
    await waitForServer('http://localhost:5173');
    console.log('Server is ready. Launching headless Chrome...');

    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      defaultViewport: { width: 1366, height: 850, deviceScaleFactor: 2 },
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
    });

    const page = await browser.newPage();

    // 1. Overview / Banner
    console.log('Capturing overview...');
    await page.goto('http://localhost:5173/sorting', { waitUntil: 'networkidle0' });
    await sleep(500);
    await stepForward(page, 20);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/overview.png' });
    await page.screenshot({ path: 'screenshots/bubble-sort.png' });

    // 2. Merge Sort
    console.log('Capturing Merge Sort...');
    await page.select('select', 'merge');
    await sleep(500);
    await stepForward(page, 24);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/merge-sort.png' });

    // 3. Quick Sort
    console.log('Capturing Quick Sort...');
    await page.select('select', 'quick');
    await sleep(500);
    await stepForward(page, 18);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/quick-sort.png' });

    // 4. BFS
    console.log('Capturing BFS...');
    await page.goto('http://localhost:5173/graphs', { waitUntil: 'networkidle0' });
    await sleep(500);
    await stepForward(page, 32);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/bfs.png' });

    // 5. DFS
    console.log('Capturing DFS...');
    await page.select('select', 'dfs');
    await sleep(500);
    await stepForward(page, 28);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/dfs.png' });

    // 6. Dijkstra
    console.log('Capturing Dijkstra...');
    await page.select('select', 'dijkstra');
    await sleep(500);
    await stepForward(page, 35);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/dijkstra.png' });

    // 7. Dynamic Programming (LCS)
    console.log('Capturing LCS...');
    await page.goto('http://localhost:5173/dp', { waitUntil: 'networkidle0' });
    await sleep(500);
    await stepForward(page, 25);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/lcs.png' });

    // 8. Recursion (Fibonacci)
    console.log('Capturing Fibonacci Tree...');
    await page.goto('http://localhost:5173/recursion', { waitUntil: 'networkidle0' });
    await sleep(500);
    await stepForward(page, 12);
    await sleep(300);
    await page.screenshot({ path: 'screenshots/fibonacci.png' });

    console.log('All screenshots captured successfully!');
    await browser.close();
  } finally {
    if (server && server.pid) {
      spawn('taskkill', ['/F', '/T', '/PID', server.pid.toString()], { stdio: 'ignore' });
    }
  }
}

run().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
