const { OUT_FORMAT_OBJECT } = require('oracledb');
const oracledb = require('oracledb');
oracledb.outFormat = OUT_FORMAT_OBJECT
async function getConnection(){
    try{
        connection = await oracledb.getConnection({
            user: 'fride',
            password: 'fride1105$h',
            connectString: 'localhost:1521/orcl'
        });
        return connection
    } catch(err){
        console.log("NOT connected");
    }
    
}

module.exports = getConnection