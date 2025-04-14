// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const estimateRoutes = require('./controller/estimate.js');

app.use(cors());


app.use('/api/estimate', estimateRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
