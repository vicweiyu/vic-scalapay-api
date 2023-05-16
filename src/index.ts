import { APP_PORT } from './config/config.default';

import app from './app';

app.listen(APP_PORT, () => {
  console.log(`API Server is running on: http://127.0.0.1:${APP_PORT}`);
});
