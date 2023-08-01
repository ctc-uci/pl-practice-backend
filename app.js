const express = require('express');
const cors = require('cors');

const app = express();

const menuItemRouter = require('./routes/menuItem');

const PORT = 3001;

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  }),
);

app.use(express.json());
app.use('/menuItem', menuItemRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});
