export default {
  enabled: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:1337",
    "your-production-domain.com",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  headers: ["Content-Type", "Authorization", "Origin", "Accept"],
  keepHeaderOnError: true,
};
