
// import redisClient from "./redisclient.js";
import redisClient from "../../redisclient.js";


redisClient.on('connect', () => {
    console.log('Redis lset connected');
});


const listKey = 'myList';

export const pushValuesToRightEnd = async (values) => {
    try {
        const multi = redisClient.multi();

        multi.rpush(listKey, values);


        const result = await multi.exec();

        console.log('Values pushed to the right end of the list. New list length:', result[0][1]);
    } catch (err) {
        console.error('Error pushing values to the list:', err);
    }
};

export const rpopFromList = (listKey, callback) => {
    redisClient.rpop(listKey, (err, poppedElement) => {
        if (err) {
            console.error('Error popping element from the list:', err);
            callback(err, null);
        } else {
            console.log('Rightmost Popped element from the list:', poppedElement);
            callback(null, poppedElement);
        }
    });
};


export const getListLength = (listKey, callback) => {
    redisClient.llen(listKey, (err, listLength) => {
        if (err) {
            console.error('Error getting list length:', err);
            callback(err, null);
        } else {
            console.log('Length of the list:', listLength);
            callback(null, listLength);
        }
    });
};

export const lpopFromList = (listKey, callback) => {
    redisClient.lpop(listKey, (err, poppedElement) => {
        if (err) {
            console.error('Error popping element from the list:', err);
            callback(err, null);
        } else {
            console.log('Leftmost Popped element from the list:', poppedElement);
            callback(null, poppedElement);
        }
    });
};

export const lpushToList = (listKey, values, callback) => {
    // values is an array of elements to be pushed to the left end of the list
    redisClient.lpush(listKey, values, (err, newLength) => {
      if (err) {
        console.error('Error pushing elements to the list:', err);
        callback(err, null);
      } else {
        console.log('Elements pushed to the left end of the list. New list length:', newLength);
        callback(null, newLength);
      }
    });
  };



