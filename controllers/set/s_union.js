import express from 'express'
import redisClient from '../../redisclient.js'

export const saddToSet = (setKey, members, callback) => {
    const membersToAdd = Array.isArray(members) ? members : [members];
  
    redisClient.sadd(setKey, membersToAdd, (err, addedMembersCount) => {
      if (err) {
        console.error('Error adding members to the set:', err);
        callback(err, null);
      } else {
        console.log('Members added to the set. Number of added members:', addedMembersCount);
  
        // Get the added members
        const addedMembers = membersToAdd;
  
        // Create the response object
        const responseObject = {
          addedMembersCount,
          addedMembers,
        };
  
        callback(null, responseObject);
      }
    });
  };


  export const getsetmembers = (setKey ,  callback)=>{
    redisClient.smembers(setKey , (err , val)=>{
        if (err) {
            console.error('Error adding members to the set:', err);
            callback(err, null);
        }
        else{
            console.log('members', val)
            callback(null , val)
        }

        
    })
  }