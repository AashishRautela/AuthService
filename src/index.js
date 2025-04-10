const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
const db = require('./models/index.js');
app.get('/server/health', (req, res) => {
  res.send({
    success: true,
    message: 'Server is running'
  });
});
try {
  const startService = async () => {
    if (process.env.DB_SYNC) {
      await db.sequelize.sync({ alert: true });
    }
    app.listen(ServerConfig.PORT, (req, res) => {
      console.log(`server is running in port ${ServerConfig.PORT}`);
    });
  };

  startService();
} catch (error) {
  console.log('error while starting the service --->', error.message);
}
