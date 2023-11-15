export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  kafka: {
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
    connectionTimeout: 5000,
  },
  confluentRegistry: {
    host: process.env.SCHEMA_REGISTRY_HOST,
    api_key: process.env.SCHEMA_REGISTRY_API_KEY,
    api_secret: process.env.SCHEMA_REGISTRY_API_SECRET,
  },
});
