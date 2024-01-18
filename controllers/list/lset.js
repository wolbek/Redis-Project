
// import redisClient from "./redisclient.js";
import redisClient from "../../redisclient.js";


redisClient.on('connect', () => {
    console.log('Redis lset connected');
});




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

    const elementsToPush = Array.isArray(values) ? values : [values];

    redisClient.lpush(listKey, elementsToPush, (err, newLength) => {
      if (err) {
        console.error('Error pushing elements to the list:', err);
        callback(err, null);
      } else {
        console.log('Elements pushed to the left end of the list. New list length:', newLength);
        const responseObject = {
            newLength,
            elementsToPush,
          };
        callback(null, responseObject );
      }
    });
  };

  export const rpushToList = (listKey, values, callback) => {
    // values is an array of elements to be pushed to the left end of the list
    const elementsToPush = Array.isArray(values) ? values : [values];
    
    redisClient.rpush(listKey, elementsToPush, (err, newLength) => {
      if (err) {
        console.error('Error pushing elements to the list:', err);
        callback(err, null);
      } else {
        console.log('Elements pushed to the right end of the list. New list length:', newLength);
        const responseObject = {
            newLength,
            elementsToPush,
          };
        callback(null, responseObject );
      }
    });
  };

  export const lposInList = (listKey, element, callback) => {
    redisClient.lpos(listKey, element, (err, position) => {
      if (err) {
        console.error('Error getting position of the element in the list:', err);
        callback(err, null);
      } else {
        console.log(`Position of element '${element}' in the list: ${position}`);
        callback(null, position);
      }
    });
  };



