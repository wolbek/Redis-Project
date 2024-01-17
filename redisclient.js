import {Redis} from 'ioredis';

const client = new Redis();

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.on('connect', (err) => {
  console.log('redis connectedd');
});


export default client