const express = require('express');
const cors = require('cors');

const db = require('./server/db');

const app = express();

const menuItemRouter = require('./routes/menuItem');

const PORT = 3001;

app.use(
  cors({
    origin: `http://localhost:3000`,
  }),
);

app.use(express.json());
app.use('/menuItem', menuItemRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
