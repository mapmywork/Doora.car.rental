import 'dotenv/config';
import { redis } from './src/lib/redis';

async function testRedis() {
  console.log("Testing Redis connection...");
  const startTime = Date.now();
  try {
    if (!redis) {
      console.log("Redis client is null (disabled).");
      return;
    }
    const result = await redis.ping();
    console.log(`Redis ping result: ${result} (took ${Date.now() - startTime}ms)`);
  } catch (error) {
    console.error(`Redis error (took ${Date.now() - startTime}ms):`, error);
  }
}

testRedis().catch(console.error);
