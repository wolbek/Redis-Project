import fs from 'fs';
import path from 'path';

const p = path.join('data','storage.json');

const storedData = () => {
  return JSON.parse(fs.readFileSync(p));
};

export const setHashField= (req, res, next) => {
    try{
        const {key, ...fields} = req.body;

        const allData = storedData();

        if(!allData['hash']){
            allData['hash'] ={};
        }

        for(let fieldName in fields){
            allData['hash'][fieldName]=fields[fieldName];
        }
        
        fs.writeFileSync(p, JSON.stringify(allData));
        return res.status(200).json({message:'Successfully saved.'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};

export const getHashField = (req, res, next) => {
    try{
        const {key, field} = req.params;
        const allData = storedData();
        if (allData['hash'] && allData['hash'][key] && allData['hash'][key][field] !== undefined) {
            return res.status(200).json({response:allData['hash'][key][field]});
        }else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};

export const getHashAllFields = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['hash'] && allData['hash'][key] !== undefined){
            return res.status(200).json({response:allData['hash'][key]});
        }else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};

export const getAllHash = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['hash'] !== undefined){
            return res.status(200).json({response:allData['hash']});
        }else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};

export const deleteHashField = (req, res, next) => {
    try{
        const {key, field} = req.body;
        const allData = storedData();

        if (allData['hash'] && allData['hash'][key] && allData['hash'][key][field]!== undefined){
           
            const {[field]: deletedHashFieldValue, ...newHashFields} = allData['hash'][key];
            allData['hash'][key] = newHashFields; 

            fs.writeFileSync(p, JSON.stringify(allData));
            return res.status(200).json({
                response:`Successfully deleted.`,
                deletedValue: `${field}:${deletedHashFieldValue}`
            });
        
        }
        else{
            return res.status(404).json({message:'Not Found'});
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};

export const findHashLength = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['hash'] && allData['hash'][key] !== undefined){
            return res.status(200).json({response:Object.keys(allData['hash'][key]).length});
        }else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
};