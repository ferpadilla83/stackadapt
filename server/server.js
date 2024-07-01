import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let bids = [];

// Serve the form for submitting bids
app.get('/', (req, res) => {
  console.log('GET /');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to submit a bid
app.post('/submitBid', (req, res) => {
  console.log('POST /submitBid', req.body);
  const { bidAmount, bidderName } = req.body;
  if (!bidAmount || !bidderName) {
    console.log('Invalid input');
    return res.status(400).send('Invalid input');
  }
  bids.push({ bidAmount: parseFloat(bidAmount), bidderName });
  console.log('Bid submitted:', bids);
  return res.status(200).send('Bid submitted');
});

// Endpoint to get the dashboard with the winning bid
app.get('/dashboard', (req, res) => {
  console.log('GET /dashboard');
  if (bids.length === 0) {
    console.log('No bids submitted');
    return res.send('<div class="no-bids">No bids submitted</div>');
  }
  const winningBid = bids.reduce((max, bid) => bid.bidAmount > max.bidAmount ? bid : max, { bidAmount: 0 });
  console.log('Winning bid:', winningBid);
  return res.send(`
    <div class="winning-bid">Winning Bid: ${winningBid.bidAmount} by ${winningBid.bidderName}</div>
    <div class="bid-details">${bids.map(bid => `${bid.bidderName}: ${bid.bidAmount}`).join('<br>')}</div>
  `);
});

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
