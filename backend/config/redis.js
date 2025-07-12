import Redis from "ioredis";
import { config as configDotenv } from "dotenv";

console.log("UPSTASH_REDIS_URL:", process.env.UPSTASH_REDIS_URL);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv({ path: path.join(__dirname, "../../.env") });


if (!process.env.UPSTASH_REDIS_URL) {
    console.error("❌ UPSTASH_REDIS_URL not found in .env");
    process.exit(1);
}

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
    tls: {} // Upstash requires TLS, 'rediss://' auto-enables this, but this ensures safety
});

// Test connection
redis.on('connect', () => {
    console.log('✅ Connected to Upstash Redis');
});

redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});

// (async () => {
//     try {
//         await redis.set('foo', 'bar');
//         const value = await redis.get('foo');
//         console.log('Value from Redis:', value);
//         process.exit(0);
//     } catch (error) {
//         console.error('❌ Error during Redis operations:', error);
//         process.exit(1);
//     }
// })();

export default redis;
