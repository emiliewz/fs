const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(3001, () => {
  logger.info(`Server running on port ${config.PORT}`)
})