import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/config.js';

connectDB();

app.listen(config.app.port, () => {
    console.log(`Server running on http://localhost:${config.app.port}`);
});