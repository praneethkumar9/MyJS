versionExcelValidations : async (req, res, next) => {
    try {
        let { productType, filePath, fileName } = req.body;
        if (!productType || !filePath || !fileName) {
            throw new Error('Either of productType/filePath/fileName fields are missing');
        }
        if (!(productType === 'hwsw' || productType === 'svc')) {
            throw new Error('productType field should have hwsw or svc value');
        }
        let productTypeFlag = (productType === 'hwsw');
        let workbook = new Excel.Workbook();
        let priceErrors = [];
        workbook.xlsx
            .readFile(filePath + fileName)
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            .then(async () => {
                let missingColumns;
                const worksheet = workbook.getWorksheet(1);
                const headerRow = worksheet.getRow(1);
                let headerArray, // array containing all expected header values of excel
                    columnEnd, // expected total column count  of excel
                    prodTypeValidationMsg;
                if(productTypeFlag){
                    headerArray = databaseConfig.hwswVersionExcelHeaders;
                    columnEnd =34;
                    prodTypeValidationMsg = 'This field should contain any of these Hardware,Software,HWAC,3PP,DISC  values';
                }else{
                    headerArray = databaseConfig.svcVersionExcelHeaders;
                    columnEnd =47;
                    prodTypeValidationMsg = 'This field should contain only Service as value';
                }
                const sheetHeaderArray = [];  // array containing  all header values of uploaded excel sheet
                let data = [];  // array containing all block objects
                const errors = {}; // object for maintaining excel errors
                for (let column = 1; column <= columnEnd; column++) {
                    sheetHeaderArray.push(headerRow.getCell(column).value);
                }
                /* comparing expected header values with uploaded excel header values*/
                if (headerArray.toString() !== sheetHeaderArray.toString()) {
                    missingColumns = headerArray.filter(column => !sheetHeaderArray.includes(column));
                    if (missingColumns.length) {
                        throw new Error(
                            missingColumns.toString() +
                            ' column(s) are missing in uploaded excel sheet'
                        );
                    } else {
                        throw new Error('Column order does not match with the expected order');
                    }
                } else {
                    let tempRowindex = 2,
                        tempRow, tempColumn, tempBlockObject, mandatoryHeaders, numberHeaders, dateHeaders,
                        date, booleanHeaders, allowVarPriceValues, blockid, databaseColumns, transportationFeeTypeValues;
                    const currentDate = new Date();
                    const blockIdInfo = {},blockAllMaterialOrActivitiesExpiredCheckInfo = {};
                    const tempExcludedMaterialInfoObject ={} , tempExcludedMaterialBlockInfoObject ={};
                    /* Iterating all rows in uploaded excel for data validation */
                    while (tempRowindex <= worksheet.actualRowCount) {
                        tempRow = worksheet.getRow(tempRowindex);
                        tempColumn = 1;
                        tempBlockObject = {};
                        /* creating temp block object containg all values of that particular row */
                        while (tempColumn <= columnEnd) {
                            tempBlockObject[headerArray[tempColumn - 1]] = tempRow.getCell(tempColumn).value;
                            tempColumn++;
                        }
                        /* checking if any mandatory column data is missing*/
                        mandatoryHeaders = productTypeFlag
                            ? databaseConfig.hwswVersionExcelMandatoryHeaders :
                            databaseConfig.svcVersionExcelMandatoryHeaders;
                        missingColumns = [];
                        mandatoryHeaders.forEach(header => tempBlockObject[header] === null && missingColumns.push(header));
                        if (missingColumns.length) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            //errors.['RowNumber_' + tempRowindex]?.={};
                            errors['RowNumber_' + tempRowindex].mandatoryFields =
                                'Data for following fields are missing: ' +
                                missingColumns.toString();
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        missingColumns = [];
                        
                        if(tempBlockObject['MatGrp5']==='MA'){
                            if(tempBlockObject['LineItem']===null) {
                                typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                //errors.['RowNumber_' + tempRowindex]?.={};
                                errors['RowNumber_' + tempRowindex].lineItemField =
                                'Line Item is mandatory for master material'; 
                                errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                                errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                            }
                            
                            transportationFeeTypeValues = databaseConfig.versionExcelTransportationFeeTypeValues;
                            (tempBlockObject['TransportationFeeType']== null) && (tempBlockObject['TransportationFeeType'] = 'None');
                            if (!transportationFeeTypeValues.includes(tempBlockObject['TransportationFeeType'])) {
                                typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                errors['RowNumber_' + tempRowindex].transportationFeeTypeField =
                                'Transportation Fee Type is mandatory for master material : '+
                                transportationFeeTypeValues.toString(); 
                                errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                                errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                            }
                            // if(tempBlockObject['TransportationFeeType']===null) {
                            //     typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            //     //errors.['RowNumber_' + tempRowindex]?.={};
                            //     errors['RowNumber_' + tempRowindex].transportationFeeField =
                            //     'Transportation Fee Type is mandatory for master material : '+
                            //     transportationFeeTypeValues.toString(); 
                            //     errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            //     errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                            // }
                            
                        }

                        /* checking if transportation fee type column data is not as expected*/
                        transportationFeeTypeValues = databaseConfig.versionExcelTransportationFeeTypeValues;
                        (tempBlockObject['TransportationFeeType']== null) && (tempBlockObject['TransportationFeeType'] = 'None');
                        if (!transportationFeeTypeValues.includes(tempBlockObject['TransportationFeeType'])) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].transportationFeeTypeField =
                                 'The transportation fee type column should contain either of following values: ' +
                                 transportationFeeTypeValues.toString();
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        /* To restrict material part number to 18 characters */
                        if( tempBlockObject['Material'].length > 18){
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].materialField =
                                 'Material of block ' + tempBlockObject.BlockName+ ' is over 18 characters long ' ;
                        }

                        /* checking if any  numeric column data is not as expected*/
                        numberHeaders = productTypeFlag
                            ? databaseConfig.hwswVersionExcelNumberHeaders :
                            databaseConfig.svcVersionExcelNumberHeaders;
                        missingColumns = [];
                        numberHeaders.forEach(header => isNaN(tempBlockObject[header]) && missingColumns.push(header));
                        if (missingColumns.length) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].numericFields =
                                'Data for following fields ' +
                                missingColumns.toString() +
                                ' should be a numeric';
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        /* checking if any  date column data is not as expected*/
                        dateHeaders = productTypeFlag
                            ? databaseConfig.hwswVersionExcelDateHeaders :
                            databaseConfig.svcVersionExcelDateHeaders;
                        missingColumns = [];
                        dateHeaders.forEach(header => {
                            if(tempBlockObject[header] != null){
                                date = new Date(tempBlockObject[header]).getDate();
                                isNaN(date) && missingColumns.push(header);
                            }
                        });

                        if (missingColumns.length) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].dateFields =
                                'Data for following fields ' +
                                missingColumns.toString() +
                                ' should be in date format';
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        /* checking if any  boolean column data is not as expected*/
                        booleanHeaders = productTypeFlag
                            ? databaseConfig.hwswVersionExcelBooleanHeaders :
                            databaseConfig.svcVersionExcelBooleanHeaders;
                        missingColumns = [];
                        booleanHeaders.forEach(header => {
                            if(tempBlockObject[header]){
                                switch (tempBlockObject[header].toUpperCase()) {
                                case 'Y': tempBlockObject[header] = 1;
                                    break;
                                case 'N': tempBlockObject[header] = 0;
                                    break;
                                default: missingColumns.push(header);
                                }
                            }
                           
                        });
                        if (missingColumns.length) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].booleanFields =
                                'Following fields should have either Y or N as values: ' +
                                missingColumns.toString();
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        //condition to check the description feild length > 40
                        if(tempBlockObject['Descr'] && tempBlockObject['Descr'].toString().length > databaseConfig.importCatalogDescLength) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].Descr = 'Descr of block '+tempBlockObject.BlockName+ ' is over 40 characters long';
                            
                        }  
                        //condition to check the kit part number feild length > 40
                        if(tempBlockObject['KitPartNumber'] && tempBlockObject['KitPartNumber'].toString().length > databaseConfig.importCatalogDescLength) {
                            
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].KitPartNumber= 'KitPartNumber of block '+tempBlockObject.BlockName+ ' is over 40 characters long';
                        }     
               
                       
                        /* checking if product type column data is not as expected*/
                        if(!databaseConfig.catalogImportProdTypeValues.includes(tempBlockObject['ProdType'])){
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].productTypeField =  prodTypeValidationMsg;
                        }
                            
                        /* checking if allow var price column data is not as expected*/
                        allowVarPriceValues = databaseConfig.versionExcelAllowVarPriceHeaderValues;
                        if (!allowVarPriceValues.includes(tempBlockObject['AllowVarPrice'])) {
                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                            errors['RowNumber_' + tempRowindex].allowVarPriceField =
                                'The allow var price column should contain either of following values: ' +
                                allowVarPriceValues.toString();
                            errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                            errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        }
                        /** Before pushing into the tempObject array check for the price group is present in database*/
                        if(tempBlockObject.PriceGroup){
                            const priceGroupCount = await blockModel.getPriceGroupModel(tempBlockObject.PriceGroup);
                            if(!priceGroupCount.length) {
                                typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                errors['RowNumber_' + tempRowindex].priceGroupField = 'This field contains new price group value';
                                errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                                errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                            }
                        }
                        // if (databaseConfig.blockFlexiblePriceType === tempBlockObject.AllowVarPrice) {
                        //     if (!(tempBlockObject.MinPrice || tempBlockObject.MaxPrice)) {
                        //         typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                        //         errors['RowNumber_' + tempRowindex].allowVarPriceField =
                        //             'The min_price/max_price are mandatory for flexible price type'; 
                        //         errors['RowNumber_' + tempRowindex].BlockName=tempBlockObject.BlockName;
                        //         errors['RowNumber_' + tempRowindex].PriceGroup=tempBlockObject.PriceGroup;
                        //     }
                        // }

                        /* Pushing tempobject array of block object if there are no errors in a particular row*/
                        if (typeof errors['RowNumber_' + tempRowindex] === 'undefined') {
                            tempBlockObject.quoteIds = null;
                            let iteratorflag = false;
                            if(blockIdInfo[`${tempBlockObject
                                .BlockName}_${tempBlockObject.PriceGroup}`]){
                                tempBlockObject
                                    .BlockId = blockIdInfo[`${tempBlockObject
                                        .BlockName}_${tempBlockObject.PriceGroup}`];
                            }else{
                                /* inserting blockid & associated quoteIds if it present in database*/
                                blockid = await blockModel.getBlockIdModel(
                                    tempBlockObject.BlockName,
                                    tempBlockObject.PriceGroup,
                                    productTypeFlag);
                                if (blockid.length) {
                                    tempBlockObject.BlockId = blockid[0].block_id;
                                    blockIdInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`] = blockid[0].block_id;
                                }
                            }
                            let tempObject;
                            if (productTypeFlag) {
                                /* refactoring tempObject HWSW/3PP Object*/
                                tempObject = {
                                    id     : tempBlockObject.BlockId ? tempBlockObject.BlockId : null,
                                    blocks : {
                                        // id: tempBlockObject.BlockId ? tempBlockObject.BlockId : null
                                        modified_by : req.body.userId,
                                        modified_on : new Date()
                                    },
                                    materials : {
                                        //id : tempBlockObject.MaterialId
                                        updated_on : new Date()
                                    },
                                    mappedData : {
                                        block_id : tempBlockObject.BlockId ? tempBlockObject.BlockId : null
                                        // material_id : tempBlockObject.MaterialId?tempBlockObject.MaterialId:null,
                                        // quantity : tempBlockObject.QtyMat
                                    }
                                    // quoteIds : tempBlockObject.quoteIds
                                };
                                databaseColumns = databaseConfig.hwswVersionExcelHeadersDatabaseColumns;
                                Object.keys(databaseColumns.blocks).forEach(key => 
                                    tempObject.blocks[databaseColumns.blocks[key]] = tempBlockObject[key]);
                                Object.keys(databaseColumns.materials).forEach(key => tempObject.materials[databaseColumns.materials[key]] = tempBlockObject[key]);
                                tempBlockObject['TransportationFeeType'] == null && (tempObject.blocks.transportation_fee_type = 'None');
                                tempBlockObject['SubFamily'] == null && (tempObject.blocks.product_subfamily = 'None');
                                for(let index=0;index<data.length;index++){
                                    let item = data[index];
                                    if(item.blocks.block_name === tempObject.blocks.block_name 
                                    && item.blocks.price_group === tempObject.blocks.price_group) 
                                    {
                                        data[index].materials = [...data[index].materials];
                                        let materialAccepted = true;
                                        if(tempObject.materials.material_expiry_date){
                                            let  tempMaterialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                            if(currentDate>tempMaterialExpriyDate){
                                                materialAccepted = false;
                                            }
                                        }
                                        if(materialAccepted){
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                            // Total Unit Cost
                                                data[index].totalUnitCost += (tempObject.materials.unit_cost * tempObject.materials.quantity);
                                                // Total Price
                                                data[index].totalPrice += (tempObject.materials.price * tempObject.materials.quantity);
                                            } 
                                            
                                            if(data[index].blocks.masterIndex!==-1){
                                                if(tempObject.materials.mat_grp_5 === 'MA') {
                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                    errors['RowNumber_' + tempRowindex].maTGrp5 = 'Block should not have more than one master material';
                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                    data.splice(index, 1);
                                                    break;
                                                }else{
                                                    data[index].materials.push(tempObject.materials);
                                                    const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                    if(tempObject.materials.material_expiry_date){
                    
                                                        if(data[index].blocks.block_expiry_date){
                                                            const  blockExpriyDate = new Date(data[index].blocks.block_expiry_date);
                                                            if(materialExpriyDate > blockExpriyDate) {
                                                                data[index].blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                            }
                                                        } 
                                                        if(data[index].materials[data[index].blocks.masterIndex].material_expiry_date){
                                                            const masterMaterialExpiryDate = new Date(data[index].materials[data[index].blocks.masterIndex].material_expiry_date); 
                                                            if(masterMaterialExpiryDate<materialExpriyDate){
                                                                typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                             `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                data.splice(index, 1);
                                                                break;
                                                            }
                                                        }          
                       
                                                    }else{
                                                        data[index].blocks.block_expiry_date = null;
                                                        if(data[index].materials[data[index].blocks.masterIndex].material_expiry_date){
                                                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                            errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                             `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                            errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                            errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                            data.splice(index, 1);
                                                            break; 
                                                        }
                                                    }
                                                    
                    
                                                }
                                            }else{
                                                data[index].materials.push(tempObject.materials);
                                                let masterFlag = false;
                                                if(tempObject.materials.mat_grp_5==='MA'){
                                  
                                                    data[index].blocks.masterIndex = data[index].materials.length-1;
                                                    data[index].blocks.description = tempObject.materials.part_title;

                                                }
                                                masterFlag = (data[index].blocks.masterIndex!==-1);
                                                if(tempObject.materials.material_expiry_date){

                                                    const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                    if(data[index].blocks.block_expiry_date){
                                                        const  blockExpriyDate = new Date(data[index].blocks.block_expiry_date);
                                                        if(materialExpriyDate > blockExpriyDate) {
                                                            data[index].blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                        } 
                                                    }
                                                                          
                                                    if(masterFlag){
                                                        let tempSlaveMaterialExpiryDate,slaveMaterial;
                                                        for(let slaveMaterialIndex = 0 ;slaveMaterialIndex < data[index].materials.length;slaveMaterialIndex++){
                                                            slaveMaterial = data[index].materials[slaveMaterialIndex];
                                                            if(slaveMaterial.material_expiry_date){
                                                                tempSlaveMaterialExpiryDate = new Date(slaveMaterial.material_expiry_date);
                                                                if(materialExpriyDate<tempSlaveMaterialExpiryDate){
                                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                    errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                     `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                    data.splice(index, 1);
                                                                    break;
                                                                }
                                                            }
                            
                                                        } 
                                                    }

                                                }else{
                                                    data[index].blocks.block_expiry_date = null;
                                                }
                                                            
                                            }    

                                        }else{
          
                                            if(tempObject.mappedData.block_id){
                                                let newMaterialFlag =   (await blockModel.isHwswNewMaterialModel(tempObject.materials.part_number))[0].newMaterialFlag;
                                                if(newMaterialFlag!=1){
                                                    if(typeof data[index].excludedMaterials === 'undefined'){
                                                        data[index].excludedMaterials = [tempObject.materials.part_number];
                                                    }else{
                                                        data[index].excludedMaterials.push(tempObject.materials.part_number);
                                                    }
                                                }
                                            }


                                        }
    
                                        iteratorflag = true;
                                        break;
                                    } 
                                }
                                if( !iteratorflag ) {
                                    let materialAccepted = true;
                                    if(tempObject.materials.material_expiry_date){
                                        let  tempMaterialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                        if(currentDate>tempMaterialExpriyDate){
                                            materialAccepted = false;
                                        }
                                    }
                                    if(materialAccepted){
                                        blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]=true;
                                        tempObject.materials = [tempObject.materials];
                                        tempObject.blocks.block_expiry_date = tempObject.materials[0].material_expiry_date;
                                        tempObject.blocks.masterIndex=-1;
                                        if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                            tempObject.totalUnitCost = (tempObject.materials[0].unit_cost * tempObject.materials[0].quantity); 
                                            tempObject.totalPrice = (tempObject.materials[0].price * tempObject.materials[0].quantity); 
                                        }

                                        
                                        //Temp Object for Upload Price Validation
                                        const tempPriceObject = {
                                            blockName  : tempObject.blocks.block_name,
                                            priceGroup : tempObject.blocks.price_group,  
                                            rowNumber  : tempRowindex
                                        };
                                        priceErrors.push(tempPriceObject);
                                        if(tempObject.materials[0].mat_grp_5==='MA'){
                                            tempObject.blocks.masterIndex = 0;
                                            tempObject.blocks.description = tempObject.materials[0].part_title;
                                        }
                                        /* checking if already error occured for this particular block again , whether to add new entry in json */
                                        let errorFlag = false;
                                        Object.keys(errors).forEach(key=>{
                                            if(errors[key].BlockName === tempObject.blocks.block_name &&
                                                 errors[key].PriceGroup === tempObject.blocks.price_group){
                                                errorFlag=true;
                                            }
                                        });
                                        if( !errorFlag ){
                                            data.push(tempObject);
                                        }
                                    }else{
                                        if(blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]!=true){
                                            blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]=false;
                                        }
                                        if(tempObject.mappedData.block_id){
                                            let newMaterialFlag =   (await blockModel.isHwswNewMaterialModel(tempObject.materials.part_number))[0].newMaterialFlag;
                                            if(newMaterialFlag!=1){
                                                if(typeof tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] === 'undefined'){
                                                    tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] = [tempObject.materials.part_number];
                                                }else{
                                                    tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`].push(tempObject.materials.part_number);
                                                }
                                                
                                            }
                                        }
                                        if(tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`]){
                                            let tempExpireData  = tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                                // Total Unit Cost
                                                tempExpireData.totalUnitCost += (tempObject.materials.unit_cost * tempObject.materials.quantity);
                                                // Total Price
                                                tempExpireData.totalPrice += (tempObject.materials.price * tempObject.materials.quantity);
                                            }
                                            if(tempExpireData.blocks.masterIndex!==-1){
                                                if(tempObject.materials.mat_grp_5 === 'MA') {
                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                    errors['RowNumber_' + tempRowindex].maTGrp5 = 'Block should not have more than one master material';
                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                    delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                }else{
                                                    tempExpireData.materials.push(tempObject.materials);
                                                    if(tempObject.materials.material_expiry_date){
                                                        const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                        
                                                        if(tempExpireData.blocks.block_expiry_date){
                                                            const  blockExpriyDate = new Date(tempExpireData.blocks.block_expiry_date);
                                                            if(materialExpriyDate > blockExpriyDate) {
                                                                tempExpireData.blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                            }
                                                        }
                                                        if(tempExpireData.materials[tempExpireData.blocks.masterIndex].material_expiry_date){
                                                            const masterMaterialExpiryDate = new Date(tempExpireData.materials[tempExpireData.blocks.masterIndex].material_expiry_date); 
                                                            if(masterMaterialExpiryDate<materialExpriyDate){
                                                                typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                 `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                            }
                                                        }
                           
                                                    }else{

                                                        tempExpireData.blocks.block_expiry_date = null;
                                                        if(tempExpireData.materials[tempExpireData.blocks.masterIndex].material_expiry_date){
                                                            typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                            errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                             `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                            errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                            errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                            delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                        }
                                                    }
                        
                                                }
                                            }else{
                                                tempExpireData.materials.push(tempObject.materials);
                                                let masterFlag = false;
                                                if(tempObject.materials.mat_grp_5==='MA'){
                                                    // console.log(':----------',index,item.blocks.block_name);
                                                    tempExpireData.blocks.masterIndex = tempExpireData.materials.length-1;
                                                    tempExpireData.blocks.description = tempObject.materials.part_title;

                                                }
                                                masterFlag = (tempExpireData.blocks.masterIndex!==-1);
                                                if(tempObject.materials.material_expiry_date){

                                                    const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                    if(tempExpireData.blocks.block_expiry_date){
                                                        const  blockExpriyDate = new Date(tempExpireData.blocks.block_expiry_date);
                                                        if(materialExpriyDate > blockExpriyDate) {
                                                            tempExpireData.blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                        } 
                                                    }
                                                                              
                                                    if(masterFlag){
                                                        let tempSlaveMaterialExpiryDate,slaveMaterial;
                                                        for(let slaveMaterialIndex = 0 ;slaveMaterialIndex < tempExpireData.materials.length;slaveMaterialIndex++){
                                                            slaveMaterial = tempExpireData.materials[slaveMaterialIndex];
                                                            if(slaveMaterial.material_expiry_date){
                                                                tempSlaveMaterialExpiryDate = new Date(slaveMaterial.material_expiry_date);
                                                                if(materialExpriyDate<tempSlaveMaterialExpiryDate){
                                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                    errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                         `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                    delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                                    break;
                                                                }
                                                            }
                                
                                                        } 
                                                    }

                                                }else{
                                                    tempExpireData.blocks.block_expiry_date = null;
                                                }
                                                                
                                            } 
                                            tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] =tempExpireData;
                                        }else{
                                            tempObject.materials = [tempObject.materials];
                                            tempObject.blocks.block_expiry_date = tempObject.materials[0].material_expiry_date;
                                            tempObject.blocks.masterIndex=-1;
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                                tempObject.totalUnitCost = (tempObject.materials[0].unit_cost * tempObject.materials[0].quantity); 
                                                tempObject.totalPrice = (tempObject.materials[0].price * tempObject.materials[0].quantity); 
                                            } 
                                            if(tempObject.materials[0].mat_grp_5==='MA'){
                                                tempObject.blocks.masterIndex = 0;
                                                tempObject.blocks.description = tempObject.materials[0].part_title;
                                            }
                                            /* checking if already error occured for this particular block again , whether to add new entry in json */
                                            let errorFlag = false;
                                            Object.keys(errors).forEach(key=>{
                                                if(errors[key].BlockName === tempObject.blocks.block_name &&
                                                     errors[key].PriceGroup === tempObject.blocks.price_group){
                                                    errorFlag=true;
                                                }
                                            });
                                            if( !errorFlag ){
                                                tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] = tempObject;
                                            }

                                        }
                                        
                                        
                                    }
                             
                                    
                                }
                            } else {
                                /* refactoring tempObject Service Object*/
                                tempObject = {
                                    id     : tempBlockObject.BlockId ? tempBlockObject.BlockId : null,
                                    blocks : {
                                        // id: tempBlockObject.BlockId ? tempBlockObject.BlockId : null
                                        modified_by : req.body.userId,
                                        modified_on : new Date()
                                    },
                                    materials : {
                                        //id : tempBlockObject.MaterialId
                                        modified_by : req.body.userId,
                                        modified_on : new Date()
                                    },
                                    activity      : {},
                                    blockActivity : {
                                        block_id    : tempBlockObject.BlockId ? tempBlockObject.BlockId : null,
                                        // material_id : tempBlockObject.MaterialId?tempBlockObject.MaterialId:null,
                                        // quantity    : tempBlockObject.QtyMat
                                        modified_by : req.body.userId,
                                        modified_on : new Date()
                                    }
                                    // quoteIds : tempBlockObject.quoteIds
                                };
                                databaseColumns = databaseConfig.svcVersionExcelHeadersDatabaseColumns;
                                Object.keys(databaseColumns.blocks).forEach(key => tempObject.blocks[databaseColumns.blocks[key]] = tempBlockObject[key]);
                                Object.keys(databaseColumns.materials).forEach(key => tempObject.materials[databaseColumns.materials[key]] = tempBlockObject[key]);
                                Object.keys(databaseColumns.activity).forEach(key => tempObject.activity[databaseColumns.activity[key]] = tempBlockObject[key]);
                                Object.keys(databaseColumns.blockActivity).forEach(key => tempObject.blockActivity[databaseColumns.blockActivity[key]] = tempBlockObject[key]);
                                tempBlockObject['SubFamily'] == null && (tempObject.blocks.product_subfamily = 'None');
                                //  tempBlockObject['TransportationFeeType'] == null && (tempObject.blocks.transportation_fee_type = 'None');
                                // data.push(tempObject);
                                //data.forEach((item, index) => {
                                for(let index=0;index<data.length;index++){
                                    let item = data[index];
                                    if(item.blocks.block_name === tempObject.blocks.block_name 
                                        && item.blocks.price_group === tempObject.blocks.price_group) {
                                        data[index].materials = [...data[index].materials];
                                        data[index].activity = [...data[index].activity];
                                        data[index].blockActivity = [...data[index].blockActivity];

                                        let blockActivityAccepted = true;
                                        if(tempObject.blockActivity.block_activity_expiry_date){
                                            let  tempblockActivityExpriyDate = new Date(tempObject.blockActivity.block_activity_expiry_date); 
                                            if(currentDate>tempblockActivityExpriyDate){
                                                blockActivityAccepted = false;
                                            }
                                        }
                                        if(blockActivityAccepted){
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                            // Total Unit Cost 
                                                data[index].totalUnitCost += (tempObject.blockActivity.unit_cost * tempObject.blockActivity.qty_mat);
                                                // Total Price 
                                                data[index].totalPrice += (tempObject.blockActivity.price * tempObject.blockActivity.qty_mat);
                                            } 

                                            
                                            let tempExpiredFlag = (tempObject.blockActivity.block_activity_expiry_date==null);
                                            if(data[index].blocks.masterIndex !== -1){
                                                if(tempObject.blockActivity.matgrp5 === 'MA') {
                                                    typeof errors['RoNwumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                    errors['RowNumber_' + tempRowindex].maTGrp5 = 'Block should not have more than one master material';
                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                    data.splice(index, 1);
                                                    break;
                                                } else { 
                                                    let masterErrorFlag = false;
                                                    if(!tempExpiredFlag){
                                                        let  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date);
                                                        if(data[index].materials[data[index].blocks.masterIndex].material_expiry_date) {
                                                            const masterMaterialExpiryDate = new Date(data[index].materials[data[index].blocks.masterIndex].material_expiry_date);
                                                            if(masterMaterialExpiryDate<activityExpiryDate){
                                                                masterErrorFlag = true;
                                                            }
                                                        }
                                                    }
                                                    if(masterErrorFlag){
                                                        typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                        errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                                         ` Master activity has expiry date earlier to slave activity in row ${tempRowindex}`;
                                                        errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                        errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                        data.splice(index, 1);
                                                        break;
                                                    }else{

                                                        let duplicateFlag=false;
                                                        for(let i=0;i<data[index].materials.length;i++){
                                                            if(data[index].materials[i].material==tempObject.materials.material){
                                                                duplicateFlag=true;
                                                                if(!tempExpiredFlag && data[index].materials[i].material_expiry_date ){
                                                                    let  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date);
                                                                    if(new Date(data[index].materials[i].material_expiry_date)<activityExpiryDate){
                                                                        data[index].materials[i].material_expiry_date =  tempObject.blockActivity.block_activity_expiry_date;
                                                                    }
                                                                }else{
                                                                    data[index].materials[i].material_expiry_date = null;
                                                                }
                                                            }
                                                        }
                                                        if(!duplicateFlag){
                                                            data[index].materials.push(tempObject.materials);
                                                        }
                                                        // data[index].materials.push(tempObject.materials);
                                                        data[index].activity.push(tempObject.activity);
                                                        data[index].blockActivity.push(tempObject.blockActivity);
                                                        if(!tempExpiredFlag && data[index].blocks.block_expiry_date ){
                                                            const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                            const  blockExpriyDate = new Date(data[index].blocks.block_expiry_date);
                                                            if(materialExpriyDate > blockExpriyDate) {
                                                                data[index].blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                            }
                                                        }else{
                                                            data[index].blocks.block_expiry_date = null;
                                                        }


                                                        data[index].matMappedActivity.push({
                                                            'material'   : tempObject.materials.material,
                                                            'materialId' : null,
                                                            'activityId' : null
                                                        });
                                                    }                                       
                                                }                                        
                                            } else {                                                  
                                                let duplicateFlag=false;                                                    
                                                for(let i = 0; i < data[index].materials.length; i++){
                                                    if(data[index].materials[i].material==tempObject.materials.material){
                                                        duplicateFlag=true;
                                                        if(!tempExpiredFlag && data[index].materials[i].material_expiry_date ){
                                                            const  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date); 
                                                            if(new Date(data[index].materials[i].material_expiry_date)<activityExpiryDate){
                                                                data[index].materials[i].material_expiry_date =  tempObject.blockActivity.block_activity_expiry_date;
                                                            }
                                                        }else{
                                                            data[index].materials[i].material_expiry_date = null;
                                                        }
                                                        
                                                    }
                                                }
                                                if(!duplicateFlag){
                                                    data[index].materials.push(tempObject.materials);
                                                }
                                                // data[index].materials.push(tempObject.materials);
                                                data[index].activity.push(tempObject.activity);
                                                data[index].blockActivity.push(tempObject.blockActivity);
                                                if(!tempExpiredFlag && data[index].blocks.block_expiry_date ){
                                                    let  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                    const  blockExpriyDate = new Date(data[index].blocks.block_expiry_date);
                                                    if(materialExpriyDate > blockExpriyDate) {
                                                        data[index].blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                    }
                                                }else{
                                                    data[index].blocks.block_expiry_date = null;
                                                }
                                                
                                                data[index].matMappedActivity.push({
                                                    'material'   : tempObject.materials.material,
                                                    'materialId' : null,
                                                    'activityId' : null
                                                });
                                                
                                                if(tempObject.blockActivity.matgrp5 === 'MA'){
                                                    data[index].blocks.masterIndex = data[index].materials.length-1;
                                                    data[index].blocks.description =tempObject.materials.part_title;
                                                    if(!tempExpiredFlag){
                                                        let  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                        let tempSlaveMaterialExpiryDate,slaveMaterial;
                                                        for(let slaveMaterialIndex = 0 ;slaveMaterialIndex < data[index].materials.length;slaveMaterialIndex++){
                                                            slaveMaterial = data[index].materials[slaveMaterialIndex];
                                                            if(slaveMaterial.material_expiry_date){
                                                                tempSlaveMaterialExpiryDate = new Date(slaveMaterial.material_expiry_date);
                                                                if(materialExpriyDate<tempSlaveMaterialExpiryDate){
                                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                    errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                             `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                    data.splice(index, 1);
                                                                    break;
                                                                }
                                                            }
                                    
                                                        }
                                                    }
                                                     
                                                    
                                                }
                                            } 
                                                                     
                                            
                                        } else{
                                            if(tempObject.id){
                                            
                                                let materialId = (await blockModel.getSvcMaterialIdByblockIdAndPartnumberModel(tempObject.materials.material,tempObject.id))[0].material_id;
                                                
                                                let activityId = (await blockModel.getActivityModel(tempObject.activity))[0].id;
                                                
                                                
                                                let uniqueBlockActivityDetails = {
                                                    materialId,
                                                    activityId,
                                                    unitCost            : tempObject.blockActivity.unit_cost,
                                                    hourUnits           : tempObject.blockActivity.hour_units,
                                                    laborRate           : tempObject.blockActivity.labor_rate,
                                                    workPackageQuantity : tempObject.blockActivity.work_package_quantity
                                                    
                                                };
                                                let blockActivityDetails=   (await blockModel.getSVCBlockActivityModel(tempObject.id,uniqueBlockActivityDetails));
                                        
                                                if(blockActivityDetails.length){
                                                    if(typeof data[index].excludedMaterials === 'undefined'){
                                                        data[index].excludedMaterials = [tempObject.activity.activity_description];
                                                    }else{
                                                        data[index].excludedMaterials.push(tempObject.activity.activity_description);
                                                    }                                                    
                                                }
                                            }
                                        }
                                        iteratorflag = true;
                                        break;
                                    }
                                      
                                
                                }
                                //);
                                if( !iteratorflag ){
                                    let blockActivityAccepted = true;
                                    if(tempObject.blockActivity.block_activity_expiry_date){
                                        let  tempblockActivityExpriyDate = new Date(tempObject.blockActivity.block_activity_expiry_date); 
                                        if(currentDate>tempblockActivityExpriyDate){
                                            blockActivityAccepted = false;
                                        }
                                    }
                                    if(blockActivityAccepted){
                                        blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]=true;
                                        tempObject.materials = [tempObject.materials];
                                        tempObject.activity = [tempObject.activity];
                                        tempObject.blockActivity = [tempObject.blockActivity];
                                        tempObject.blocks.block_expiry_date = tempObject.materials[0].material_expiry_date;
                                        tempObject.blocks.masterIndex=-1;
                                        if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                            tempObject.totalUnitCost = (tempObject.blockActivity[0].unit_cost * tempObject.blockActivity[0].qty_mat); 
                                            tempObject.totalPrice = (tempObject.blockActivity[0].price * tempObject.blockActivity[0].qty_mat); 
                                        }  


                                        //Temp Object for Upload Price Validation
                                        const tempPriceObject = {
                                            blockName  : tempObject.blocks.block_name,
                                            priceGroup : tempObject.blocks.price_group,  
                                            rowNumber  : tempRowindex
                                        };
                                        priceErrors.push(tempPriceObject);
                                        if(tempObject.blockActivity[0].matgrp5 === 'MA'){
                                            tempObject.blocks.masterIndex = 0;
                                            tempObject.blocks.description = tempObject.materials[0].part_title;
                                        }
                                        let errorFlag = false;
                                        Object.keys(errors).forEach(key => {
                                            if(errors[key].BlockName === tempObject.blocks.block_name &&
             errors[key].PriceGroup === tempObject.blocks.price_group){
                                                errorFlag=true;
                                            }
                                        });
                                        if( !errorFlag ){
                                            tempObject.matMappedActivity =[{
                                                'material'   : tempObject.materials[0].material,
                                                'materialId' : null,
                                                'activityId' : null
                                            }]; 
                                            data.push(tempObject);
                                        }
                                    }else{
                                        if(blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]!=true){
                                            blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`]=false;
                                        }
                                        if(tempObject.id){

                                            let materialId = (await blockModel.getSvcMaterialIdByblockIdAndPartnumberModel(tempObject.materials.material,tempObject.id))[0].material_id;
                                            let activityId = (await blockModel.getActivityModel(tempObject.activity))[0].id;   
                                                     
                                            let uniqueBlockActivityDetails = {
                                                materialId,
                                                activityId,
                                                unitCost            : tempObject.blockActivity.unit_cost,
                                                hourUnits           : tempObject.blockActivity.hour_units,
                                                laborRate           : tempObject.blockActivity.labor_rate,
                                                workPackageQuantity : tempObject.blockActivity.work_package_quantity
                                                
                                            };
                                            let blockActivityDetails=   (await blockModel.getSVCBlockActivityModel(tempObject.id,uniqueBlockActivityDetails));
                                    
                                            if(blockActivityDetails.length){
                                                if(typeof tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] === 'undefined'){
                                                    tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] = [tempObject.activity.activity_description];
                                                }else{
                                                    tempExcludedMaterialInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`].push(tempObject.activity.activity_description);
                                                }
                                                
                                            }
                                        }
                                        if(tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`]){
                                            let tempExpireData  = tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                                // Total Unit Cost 
                                                tempExpireData.totalUnitCost += (tempObject.blockActivity.unit_cost * tempObject.blockActivity.qty_mat);
                                                // Total Price 
                                                tempExpireData.totalPrice += (tempObject.blockActivity.price * tempObject.blockActivity.qty_mat);
                                            } 
                                            let tempExpiredFlag = (tempObject.blockActivity.block_activity_expiry_date==null);
                                            if(tempExpireData.blocks.masterIndex !== -1){
                                                if(tempObject.blockActivity.matgrp5 === 'MA') {
                                                    typeof errors['RoNwumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                    errors['RowNumber_' + tempRowindex].maTGrp5 = 'Block should not have more than one master material';
                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                    delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                } else { 
                                                    let masterErrorFlag = false;
                                                    if(!tempExpiredFlag){
                                                        let  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date);
                                                        if(tempExpireData.materials[tempExpireData.blocks.masterIndex].material_expiry_date) {
                                                            const masterMaterialExpiryDate = new Date(tempExpireData.materials[tempExpireData.blocks.masterIndex].material_expiry_date);
                                                            if(masterMaterialExpiryDate<activityExpiryDate){
                                                                masterErrorFlag = true;
                                                            }
                                                        }
                                                    }
                                                    if(masterErrorFlag){
                                                        typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                        errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                                             ` Master activity has expiry date earlier to slave activity in row ${tempRowindex}`;
                                                        errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                        errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                        delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                    }else{
    
                                                        let duplicateFlag=false;
                                                        for(let i=0;i<tempExpireData.materials.length;i++){
                                                            if(tempExpireData.materials[i].material==tempObject.materials.material){
                                                                duplicateFlag=true;
                                                                if(!tempExpiredFlag && tempExpireData.materials[i].material_expiry_date ){
                                                                    let  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date);
                                                                    if(new Date(tempExpireData.materials[i].material_expiry_date)<activityExpiryDate){
                                                                        tempExpireData.materials[i].material_expiry_date =  tempObject.blockActivity.block_activity_expiry_date;
                                                                    }
                                                                }else{
                                                                    tempExpireData.materials[i].material_expiry_date = null;
                                                                }
                                                            }
                                                        }
                                                        if(!duplicateFlag){
                                                            tempExpireData.materials.push(tempObject.materials);
                                                        }
                                                        // tempExpireData.materials.push(tempObject.materials);
                                                        tempExpireData.activity.push(tempObject.activity);
                                                        tempExpireData.blockActivity.push(tempObject.blockActivity);
                                                        if(!tempExpiredFlag && tempExpireData.blocks.block_expiry_date ){
                                                            const  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                            const  blockExpriyDate = new Date(tempExpireData.blocks.block_expiry_date);
                                                            if(materialExpriyDate > blockExpriyDate) {
                                                                tempExpireData.blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                            }
                                                        }else{
                                                            tempExpireData.blocks.block_expiry_date = null;
                                                        }
    
    
                                                        tempExpireData.matMappedActivity.push({
                                                            'material'   : tempObject.materials.material,
                                                            'materialId' : null,
                                                            'activityId' : null
                                                        });
                                                    }                                       
                                                }                                        
                                            } else {                                                  
                                                let duplicateFlag=false;                                                    
                                                for(let i = 0; i < tempExpireData.materials.length; i++){
                                                    if(tempExpireData.materials[i].material==tempObject.materials.material){
                                                        duplicateFlag=true;
                                                        if(!tempExpiredFlag && tempExpireData.materials[i].material_expiry_date ){
                                                            const  activityExpiryDate  =  new Date(tempObject.blockActivity.block_activity_expiry_date); 
                                                            if(new Date(tempExpireData.materials[i].material_expiry_date)<activityExpiryDate){
                                                                tempExpireData.materials[i].material_expiry_date =  tempObject.blockActivity.block_activity_expiry_date;
                                                            }
                                                        }else{
                                                            tempExpireData.materials[i].material_expiry_date = null;
                                                        }
                                                            
                                                    }
                                                }
                                                if(!duplicateFlag){
                                                    tempExpireData.materials.push(tempObject.materials);
                                                }
                                                // tempExpireData.materials.push(tempObject.materials);
                                                tempExpireData.activity.push(tempObject.activity);
                                                tempExpireData.blockActivity.push(tempObject.blockActivity);
                                                if(!tempExpiredFlag && tempExpireData.blocks.block_expiry_date ){
                                                    let  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                    const  blockExpriyDate = new Date(tempExpireData.blocks.block_expiry_date);
                                                    if(materialExpriyDate > blockExpriyDate) {
                                                        tempExpireData.blocks.block_expiry_date = tempObject.materials.material_expiry_date;
                                                    }
                                                }else{
                                                    tempExpireData.blocks.block_expiry_date = null;
                                                }
                                                    
                                                tempExpireData.matMappedActivity.push({
                                                    'material'   : tempObject.materials.material,
                                                    'materialId' : null,
                                                    'activityId' : null
                                                });
                                                    
                                                if(tempObject.blockActivity.matgrp5 === 'MA'){
                                                    tempExpireData.blocks.masterIndex = tempExpireData.materials.length-1;
                                                    tempExpireData.blocks.description =tempObject.materials.part_title;
                                                    if(!tempExpiredFlag){
                                                        let  materialExpriyDate = new Date(tempObject.materials.material_expiry_date); 
                                                        let tempSlaveMaterialExpiryDate,slaveMaterial;
                                                        for(let slaveMaterialIndex = 0 ;slaveMaterialIndex < tempExpireData.materials.length;slaveMaterialIndex++){
                                                            slaveMaterial = tempExpireData.materials[slaveMaterialIndex];
                                                            if(slaveMaterial.material_expiry_date){
                                                                tempSlaveMaterialExpiryDate = new Date(slaveMaterial.material_expiry_date);
                                                                if(materialExpriyDate<tempSlaveMaterialExpiryDate){
                                                                    typeof errors['RowNumber_' + tempRowindex] === 'undefined' && (errors['RowNumber_' + tempRowindex] = {});
                                                                    errors['RowNumber_' + tempRowindex].LesserMasterMaterialExpiryDate =
                                                 `Master material has expiry date earlier to slave material in row ${tempRowindex}`;
                                                                    errors['RowNumber_' + tempRowindex].BlockName=tempObject.blocks.block_name;
                                                                    errors['RowNumber_' + tempRowindex].PriceGroup=tempObject.blocks.price_group;
                                                                    delete tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`];
                                                                    break;
                                                                }
                                                            }
                                        
                                                        }
                                                    }
                                                         
                                                        
                                                }
                                            } 
                                                                         
                                            tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] =tempExpireData;    
                                        }else{
                                            
                                            tempObject.materials = [tempObject.materials];
                                            tempObject.activity = [tempObject.activity];
                                            tempObject.blockActivity = [tempObject.blockActivity];
                                            tempObject.blocks.block_expiry_date = tempObject.materials[0].material_expiry_date;
                                            tempObject.blocks.masterIndex=-1;
                                            if(tempObject.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){
                                                tempObject.totalUnitCost = (tempObject.blockActivity[0].unit_cost * tempObject.blockActivity[0].qty_mat); 
                                                tempObject.totalPrice = (tempObject.blockActivity[0].price * tempObject.blockActivity[0].qty_mat); 
                                            }  
                                            if(tempObject.blockActivity[0].matgrp5 === 'MA'){
                                                tempObject.blocks.masterIndex = 0;
                                                tempObject.blocks.description = tempObject.materials[0].part_title;
                                            }
                                            let errorFlag = false;
                                            Object.keys(errors).forEach(key => {
                                                if(errors[key].BlockName === tempObject.blocks.block_name &&
                     errors[key].PriceGroup === tempObject.blocks.price_group){
                                                    errorFlag=true;
                                                }
                                            });
                                            if( !errorFlag ){
                                                tempExcludedMaterialBlockInfoObject[`${tempObject.blocks.block_name}_${tempObject.blocks.price_group}`] = tempObject;
                                            }
                                        }
                                        
                                
                                    }
                                
                                }
                            }
                        } else {
                            data.forEach((item, index) => {
                                if(item.blocks.block_name === tempBlockObject.BlockName 
                                    && item.blocks.price_group === tempBlockObject.PriceGroup){
                                    data.splice(index, 1);
                                } 
                            });
                            delete tempExcludedMaterialBlockInfoObject[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`];
                            delete blockAllMaterialOrActivitiesExpiredCheckInfo[`${tempBlockObject.BlockName}_${tempBlockObject.PriceGroup}`];
                        }
                        tempRowindex++;
                    }
                    
                    
                    const tempData = {};
                    /** S-16575 Catalog upload price validations */
                    data.forEach((item, index) => {
                      
                        let priceFlag = false;
                        const tempObj = priceErrors[index];
                  
                        if(item.blocks.block_name === tempObj.blockName 
                            && item.blocks.price_group === tempObj.priceGroup) {
                            if(typeof tempExcludedMaterialInfoObject[`${tempObj.blockName}_${tempObj.priceGroup}`] !== 'undefined'){
                                if(typeof item.excludedMaterials === 'undefined'){
                                    item.excludedMaterials =[];
                                }
                                item.excludedMaterials = [
                                    ...item.excludedMaterials,
                                    ...tempExcludedMaterialInfoObject[`${tempObj.blockName}_${tempObj.priceGroup}`]
                                ];
                            }
                            tempData[`${item.blocks.block_name}_${item.blocks.price_group}`] = item;
                            if(item.blocks.allow_var_price == databaseConfig.blockFlexiblePriceType){ 
                                //condition when min and max price is null check for total cost and total price
                                if (item.blocks.min_price == null ||  item.blocks.max_price == null) {
                                   
                                    if(item.totalUnitCost > item.totalPrice){
                                        typeof errors['RowNumber_' + tempObj.rowNumber] === 'undefined' && (errors['RowNumber_' + tempObj.rowNumber] = {});
                                        errors['RowNumber_' + tempObj.rowNumber].TotalUnitCost = 'Total cost for the block cannot be more than total price ';
                                        priceFlag = true;
                                    }                                        
                                }else{
                                    if(item.totalUnitCost > item.blocks.min_price) {
                                        typeof errors['RowNumber_' + tempObj.rowNumber] === 'undefined' && (errors['RowNumber_' + tempObj.rowNumber] = {});
                                        errors['RowNumber_' + tempObj.rowNumber].TotalUnitCost = 'Cost of the block should not exceed the minimum price allowed for the block';
                                        priceFlag = true;
                                    } 
                                    if (item.blocks.min_price > item.totalPrice) {
                                        typeof errors['RowNumber_' + tempObj.rowNumber] === 'undefined' && (errors['RowNumber_' + tempObj.rowNumber] = {});
                                        errors['RowNumber_' + tempObj.rowNumber].TotalMinPrice = 'Minimum price of the block cannot be more than unit price of the block';
                                        priceFlag = true;
                                    } 
                                    if (item.blocks.max_price < item.totalPrice) {
                                        typeof errors['RowNumber_' + tempObj.rowNumber] === 'undefined' && (errors['RowNumber_' + tempObj.rowNumber] = {});
                                        errors['RowNumber_' + tempObj.rowNumber].TotalMaxPrice = 'Maximum price of the block cannot be less than the unit price of the block';
                                        priceFlag = true;
                                    }  
                                }                                    
                                if(priceFlag){
                                    errors['RowNumber_' + tempObj.rowNumber] = {
                                        ...errors['RowNumber_' + tempObj.rowNumber],
                                        BlockName  : item.blocks.block_name,
                                        PriceGroup : item.blocks.price_group 
                                    };
                                    //data.splice(index, 1);
                                   delete tempData[`${item.blocks.block_name}_${item.blocks.price_group}`];
                                }else{
                                    tempData[`${item.blocks.block_name}_${item.blocks.price_group}`] = item;
                                } 
                            }
                                
                            
                        } 
                    });
                    data = Object.values(tempData);
                    Object.keys(blockAllMaterialOrActivitiesExpiredCheckInfo).forEach((item)=>{
                        if(!blockAllMaterialOrActivitiesExpiredCheckInfo[item]){
                            if(tempExcludedMaterialBlockInfoObject[item]){
                                data.push(tempExcludedMaterialBlockInfoObject[item]);
                            }
                        }
                    });
                    if(data.length > 0 ){
                        req.body.excelData = data;
                        req.body.excelErrors = errors;
                        console.log("before next");
                        // return res.status(206).json({excelErrors: errors, excelData: data, status: false });
                        next();
                    }else {
                        let resp = {
                            excelErrors : errors, status : false 
                        };
                        // const tempObjExculdeData = Object.keys(tempExcludedMaterialInfoObject);
                        // if(tempObjExculdeData.length > 0){
                        //     let blockNames = tempObjExculdeData.map(item => item.split('_')[0]);
                        //     resp.expiredMaterialActivity = `The given catalog data has expired material/activity for the following ${blockNames}.`;
                        // }
                         console.log("before error",resp);
                        return res.status(206).json(resp);
                        // let tempData = [...Object.values(tempExcludedMaterialBlockInfoObject)];
                        // req.body.excelData = tempData;
                        // req.body.excelErrors = errors;
                        // next();
                    }
                }
            })
            .catch(err => {
                sentryLogging(err,'versionExcelValidations',req);
                return res.status(206).json({ message: generateErrorMessage(err), status: false });
            });
    } catch (err) {
        sentryLogging(err,'versionExcelValidations',req);
        logError(err,res);
        return res.status(206).json({ message: generateErrorMessage(err), status: false });
    }
}