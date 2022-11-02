/**
 * /**
* A utility function which takes query as input & executes in database
* @author Esari Praneeth kumar
* @ModifiedBy Esari Praneeth kumar
* @method
* @param {String} query - A string representing a query to execute 
* @requires mysqlPool A connected mySql instance of application
* @returns promise which resolves when query execution sucessfull & rejects when error occurs
*--/
const executeSqlQueryWithoutParams = query => {
    return new Promise((resolve, reject) => {
        mysqlPool.query(query, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
 ***/






/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable node/no-unsupported-features/es-syntax */

const {
    executeSqlQuery,
    executeSqlQueryWithoutParams
} = require('../utils/utilities');
const yaml = require('js-yaml'),
    fs = require('fs'),
    config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
/*Reusable global variable used in all Dao functions */
let logicError,query;
/**
 * A MySql DAO module to interact with database through queries
 * @author Esari Praneeth kumar
 * @ModifiedBy Esari Praneeth kumar
 * @module 
 */
const mySqlDao = {
    /**
    * A insert Dao to insert a record in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} insertData - An Object containing keys as column name , values as insert values of column for insertion
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    insert : async (tablename,insertData)=>{
        if(!tablename||!(insertData.toString()==='[object Object]'))
        {
            logicError = new Error('Insert query missing tablename or insert values');
            logicError.statusCode=500;
            throw logicError;
        }
        let insertKeys= Object.keys(insertData);
        let insertValues = Object.values(insertData);
        let insertValueLiteral='';
        insertValues.forEach((value,index)=>{
            if(index!=0){
                insertValueLiteral+=',';
            }
            insertValueLiteral+=value;

        });
        query=`INSERT INTO ${config.connectiondb.database}.${tablename} 
                    (${insertKeys}) values (${insertValueLiteral})`; 
         
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A insertWithSelect Dao to insert a record using select in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} insertTablename - A string representing a insert Table name.
    * @param {String} selectTablename - A string representing a select Table name.
    * @param {Object} insertColumns - An Array containing all insert columns names
    * @param {Object} selectColumns - An Array containing all select columns (with some direct values -- optional)
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
    * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    insertWithSelect : async (insertTablename,selectTablename,insertColumns,
        selectColumns,conditionData={},orderBy=false,groupBy=false,limitValue=0)=>{
        if(!insertTablename||
            !selectTablename||!Array.isArray(selectColumns)||!Array.isArray(insertColumns))
        {
            logicError = new Error('insertWithSelect query missing input params');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ' AND ');
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        query=`INSERT INTO ${config.connectiondb.database}.${insertTablename} (${insertColumns})
               SELECT ${selectColumns} FROM  ${config.connectiondb.database}.${selectTablename}
                ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}
                `; 
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A insertMultiple Dao to insert multiple records in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} insertData - An Object containing keys as column name , values as  multiple insert values 
    * separated by comma ',' of all columns for insertion
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    insertMultiple : async (tablename,insertData)=>{
        if(!tablename||!(insertData.toString()==='[object Object]'))
        {
            logicError = new Error('Insert multiple query missing tablename or multiple insert values');
            logicError.statusCode=500;
            throw logicError;
        }
        let insertKeys= Object.keys(insertData);
        let insertValues= Object.values(insertData);
        /* a temporary array to have multiple objects containing key as column name & value as same as intial comma separated value*/
        let insertDataArray = insertValues[0].split(',').map(()=>{
            return {...insertData};
        });
        /* Making temporary array of multiple objects  to have only particular indiviual value instead intial comma separated value*/
        insertValues.forEach((insertValue,keyIndex)=>{
            insertValue.split(',').forEach((value,index)=>{
                insertDataArray[index][insertKeys[keyIndex]]=value.trim().replace('\n','');
            });
        });
        query=`INSERT INTO ${config.connectiondb.database}.${tablename} 
                    (${insertKeys}) values `;
        let valueLiteral='';
        /* Making a value literal of query format for a query  */
        insertDataArray.forEach((values,index)=>{
            index!==0 && (valueLiteral += ',');
            valueLiteral+='(';
            Object.values(values).forEach((value,index)=>{
                index!==0 && (valueLiteral += ',');
                valueLiteral+=`'${value}'`; 
            });
            valueLiteral+=')';
        });
        query+=valueLiteral; 
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A select Dao to get selected columns values or all columns values of a record in database with only 'and' operator
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Array} selectColumns - An array containing all columns names to select 
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * or if empty object represents no where condition
    * @param {Boolean} [ selectAllFlag=false ] - A Boolean value to where to have a * in query along with all select columns
    * @param {Boolean} [ distinct=false ] - A Boolean value to where to have a distinct selection
    * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
    * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    select : async (tablename,selectColumns,conditionData={},selectAllFlag=false,distinct=false,orderBy=false,groupBy=false,limitValue=0)=>{
        if(!tablename||!Array.isArray(selectColumns)||!(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('select query missing tablename or select columns or incorrect where condition parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ' AND ');
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        let selectColumnLiteral =  selectColumns.length?(selectColumns):'';
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        query=`SELECT
                  ${distinct?'distinct':''}
                  ${selectAllFlag ? ('*'+ (selectColumns.length?',':'')):''}
                  ${selectColumnLiteral}
                  FROM ${config.connectiondb.database}.${tablename} 
                   ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}`;  

        return executeSqlQueryWithoutParams(query);

    },
    /**
    * A selectWithAnyOperator Dao to get selected columns values or all columns values of a record in database with any operator
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Array} selectColumns - An array containing all columns names to select 
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as an  array  with 1st entry as value , 2nd entry as operator 
    * 3rd entry is to indicate whether we dont need quotes for that value (4th entry is operator used for joining with beside condition)-> optional to used in where condition or if empty object represents no where condition
    * @param {Boolean} [ selectAllFlag=false ] - A Boolean value to where to have a * in query along with all select columns
    * @param {Boolean} [ distinct=false ] - A Boolean value to where to have a distinct selection
    * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
    * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    selectWithAnyOperator : async (tablename,selectColumns,
        conditionData={},selectAllFlag=false,distinct=false,
        orderBy=false,groupBy=false,limitValue=0)=>{
        if(!tablename||!Array.isArray(selectColumns)
        ||!(conditionData.toString()==='[object Object]'))
        {
            logicError = new 
            Error(`selectWithAnyOperator query missing
             tablename or select columns or incorrect where condition parameters`);
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        let quoteFlag = true;
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            quoteFlag = true;
            if(conditionData[conditionColumnKey][2] && conditionData[conditionColumnKey][2]==true){
                quoteFlag = false;
            }
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += conditionData[conditionColumnKey][3] ?
                ' '+conditionData[conditionColumnKey][3]:' AND ');
            whereCondition += ` ${conditionColumnKey} ${
                conditionData[conditionColumnKey][1]} ${quoteFlag?`${conditionData[conditionColumnKey][0]}`: conditionData[conditionColumnKey][0]}`;
        });
        let selectColumnLiteral =  selectColumns.length?(selectColumns):'';
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        query=`SELECT
                  ${distinct?'distinct':''}
                  ${selectAllFlag ? ('*'+ (selectColumns.length?',':'')):''}
                  ${selectColumnLiteral}
                  FROM ${config.connectiondb.database}.${tablename} 
                   ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}`;
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A selectWithAliases Dao to get selected columns values with some aliases name or all columns values of a record in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} selectColumnsWithAliases - An object containing all columns names as keys and alias names as values to select .
    * (alias name can be empty if we dont want alias for a particular column)
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * or if empty object represents no where condition
    * @param {Boolean} [ selectAllFlag=false ] - A Boolean value to where to have a * in query along with all select columns
    * @param {Boolean} [ distinct=false ] - A Boolean value to where to have a distinct selection
    * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
    * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    selectWithAliases : async (tablename,
        selectColumnsWithAliases,conditionData={},selectAllFlag=false,distinct=false,orderBy=false,groupBy=false,limitValue=0)=>{
        if(!tablename||
        !(selectColumnsWithAliases.toString()==='[object Object]')||
        !(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('select with aliases query missing input parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ' AND ');
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        let aliasesLiteral = '';
        /* Making a select column alias literal of query format for a query  */
        Object.keys(selectColumnsWithAliases).forEach((columnKey,index)=>{
            index!==0 && (aliasesLiteral+=',');
            aliasesLiteral+=
        ` ${columnKey}  ${selectColumnsWithAliases[columnKey]?
            `AS ${selectColumnsWithAliases[columnKey]}`:''}`;
        });
        aliasesLiteral+=' ';
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        query=`SELECT
              ${distinct?'distinct':''}
              ${selectAllFlag ? '*':''}
              ${(selectAllFlag && aliasesLiteral.length) ?' , ':''}
              ${aliasesLiteral.length?(aliasesLiteral):''}
              FROM ${config.connectiondb.database}.${tablename} 
               ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}`;  

        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A selectWithAliasesAnyOperator Dao to get selected columns values with some aliases name or all columns values of a record in database with any operator
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} selectColumnsWithAliases - An object containing all columns names as keys and alias names as values to select .
    * (alias name can be empty if we dont want alias for a particular column)
   * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as an  array  with 1st entry as value , 2nd entry as operator 
    * 3rd entry is to indicate whether we dont need quotes for that value (4th entry is operator used for joining with beside condition)-> optional to used in where condition or if empty object represents no where condition
    * @param {Boolean} [ selectAllFlag=false ] - A Boolean value to where to have a * in query along with all select columns
    * @param {Boolean} [ distinct=false ] - A Boolean value to where to have a distinct selection
    * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
    * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    selectWithAliasesAnyOperator : async (tablename,
        selectColumnsWithAliases,conditionData={},selectAllFlag=false,distinct=false,orderBy=false,groupBy=false,limitValue=0)=>{
        if(!tablename||
        !(selectColumnsWithAliases.toString()==='[object Object]')||
        !(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('selectWithAliasesAnyOperator query missing input parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        let quoteFlag;
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            quoteFlag = true;
            if(conditionData[conditionColumnKey][2] && conditionData[conditionColumnKey][2]==true){
                quoteFlag = false;
            }
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += conditionData[conditionColumnKey][3] ?
                ' '+conditionData[conditionColumnKey][3]:' AND ');
            whereCondition += ` ${conditionColumnKey} ${
                conditionData[conditionColumnKey][1]} ${quoteFlag?`${conditionData[conditionColumnKey][0]}`: conditionData[conditionColumnKey][0]}`;
        });
        let aliasesLiteral = '';
        /* Making a select column alias literal of query format for a query  */
        Object.keys(selectColumnsWithAliases).forEach((columnKey,index)=>{
            index!==0 && (aliasesLiteral+=',');
            aliasesLiteral+=
        ` ${columnKey}  ${selectColumnsWithAliases[columnKey]?
            `AS ${selectColumnsWithAliases[columnKey]}`:''}`;
        });
        aliasesLiteral+=' ';
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        query=`SELECT
              ${distinct?'distinct':''}
              ${selectAllFlag ? '*':''}
              ${(selectAllFlag && aliasesLiteral.length) ?' , ':''}
              ${aliasesLiteral.length?(aliasesLiteral):''}
              FROM ${config.connectiondb.database}.${tablename} 
               ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}`;  
        return executeSqlQueryWithoutParams(query);
    },

    /**
    * A joins Dao to get selected columns values with some aliases name or all columns values of a record in database by joining given tables on condition
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {Object} joinTablesData - An array of objects where each object contains three keys with tablename,aliasName,joinCondition with their respective value in query
    * @param {Object} selectColumnsWithAliases - An object containing all columns names as keys and alias names as values to select or if empty select all columns.
    * (alias name can be empty if we dont want alias for a particular column)
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * or if empty object represents no where condition
    * @param {Boolean} [ andFlag=true ] - A Boolean value to  check whether we need condition as AND otherwise OR
    * @param {Boolean} [ distinct=false ] - A Boolean value to where to have a distinct selection
 * @param {String} [ orderBy=false ] - String representing a order by column value . By default it will be false intially 
    * @param {String} [ groupBy=false ] - String representing a group by column value . By default it will be false intially
   * @param {Number} [  * @param {Number} [ limitValue=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value=0 ] - limit value if its zero then no limit otherwise limit will be applied with specified value
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    joins : async (joinTablesData,
        selectColumnsWithAliases,conditionData={},andFlag=true,distinct=false,orderBy=false,groupBy=false,limitValue=0)=>{
        if(!Array.isArray(joinTablesData)||
            !(selectColumnsWithAliases.toString()==='[object Object]')||
            !(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('join query missing input parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        let conditionJoin =andFlag?'AND':'OR';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ` ${conditionJoin} `);
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        let aliasesLiteral = '';
        /* Making a select column alias literal of query format for a query  */
        Object.keys(selectColumnsWithAliases).forEach((columnKey,index)=>{
            index!==0 && (aliasesLiteral+=',');
            aliasesLiteral+=
            ` ${columnKey}  ${selectColumnsWithAliases[columnKey]?
                `AS ${selectColumnsWithAliases[columnKey]}`:''}`;
        });
        aliasesLiteral+=' ';
        let joinLiteral = ` ${config.connectiondb.database}.${joinTablesData[0].tablename} ${joinTablesData[0].aliasName} `;
        let limitLiteral = limitValue ? (' LIMIT '+ limitValue) : '';
        let orderByLiteral = orderBy ? (' ORDER BY '+ orderBy) : '';
        let groupByLiteral = groupBy ? (' GROUP BY '+ groupBy) : '';
        /* Making a select column alias literal of query format for a query  */
        joinTablesData.forEach((joinTableData,index)=>{
            if(index!=0){
                joinLiteral+='LEFT JOIN ';
                joinLiteral+=
               `  ${config.connectiondb.database}.${joinTableData.tablename} ${joinTableData.aliasName}
                  ON (${joinTableData.joinCondition})
                  
               `;
            }
          
        });
        aliasesLiteral+=' ';
        query=`SELECT
                  ${distinct?'distinct':''}
                  ${aliasesLiteral.length?aliasesLiteral:'*'}
                  FROM ${joinLiteral} 
                   ${whereCondition} ${orderByLiteral} ${groupByLiteral} ${limitLiteral}`;  
        
        query=query.trim().replace('\n',''); /*triming & replacing newlines with empty string created by string template*/
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A update Dao to update a record in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} updatedData - An object containing all columns names as keys and update values as value to update.
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * or if empty object represents no where condition
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    update : async (tablename,updatedData,conditionData={})=>{
        if(!tablename||!(updatedData.toString()==='[object Object]')||!(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('update query missing tablename or updated columns or incorrect where condition parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ' AND ');
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        /* Making a set literal of query format for a query  */
        let setCondition = '';
        Object.keys(updatedData).forEach((setConditionColumnKey,index)=>{
            index!==0 && (setCondition += ' , ');
 
            setCondition += `${setConditionColumnKey}=${updatedData[setConditionColumnKey]}`;
        });
        query=`update ${config.connectiondb.database}.${tablename} SET ${setCondition}
                   ${whereCondition}`;
        console.log('query ========', query);
        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A delete Dao to delete a record in database
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {String} tablename - A string representing a table name.
    * @param {Object} [ conditionData={} ] - An object containing keys as column names & values as value used in where condition 
    * or if empty object represents no where condition
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    delete : async (tablename,conditionData={})=>{
        if(!tablename||!(conditionData.toString()==='[object Object]'))
        {
            logicError = new Error('delete query missing tablename or incorrect where condition parameters');
            logicError.statusCode=500;
            throw logicError;
        }
        let whereCondition = '';
        /* Making a condition literal of query format for a query  */
        Object.keys(conditionData).forEach((conditionColumnKey,index)=>{
            index===0 && (whereCondition = 'where ');
            index!==0 && (whereCondition += ' AND ');
            whereCondition += `${conditionColumnKey}='${conditionData[conditionColumnKey]}'`;
        });
        query=`DELETE FROM ${config.connectiondb.database}.${tablename} ${whereCondition}`;  

        return executeSqlQueryWithoutParams(query);
    },
    /**
    * A date add Dao to get date by adding some value to it
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @async
    * @memberof mySqlDao
    * @param {Date} date - A string representing a input date.
    * @param {Number} alteredValue - A number representing a increased amount of given unit 
    * @param {Object} unit - A string representing any unit of date to be added to input date
    * @requires executeSqlQueryWithoutParams A utility function which takes query as input & executes in database
    * @returns  query results 
    * @throws throws a custom error along with error code 500 if logical error occurs or throws an error if any internal errors occurs
    */
    dateAdd : async (date,alteredValue,unit)=>{
        if(!date||!alteredValue||!unit)
        {
            logicError = new Error('Input parameters missing for date add sql function');
            logicError.statusCode=500;
            throw logicError;
        }
        query=`SELECT DATE_ADD ("${date}", INTERVAL ${alteredValue} ${unit}) as alteredDate;`; 
        return executeSqlQueryWithoutParams(query);
    }
};
module.exports= mySqlDao;
