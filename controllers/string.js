import fs from 'fs';
import path from 'path';

const p = path.join('data','storage.json');

const storedData = () => {
  return JSON.parse(fs.readFileSync(p));
}

export const setString= (req, res, next) => {
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
        console.log(err);
        return res.status(500).json({message:err});
    }
}

export const getString= (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['string'] && allData['string'][key] !== undefined) {
            return res.status(200).json({value:allData['string'][key]});
        } else{
            return res.status(404).json({value:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}

export const getAllString= (req, res, next) => {
    try{
        const key = req.params.key;
        const allData = storedData();
        if (allData['string'] !== undefined) {
            return res.status(200).json({value:allData['string']});
        }else{
            return res.status(404).json({value:'Not Found'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}