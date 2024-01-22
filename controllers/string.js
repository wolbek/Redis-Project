import fs from 'fs';
import path from 'path';

const p = path.join('data','storage.json');

const storedData = () => {
  return JSON.parse(fs.readFileSync(p));
}

export const setString = (req, res, next) => {
    try{
        const field = req.body;

        const allData = storedData();

        if(allData['string']===undefined){
            allData['string'] = {};
        }

        for(let string in field){
            allData['string'][string]=field[string];
        }

        fs.writeFileSync(p, JSON.stringify(allData));
        return res.status(200).json({message:'Successfully saved.'});
    }
    catch(err){
        next(err);
    }
}

export const getString = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['string'] && allData['string'][key] !== undefined) {
            return res.status(200).json({response:allData['string'][key]});
        } else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        next(err);
    }
}

export const getAllString = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['string'] !== undefined) {
            return res.status(200).json({response:allData['string']});
        }else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        next(err);
    }
}

export const deleteString = (req, res, next) => {
    try{
        const key = req.body.key;
        const allData = storedData();
        if (allData['string'] && allData['string'][key] !== undefined) {
            const {[key]:deletedStringValue, ...newData} = allData['string'];
            allData['string'] = newData;
            fs.writeFileSync(p, JSON.stringify(allData));
            return res.status(200).json({
                response:`Successfully deleted.`,
                deletedValue: deletedStringValue
            });
        } else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        next(err);
    }
}

export const getStringLength = (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['string'] && allData['string'][key] !== undefined) {
            return res.status(200).json({response:allData['string'][key].length});
        } else{
            return res.status(404).json({message:'Not Found'});
        }
    }
    catch(err){
        next(err);
    }
}