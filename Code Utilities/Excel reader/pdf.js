/**
 * @license
 * Copyright (c) 2019.
 ** Project  ID : < E-10237-01-01>
 * Node Version  : 10.15
 * Sr.  Version    Modified By
 * 1.   1.0        <Archana K C, Ajay Nayak, Ashwini Naik, Aditya, Esari Praneeth kumar, Bhoomika Maheshwari>  
 * 
 **/

/* eslint-disable max-lines-per-function */
/* eslint-disable node/no-unsupported-features/es-syntax */
const {
    currencyFormat,
    generateErrorMessage,
    generatePdf
} = require('../utils/utilities');
const {logError}=require('../utils/logging');
const fs = require('fs');
const dateFormat = require('dateformat');
const config = require('e-config-middleware');
const Excel = require('exceljs');
const sentryLogging = require('../utils/sentryLogging');
const databaseConfig = require('../databaseConfig');
const blockServices = require('../services/block.services');
const quoteServices = require('../services/quote.services');
const sectionServices = require('../services/sections.services');
const sowInformationServices = require('../services/sowInformation.services');
const quotesModels = require('../models/quotes');
let sheetRowIndexes ;
let sheetRowColumnIndexes;
let defaultTemplate;
let extraRowMerge;

let finishRow, styleRow;
let horizontalMergeCellSelector;
let leftTempRowIndex;
let topRightAlign = {
    vertical   : 'top',
    horizontal : 'right'
};
let topLeftAlign = {
    vertical   : 'top',
    horizontal : 'left'
};
let topCenterAlign = {
    vertical   : 'top',
    horizontal : 'center'
};

var exelBoldFont = { name: 'Calibri', bold: true, size: 10 };
let workbook = new Excel.Workbook();
let tempDir = config.param('mount_path') + 'excelQuote/';
let dispPriceAtBlock;
let dispPriceAtHeader,orderCodeDescriptionAdjacentPair,detailedDescriptionMergeSelector;
let headerNames = [];
let isAllTransportFeeNoneType,totalTransportFeeValue,tbdFlag,transportFeeTypeArray;
//Service to get Quote pdf
/**
 *@descriptionget Getting  Quote pdf
 *@param quoteId{ Integer } QuoteId
 *@param userId{ Integer } UserId
 *@returns Returns with quote as pdf file
 */
const quotePdfService = (req, res) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise(function(resolve, reject) {
        (async () => {
            try {
                sheetRowIndexes = [1, 2, 3, 4, 5,6,7,8];
                sheetRowColumnIndexes = ['A', 'B', 'C', 'D', 'E','F','G'];
                defaultTemplate=1; // variable to indicate current pdf is following a default pdf template
                extraRowMerge=0; // variable set to 1 when there is a more than one extra column added right to description column 
                let Rowstart = 19; // starting row to insert
                let pdfFlag = true; // flag to indicate below services to return data without sending response back
                let sowSelectorFlag = true;
                let proposalSelectorFlag = true;
                isAllTransportFeeNoneType=false;
                totalTransportFeeValue=0;
                transportFeeTypeArray=[];
                tbdFlag=false;
                let templateId,templatePath;
                let descriptionRowHeightDivider=24,orderCodeRowHeightDivider=20;
                let leftSectionDivider=41,rightSectionDivider=49,fullWidthSectionDivider=119,detailedDescriptionRowHeightDivider=43;
                /* quote validity updation */
                if(!req.body.quoteIds){
                    let {quote_validity_duration} = (await quotesModels.getQuoteDetailsModel(req.body,  databaseConfig.views['quoteListingView']))[0];
                    let {alteredDate} = (await quotesModels.getExpiryDateByDaysModel(dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),quote_validity_duration+10))[0];
                    await quotesModels.updateQuoteValidTill(req.body.quoteId,alteredDate);
                }
     
                //service content start    
                const prepareQuoteBlocks = await blockServices.getPrepareQuoteDataServices(
                    req,
                    res,
                    pdfFlag
                );
                if (!prepareQuoteBlocks.message) {
                    headerNames = Object.keys(prepareQuoteBlocks);
                    const noHeaderIndex = headerNames.indexOf('noHeader');
                    if (noHeaderIndex !== -1) headerNames.splice(noHeaderIndex, 1);
                    headerNames.sort();
                }
                let quoteHeader = await quoteServices.getPrepareQuoteHeaderService(
                    req,
                    res,
                    pdfFlag
                );
                let quoteTemplateSettings = await quoteServices.quoteTemplateSettingsService(
                    req,
                    res,
                    pdfFlag
                );
                let quoteTotal = await quoteServices.getPrepareQuoteTotalService(
                    req,
                    res,
                    pdfFlag
                );
                let documents = await quoteServices.getQuoteDocumentsService(
                    req,
                    res,
                    pdfFlag
                );
                let adhocSections = await sectionServices.getAdhocSectionsDataService(
                    req.body,
                    pdfFlag
                );
              
                let propsalSections = await sectionServices.getProposalSectionsDataService(
                    req,
                    res,
                    pdfFlag
                );
               
                let sowSections = await sowInformationServices.getSowInformationService(
                    req,
                    res,
                    pdfFlag
                );
                //service content end
                templateId = quoteTemplateSettings.templateId;
                orderCodeDescriptionAdjacentPair = (quoteTemplateSettings.orderCodeAndDescriptionPair==1); 
                templateId==3&&extraRowMerge++;
                detailedDescriptionMergeSelector= (databaseConfig.quotePdfConfigBasedOntemplate[templateId]
                &&databaseConfig.quotePdfConfigBasedOntemplate[templateId].detailedDescriptionMergeSelector);
                defaultTemplate = databaseConfig.quotePdfConfigBasedOntemplate[templateId]?0:1;
                templatePath = databaseConfig.quotePdfConfigBasedOntemplate[templateId]?
                    databaseConfig.quotePdfConfigBasedOntemplate[templateId].path
                    :config.param('quote_template_path');
                sheetRowIndexes.splice(databaseConfig
                    .quotePdfConfigBasedOntemplate[templateId]?databaseConfig
                        .quotePdfConfigBasedOntemplate[templateId].columnCount:5);
                sheetRowColumnIndexes.splice(databaseConfig
                    .quotePdfConfigBasedOntemplate[templateId]?databaseConfig
                        .quotePdfConfigBasedOntemplate[templateId].columnCount:5);
                /* checking  enable status of sow & proposal sections */
                if (documents[documents.findIndex(element => element.id === 2)]) {
                    sowSelectorFlag =
            documents[documents.findIndex(element => element.id === 2)].enabled;
                }
                if (documents[documents.findIndex(element => element.id === 3)]) {
                    proposalSelectorFlag =
            documents[documents.findIndex(element => element.id === 3)].enabled;
                }

                /*Assigning display materials value */
                let {displayMaterials:displayMaterialsFlag,
                    disp_price_at_block, disp_price_at_header} = quoteTemplateSettings;
                // eslint-disable-next-line camelcase
                dispPriceAtBlock = (disp_price_at_block == 1);
                dispPriceAtHeader = (disp_price_at_header==1);
                /*Assigning a paymentTerms value to show in header if exist otherwise assign false*/
                const paymentTermsValue =  (quoteTemplateSettings.display_payment_terms
                     && quoteTemplateSettings.payment_terms_code && 
                     quoteTemplateSettings.payment_terms_description) || false;

                /* config object for block columns */
                let headerConfig = {
                    quantity : {
                        value      : 'Qty',
                        index      : 5,
                        width      : 18.7,
                        vertical   : 'top',
                        horizontal : 'center'
                    },
                    'order code' : {
                        value      : 'Order Code',
                        width      : 20.7,
                        index      : 1,
                        vertical   : 'top',
                        horizontal : 'left'
                    },
                    description : {
                        value      : 'Description',
                        width      : 24.7,
                        index      : 2,
                        vertical   : 'top',
                        horizontal : 'left'
                    },
                    'unit Price' : {
                        value      : 'Unit Price',
                        width      : 11.56,
                        index      : 4,
                        vertical   : 'top',
                        horizontal : 'right'
                    },
                    total : {
                        value      : 'Total',
                        index      : 6,
                        width      : 17.84,
                        vertical   : 'top',
                        horizontal : 'right'
                    },
                    material : {
                        value      : 'Material',
                        index      : 2,
                        width      : 14.7,
                        vertical   : 'top',
                        horizontal : 'left'
                    }
                };
                let  columnValues;
                if(defaultTemplate){
                    columnValues = [];
                    if (quoteTemplateSettings.columnDetails) {
                        let indexValue = 1;
                        quoteTemplateSettings.columnDetails.forEach((columnDetail) => {
                            headerConfig[columnDetail.columnName].value =
                  columnDetail.displayName;
                            headerConfig[columnDetail.columnName].index = indexValue;
                            columnValues =[
                                ...columnValues,
                                { ... headerConfig[columnDetail.columnName] }
                            ];
                            indexValue += 1;
                        });
                    }
                }else{
                    detailedDescriptionRowHeightDivider=databaseConfig
                        .quotePdfConfigBasedOntemplate[templateId].detailedDescriptionRowHeightDivider;
                    descriptionRowHeightDivider=databaseConfig
                        .quotePdfConfigBasedOntemplate[templateId].descriptionRowHeightDivider;
                    orderCodeRowHeightDivider=databaseConfig.quotePdfConfigBasedOntemplate[templateId]
                        .orderCodeRowHeightDivider;
                    leftSectionDivider=databaseConfig
                        .quotePdfConfigBasedOntemplate[templateId].leftSectionDivider;
                    rightSectionDivider=databaseConfig.quotePdfConfigBasedOntemplate[templateId]
                        .rightSectionDivider;
                    fullWidthSectionDivider=databaseConfig.quotePdfConfigBasedOntemplate[templateId]
                        .fullWidthSectionDivider;
                    (Object.keys(headerConfig)).forEach(key=>{
                        headerConfig[key].index = databaseConfig
                            .quotePdfConfigBasedOntemplate[templateId].blocksHeaderIndex[key];
                        headerConfig[key].value = databaseConfig
                            .quotePdfConfigBasedOntemplate[templateId].blocksHeaderDisplayNames[key];
                    });
                    columnValues = [
                        { ...headerConfig.quantity },
                        { ...headerConfig['order code']},
                        { ...headerConfig.description },
                        { ...headerConfig['unit Price']},
                        { ...headerConfig.total }
                    ];
                    if( templateId==4){
                        columnValues=[
                            ...columnValues,
                            { ...headerConfig['material'] }
                        ];

                    }
                }
                let HalfIndexValue = databaseConfig.quotePdfConfigBasedOntemplate[templateId]?
                    databaseConfig.quotePdfConfigBasedOntemplate[templateId]
                        .halfIndexValue
                    :await sectionHalfIndex(columnValues);
                workbook.xlsx
                    .readFile(templatePath)
                // eslint-disable-next-line node/no-unsupported-features/es-syntax
                    .then(async () => {
                        let worksheet = workbook.getWorksheet(1);
                        var imageId2 = workbook.addImage({
                            buffer    : fs.readFileSync(config.param('quote_templateLogo_path')),
                            extension : 'png'
                        });
                        worksheet.addImage(imageId2, {
                            tl  : { col: 0, row: 0 },
                            ext : { width: 201.07, height: 40.06 }
                        });
                        // header part starts
                        let quoteHeaderIndex = await headerSection(worksheet,
                            quoteHeader ,paymentTermsValue,quoteTemplateSettings,templateId==4);

                        // header part ends
                       
                        // blocks section start here
                        Rowstart = await blocksSection(
                            worksheet,
                            quoteHeaderIndex,
                            quoteTotal,
                            headerConfig,
                            columnValues,
                            displayMaterialsFlag,
                            Rowstart,                           
                            prepareQuoteBlocks,
                            descriptionRowHeightDivider,
                            orderCodeRowHeightDivider,
                            detailedDescriptionRowHeightDivider,
                            templateId==4

                        );
                        worksheet.getRow((Rowstart)).height=1.5;
                        Rowstart++;
                        // blocks section ends here
                        // adhoc section starts here
                        if (!adhocSections.Message) {
                            Rowstart = await sectionInsertion(
                                worksheet,
                                adhocSections,
                                'alignment',
                                HalfIndexValue,
                                Rowstart,
                                leftSectionDivider,
                                rightSectionDivider,
                                fullWidthSectionDivider
                            );
                        }

                        //proposal section starts here
                        if (!propsalSections.Message && proposalSelectorFlag) {
                            worksheet.getCell('A' + Rowstart).value = 'Proposals';
                            worksheet.getCell('A' + Rowstart).font = exelBoldFont;
                            worksheet.getCell('A' + Rowstart).alignment = {
                                ...worksheet.getCell('A' + Rowstart).alignment,
                                wrapText : false };

                            insertBorder(worksheet, Rowstart, 'thin');

                            Rowstart = Rowstart + 1;
                            Rowstart = await sectionInsertion(
                                worksheet,
                                propsalSections,
                                'section_position',
                                HalfIndexValue,
                                Rowstart,
                                leftSectionDivider,
                                rightSectionDivider,
                                fullWidthSectionDivider
                            );
                        }

                        //proposal section ends here

                        // sow section starts here
                        if (!sowSections.Message && sowSelectorFlag) {
                            Rowstart = await sowSection(worksheet, sowSections, Rowstart);
                        }

                        // sow section ends here

                        let tempFilePath =
              'Quote-' +
              quoteHeader[0].quote_title.split(' ').join('_') +
              '-'+ quoteHeader[0].quote_number.split(' ').join('_') +
              '.xlsx';

                        if (!fs.existsSync(tempDir)) {
                            fs.mkdirSync(tempDir);
                        }

                        workbook.xlsx
                            .writeFile(tempDir + '/' + tempFilePath)
                            .then(() => {
                                savePdf(quoteHeader[0].quote_title,
                                    quoteHeader[0].quote_number.split(' ')
                                        .join('_'), res, req, resolve);
                            })
                            .catch(err => {
                                logError(err,res);
                                sentryLogging(err,false,req);
                                return res
                                    .status(206)
                                    .json({ message: generateErrorMessage(err), status: false });
                            });
                        // }, 100);
                    })
                    .catch(err => {
                        logError(err,res);
                        sentryLogging(err,false,req);
                        return res
                            .status(206)
                            .json({ message: generateErrorMessage(err), status: false });
                    });
            } catch (e) {
                sentryLogging(e,false,req);
                logError(e,res);
                return res
                    .status(206)
                    .json({ message: generateErrorMessage(e), status: false });
            }
        })();
    });
};

/*method to save excel as pdf in a defined destination */
const savePdf = async (title,quoteNumber, res, req, resolve) => {
    let dir;
    title = title.split(' ').join('_');
    let sourceTempFilePath = 'Quote-' + title + '-'+quoteNumber+'.xlsx';
    if (req.body.filePath) {
        dir = req.body.filePath;
    }else{
        dir = config.param('mount_path') + config.param('quotePdf_folder_path');
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    generatePdf(tempDir + sourceTempFilePath, dir)
        .then(data => {
            if(config.param('pdf_intermediateExcel_delete_permission')){
                if (fs.existsSync(tempDir)) {
                    //fsExtra.remove(tempDir);
                    fs.unlink(tempDir + sourceTempFilePath, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                         
                    });
                }
            }

            if (req.body.filePath) {
                resolve([req.body.quoteId, true]);
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            sentryLogging(err,false,req);
            logError(err,res);
            if (req.body.filePath) {
                resolve([req.body.quoteId, false]);
            } else {
                return res.status(206).json({ message: err, status: false });
            }
        });
};
/*method to insert header section of excel  */
const headerSection = async(worksheet, quoteHeader,paymentTermsValue,quoteTemplateSettings,AtFlag) => {
    let quoteHeaderIndex = 5;
    const quoteHeaderColumn = databaseConfig
        .quotePdfConfigBasedOntemplate[quoteTemplateSettings.templateId] ?
        databaseConfig.quotePdfConfigBasedOntemplate[quoteTemplateSettings.templateId]
            .headerColumnvalue:
        'B';
    worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].customer;
    if(AtFlag){
        worksheet.getCell('E' + quoteHeaderIndex).value = quoteHeader[0].quote_title;
    }
    quoteHeaderIndex+=2;
    if(quoteTemplateSettings.displaySiteId){
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Site ID:';
        worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].site_id;
        quoteHeaderIndex+=2;
    }
    if(!AtFlag){
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Quote:';
        worksheet.getCell('A' + quoteHeaderIndex).font = {...worksheet.getCell('A' + quoteHeaderIndex).font,
            ...exelBoldFont};}
    worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = AtFlag?quoteHeader[0].sold_to:quoteHeader[0].quote_title;
    if(AtFlag){
        worksheet.getCell('E' + quoteHeaderIndex).value = quoteHeader[0].inquiry_number;
    }
    quoteHeaderIndex+=2;
    if(quoteTemplateSettings.displayQuoteNumberAtHeader){
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Quote ID:';
        worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].quote_number;
        quoteHeaderIndex+=2;
    }
    if(!AtFlag){
        if(quoteTemplateSettings.displayPoNumber){
            worksheet.getCell('A' + quoteHeaderIndex).value = 'PO Number:';
            worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].po_number;
            worksheet.getRow(quoteHeaderIndex+1).height=1;
            quoteHeaderIndex+=2;
        }
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Inquiry Number:';
        worksheet.getCell('A' + quoteHeaderIndex).font = {...worksheet.getCell('A' + quoteHeaderIndex).font,
            ...exelBoldFont};
        worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].inquiry_number;
        worksheet.getRow(quoteHeaderIndex+1).height=1;
        quoteHeaderIndex+=2;
    }  
    let preparedByValue =   quoteHeader[0].prepared_by +
    ', ' +
    quoteHeader[0].user_title +
    '    Phone: ' +
    quoteHeader[0].phone_number +
    '    Email:' 
    +
    quoteHeader[0].email_id;
    if(!AtFlag){
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Proposal prepared by:';
        worksheet.getCell('A' + quoteHeaderIndex).font = {...worksheet.getCell('A' + quoteHeaderIndex).font,
            ...exelBoldFont};}
    worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = preparedByValue;
    worksheet.getRow(quoteHeaderIndex+1).height=1;
    worksheet.getRow(quoteHeaderIndex).height = Math.ceil(preparedByValue.length/78)*14; 
    if(quoteTemplateSettings.displaySiteId || quoteTemplateSettings.displayPoNumber){
        horizontalMergeCellSelector = quoteHeaderColumn + 
        quoteHeaderIndex + ':'+ 
        sheetRowColumnIndexes[sheetRowColumnIndexes.length-1] + quoteHeaderIndex;
        worksheet.mergeCells(horizontalMergeCellSelector);
    } 
    quoteHeaderIndex+=2;
    if(!AtFlag){
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Date:';
        worksheet.getCell('A' + quoteHeaderIndex).font = {...worksheet.getCell('A' + quoteHeaderIndex).font,
            ...exelBoldFont};
    }
    worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].created_on;
    worksheet.getRow(quoteHeaderIndex+1).height=1;
    if(!AtFlag){
        quoteHeaderIndex+=2;
        worksheet.getCell('A' + quoteHeaderIndex).value = 'Valid To:';
        worksheet.getCell('A' + quoteHeaderIndex).font = {...worksheet.getCell('A' + quoteHeaderIndex).font,
            ...exelBoldFont};
        worksheet.getCell(quoteHeaderColumn + quoteHeaderIndex).value = quoteHeader[0].valid_quote_date;
    }
    quoteHeaderIndex++;
    if(paymentTermsValue){
        worksheet.getRow(quoteHeaderIndex).height=1;
        quoteHeaderIndex++;
        let paymentRow =worksheet.getRow(quoteHeaderIndex);
        paymentRow.height=15;
        paymentRow.getCell(1).value = 'Payment Terms:';  
        horizontalMergeCellSelector = quoteHeaderColumn + 
        quoteHeaderIndex + ':'+ 
        String.fromCharCode((quoteHeaderColumn.charCodeAt(0))+1) + quoteHeaderIndex;
        worksheet.mergeCells(horizontalMergeCellSelector);
        paymentRow.getCell(3).value = paymentTermsValue;
        paymentRow.getCell(1).font ={...paymentRow.getCell(1).font,...exelBoldFont} ;
        paymentRow.getCell(1).alignment = { ...topLeftAlign, wrapText: false };
        paymentRow.getCell(3).alignment = { ...topLeftAlign, wrapText: true };
        sheetRowIndexes.forEach(index=>paymentRow.getCell(index).border = {
            ... paymentRow.getCell(index).border,
            bottom : { style: 'thin' }
        });
        return quoteHeaderIndex ;
    }else{
        worksheet.getRow(quoteHeaderIndex).height=6;
        sheetRowIndexes.forEach(index=> worksheet.getRow(quoteHeaderIndex).getCell(index).border = {
            ... worksheet.getRow(quoteHeaderIndex).getCell(index).border,
            bottom : { style: 'thin' }
        });
        return quoteHeaderIndex;
    }
};

/*method to insert block section of excel  */
const blocksSection = async (
    worksheet,
    quoteHeaderIndex,
    quoteTotal,
    headerConfig,
    columnValues,
    displayMaterialsFlag,
    Rowstart,
    prepareQuoteBlocks ,descriptionRowHeightDivider,
    orderCodeRowHeightDivider,detailedDescriptionRowHeightDivider,AtFlag
) => {
   
    quoteHeaderIndex++;
    let blockHeaderRow = worksheet.getRow((quoteHeaderIndex));
    // temporary index to pass through each & every column in given coulmns(sheetRowIndexes)
    let tempIndex = 0;
    insertBorder(worksheet, quoteHeaderIndex, 'double');
    Rowstart=quoteHeaderIndex+2;
    columnValues.forEach(function(element) {
        if(defaultTemplate){
            var wrkColumn = worksheet.getColumn(sheetRowIndexes[tempIndex]);
            wrkColumn.width = element.width;
            tempIndex += 1;
        } 
        blockHeaderRow.getCell(element.index).alignment = {
            ... blockHeaderRow.getCell(element.index).alignment,
            vertical   : element.vertical,
            horizontal : element.horizontal
        };
        blockHeaderRow.getCell(element.index).font = exelBoldFont;
        blockHeaderRow.getCell(element.index).value = element.value;
    });
    worksheet.getRow((quoteHeaderIndex+1)).height=1;
    if (!prepareQuoteBlocks.message) {
        if(AtFlag){
            if(!prepareQuoteBlocks.noHeader){
                prepareQuoteBlocks.noHeader = {
                    blocks : []
                };
            }
            headerNames.forEach( headerName => {
                if(prepareQuoteBlocks[headerName]){
                    prepareQuoteBlocks.noHeader.blocks =[
                        ...prepareQuoteBlocks.noHeader.blocks,
                        ...prepareQuoteBlocks[headerName].blocks
                    ];
                }
            });
        }
        let colorCode, discountFlag;
        if(prepareQuoteBlocks.noHeader){
            if(!AtFlag){
                let blockRowContentHeight=0;
                let blockDiscountRowContentHeight=0;
                for (let element of prepareQuoteBlocks.noHeader.blocks) {
                    blockRowContentHeight=0;
                    blockDiscountRowContentHeight=0;
                    if(!tbdFlag){
                        tbdFlag=element.transportation_fee=== -1;
                    }
                    if(!tbdFlag){
                        transportFeeTypeArray.push(element.transportation_fee_type);
                        totalTransportFeeValue+= element.transportation_fee_type===1
                            ?0:element.transportation_fee;
                    }
                    // assigning block name with custom description  if it present to display
                    if (element.custom_description) {
                        // eslint-disable-next-line camelcase
                        element.block_name = element.custom_description;
                    }
                    //assigning color code based on discount
                    if (element.discount !== 0) {
                        colorCode = 'D3D3D3';
                        discountFlag = true;
                    } else {
                        discountFlag = false;
                        colorCode = '99CCFF';
                    }
                    let blockRow = worksheet.getRow(Rowstart);
                    insertBlockCell(
                        headerConfig['quantity'].index,
                        blockRow,
                        element.block_quantity,
                        topCenterAlign,
                        exelBoldFont,
                        colorCode
                    );
                    blockRow.getCell(headerConfig['order code'].index).fill = {
                        ...blockRow.getCell(headerConfig['order code'].index).fill ,
                        type    : 'pattern',
                        pattern : 'darkVertical',
                        fgColor : { argb: colorCode },
                        bgColor : { argb: colorCode }
                    };
                    blockRowContentHeight =Math.ceil((element.block_name ? 
                        element.block_name.trim() : '').length/descriptionRowHeightDivider)*14;
                    // if(!defaultTemplate){
                    //     horizontalMergeCellSelector = 
                    //     sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                    //     Rowstart + ':'+ 
                    //     String.fromCharCode(
                    //         (sheetRowColumnIndexes[headerConfig['description'].index-1]
                    //             .charCodeAt(0))+1+extraRowMerge) + Rowstart;
                    //     worksheet.mergeCells(horizontalMergeCellSelector);
                    // }
                    // insertBlockCell(
                    //     headerConfig['description'].index,
                    //     blockRow,
                    //     element.block_name ? element.block_name.trim() : '',
                    //     { ...topLeftAlign, wrapText: true },
                    //     exelBoldFont,
                    //     colorCode
                    // );
                    descriptionInsertion(worksheet,
                        element.block_name ? element.block_name.trim() : '',
                        colorCode,headerConfig,Rowstart,blockRow);
                    insertBlockCell(
                        headerConfig['unit Price'].index,
                        blockRow,
                        currencyFormat(element.quoted_unit_price),
                        {...topRightAlign,wrapText: true},
                        exelBoldFont,
                        colorCode
                    );
                    insertBlockCell(
                        headerConfig['total'].index,
                        blockRow,
                        currencyFormat(element.initial_total_value),
                        {...topRightAlign,wrapText: true},
                        exelBoldFont,
                        colorCode
                    );
                                       
                    blockRow.height=blockRowContentHeight;
                    if(!discountFlag && element.detailed_description){
                        Rowstart = await insertDetailedDescription(worksheet,Rowstart,element.detailed_description,headerConfig,detailedDescriptionRowHeightDivider,colorCode);
                    }
                    // inserting discount columns based on discount flag
                    if (discountFlag) {
                        Rowstart += 1;
                        blockRow = worksheet.getRow(Rowstart);               
                        insertBlockCell(
                            headerConfig['quantity'].index,
                            blockRow,
                            element.block_quantity,
                            topCenterAlign,
                            exelBoldFont,
                            '99CFB8'
                        );
                        blockRow.getCell(headerConfig['order code'].index).fill = {
                            ...blockRow.getCell(headerConfig['order code'].index).fill,
                            type    : 'pattern',
                            pattern : 'darkVertical',
                            fgColor : { argb: '99CFB8' },
                            bgColor : { argb: '99CFB8' }
                        };
                        descriptionInsertion(worksheet,
                            element.block_name ? element.block_name.trim() : '',
                            '99CFB8',headerConfig,Rowstart,blockRow);
                        // if(!defaultTemplate){
                        //     horizontalMergeCellSelector = 
                        //     sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                        //     Rowstart + ':'+ 
                        //     String.fromCharCode(
                        //         (sheetRowColumnIndexes[headerConfig['description'].index-1]
                        //             .charCodeAt(0))+1+extraRowMerge) + Rowstart;
                        //     worksheet.mergeCells(horizontalMergeCellSelector);
                        // }
                        // insertBlockCell(
                        //     headerConfig['description'].index,
                        //     blockRow,
                        //     element.block_name ? element.block_name.trim() : '',
                        //     { ...topLeftAlign, wrapText: true },
                        //     exelBoldFont,
                        //     '99CFB8'
                        // );
                        let tempValue =
                                      '(' +
                                      currencyFormat(element.discount_amount_value) +
                                      ') ' +
                                      element.discount.toFixed(2) +
                                      '% Discount';
                        blockDiscountRowContentHeight= Math.ceil(
                            tempValue.trim().length/11)*14;
                        insertBlockCell(
                            headerConfig['unit Price'].index,
                            blockRow,
                            tempValue,
                            { ...topRightAlign, wrapText: true },
                            exelBoldFont,
                            '99CFB8'
                        );
                        tempValue = currencyFormat(element.discount_total_value);
                        insertBlockCell(
                            headerConfig['total'].index,
                            blockRow,
                            tempValue,
                            { ...topRightAlign, wrapText: true },
                            exelBoldFont,
                            '99CFB8'
                        );
                        blockRow.height=Math.max(blockRowContentHeight,blockDiscountRowContentHeight);
                        Rowstart += 1;
                        blockRow = worksheet.getRow(Rowstart);
                        blockRow.height=blockRowContentHeight;
                        insertBlockCell(
                            headerConfig['quantity'].index,
                            blockRow,
                            element.block_quantity,
                            { ...topCenterAlign, wrapText: true },
                            exelBoldFont,
                            '99CCFF'
                        );
                        blockRow.getCell(headerConfig['order code'].index).fill = {
                            type    : 'pattern',
                            ...blockRow.getCell(headerConfig['order code'].index).fill,
                            pattern : 'darkVertical',
                            fgColor : { argb: '99CCFF' },
                            bgColor : { argb: '99CCFF' }
                        };
                        descriptionInsertion(worksheet,
                            element.block_name ? element.block_name.trim() : '',
                            '99CCFF',headerConfig,Rowstart,blockRow);
                        tempValue = currencyFormat(element.final_amount_value);
                        insertBlockCell(
                            headerConfig['unit Price'].index,
                            blockRow,
                            tempValue,
                            { ...topRightAlign, wrapText: true },
                            exelBoldFont,
                            '99CCFF'
                        );
                        tempValue = currencyFormat(element.final_total_value);
                        insertBlockCell(
                            headerConfig['total'].index,
                            blockRow,
                            tempValue,
                            { ...topRightAlign, wrapText: true },
                            exelBoldFont,
                            '99CCFF'
                        );
                        if(element.detailed_description){
                            Rowstart = await insertDetailedDescription(worksheet,Rowstart,element.detailed_description,headerConfig,detailedDescriptionRowHeightDivider, '99CCFF');
                        }
                    }
                    // inserting materials based on display material flag
                    if (displayMaterialsFlag) {
                        element.materials.forEach(material => {
                            if(material.showMaterialInQuote==1){
                                Rowstart += 1;
                                let blockmaterialRow = worksheet.getRow(Rowstart);    
                                blockmaterialRow.height = Math.max(Math.ceil((material.orderCode ? material.orderCode.trim() : '').length/orderCodeRowHeightDivider), 
                                    Math.ceil((material.description ? material.description.trim() : '').length/descriptionRowHeightDivider))*14;
                                blockmaterialRow.getCell(headerConfig['quantity'].index).value =
                                        material.quantity;
                                blockmaterialRow.getCell(
                                    headerConfig['quantity'].index
                                ).alignment = topCenterAlign;
                                blockmaterialRow.getCell(
                                    headerConfig['order code'].index
                                ).value = material.orderCode ? material.orderCode.trim() : '';
                                               
                            
                                blockmaterialRow.getCell(
                                    headerConfig['order code'].index
                                ).alignment = { ...topLeftAlign, wrapText: true };
                                if(!defaultTemplate){
                                    horizontalMergeCellSelector = 
                                                    sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                                                    Rowstart + ':'+ 
                                                    String.fromCharCode(
                                                        (sheetRowColumnIndexes[headerConfig['description'].index-1]
                                                            .charCodeAt(0))+1+extraRowMerge) + Rowstart;
                                    worksheet.mergeCells(horizontalMergeCellSelector);
                                }
                                blockmaterialRow.getCell(
                                    headerConfig['description'].index
                                ).value = material.description ? material.description.trim() : '';
                                blockmaterialRow.getCell(
                                    headerConfig['description'].index
                                ).alignment = { ...topLeftAlign, wrapText: true };
                            }
                                                
                        });
                    } 
                            
                    Rowstart += 1;
                } 
            }else{
                let tempOrderCodeValue=100;
                // prepareQuoteBlocks.noHeader.blocks.forEach(element => {
                for (let element of prepareQuoteBlocks.noHeader.blocks) {
                    if(!tbdFlag){
                        tbdFlag=element.transportation_fee=== -1;
                    }
                    if(!tbdFlag){
                        transportFeeTypeArray.push(element.transportation_fee_type);
                        totalTransportFeeValue+= element.transportation_fee_type===1
                            ?0:element.transportation_fee;
                    }
                    let blockRow = worksheet.getRow(Rowstart);
                    let materialHeight = Math.ceil((element.block_name.length/14))*14;
                    let descriptionHeight = Math.ceil((!element.custom_description? element.block_description : element.custom_description).length/33)*14;
                    blockRow.height=Math.max(materialHeight,descriptionHeight);
                    insertBlockCell(
                        headerConfig['order code'].index,
                        blockRow,
                        (`0000000${tempOrderCodeValue}`).slice(-6) ,
                        { ...topLeftAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );
                    insertBlockCell(
                        headerConfig['material'].index,
                        blockRow,
                        element.block_name,
                        { ...topLeftAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );
                    horizontalMergeCellSelector = 
                    sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                    Rowstart + ':'+ 
                    String.fromCharCode(
                        (sheetRowColumnIndexes[headerConfig['description'].index-1]
                            .charCodeAt(0))+1) + Rowstart;
                    worksheet.mergeCells(horizontalMergeCellSelector);
                    insertBlockCell(
                        headerConfig['description'].index,
                        blockRow,
                        !element.custom_description ? element.block_description : element.custom_description,
                        { ...topLeftAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );
                    insertBlockCell(
                        headerConfig['unit Price'].index,
                        blockRow,
                        element.discount? currencyFormat(element.final_amount_value) : currencyFormat(element.quoted_unit_price),
                        {...topRightAlign,wrapText: true},
                        exelBoldFont,
                        '99CCFF'
                    );
                    insertBlockCell(
                        headerConfig['quantity'].index,
                        blockRow,
                        element.block_quantity,
                        topCenterAlign,
                        exelBoldFont,
                        '99CCFF'
                    );
                    insertBlockCell(
                        headerConfig['total'].index,
                        blockRow,
                        element.discount? currencyFormat(element.final_total_value) : currencyFormat(element.initial_total_value),
                        {...topRightAlign,wrapText: true},
                        exelBoldFont,
                        '99CCFF'
                    );
                    if(element.detailed_description){
                        Rowstart = await insertDetailedDescription(worksheet,Rowstart,element.detailed_description,headerConfig,detailedDescriptionRowHeightDivider, '99CCFF');
                    }
                    Rowstart++;
                    tempOrderCodeValue+=100;

                }
                //);
                //Rowstart += 1;
            }
      
        }
        if(!AtFlag){
            for(let headerNameIndex=0 ;headerNames.length>headerNameIndex;headerNameIndex++){
                Rowstart = await HeaderBlockInsertion(headerNames[headerNameIndex],
                    prepareQuoteBlocks,Rowstart,headerConfig,
                    worksheet,orderCodeRowHeightDivider,descriptionRowHeightDivider,
                    detailedDescriptionRowHeightDivider);
            }
        }
        worksheet.getRow((Rowstart)).height=2;
        insertBorder(worksheet, Rowstart, 'thin');
        isAllTransportFeeNoneType=!tbdFlag &&
        transportFeeTypeArray.every(currentValue => currentValue === 1);
        //total quote starts here
        let loopLength=4+(isAllTransportFeeNoneType?0:2);
        /* looping for 3 rows to insert total value cell*/
        for (let i = 1; i < loopLength; i++) {
            let transportFeeLiteral,grandTotalLiteral,transportFeeLiteral1,grandTotalLiteral1;
            Rowstart += 1;
            let totalLiteral = (isAllTransportFeeNoneType?
                'Total Quote: ':'Sub Total: ')  ;
            let totalLiteral1 =  currencyFormat(quoteTotal) ;
            if(!isAllTransportFeeNoneType){
                transportFeeLiteral = 'Transportation Fee: ';  
                transportFeeLiteral1 = (tbdFlag?'TBD':currencyFormat(Number(totalTransportFeeValue)));       
                grandTotalLiteral = 'Total Quote: ';        
                grandTotalLiteral1 = (tbdFlag?  currencyFormat(quoteTotal) : currencyFormat(quoteTotal + Number(totalTransportFeeValue)));        
            }
            let TotalRow = worksheet.getRow(Rowstart);
            if (i == 2) {     
                let totalQuoteCell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 3] 
                + Rowstart;
                let totalQuoteValueCell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] 
                + Rowstart;
                worksheet.getCell(totalQuoteCell).value = totalLiteral;
                worksheet.getCell(totalQuoteValueCell).value = totalLiteral1;
                
                worksheet.getCell(totalQuoteCell).alignment = topLeftAlign;
                worksheet.getCell(totalQuoteValueCell).alignment = topRightAlign;
                isAllTransportFeeNoneType && (worksheet.getCell(totalQuoteCell).font = exelBoldFont) && (worksheet.getCell(totalQuoteValueCell).font = exelBoldFont)  ;
                let totalQuote1Cell,totalQuote2Cell;
                if(!isAllTransportFeeNoneType){
                    totalQuote1Cell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 3] 
                    + (Rowstart+1);
                    totalQuote2Cell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] 
                    + (Rowstart+1);
                    worksheet.getCell(totalQuote1Cell).value = transportFeeLiteral;
                    worksheet.getCell(totalQuote2Cell).value = transportFeeLiteral1;
                    //worksheet.getCell(totalQuote1Cell).font = exelBoldFont;
                    worksheet.getCell(totalQuote1Cell).alignment = topLeftAlign;           
                    worksheet.getCell(totalQuote2Cell).alignment = topRightAlign;           
                    totalQuote1Cell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 3] +
                     (Rowstart+2);             
                    totalQuote2Cell = sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] +
                     (Rowstart+2);             
                    worksheet.getCell(totalQuote1Cell).value = grandTotalLiteral;
                    worksheet.getCell(totalQuote2Cell).value = grandTotalLiteral1;
                    worksheet.getCell(totalQuote1Cell).font = exelBoldFont;
                    worksheet.getCell(totalQuote2Cell).font = exelBoldFont;
                    worksheet.getCell(totalQuote1Cell).alignment = topLeftAlign;
                    worksheet.getCell(totalQuote2Cell).alignment = topRightAlign;
      
                }
            }
            sheetRowIndexes.forEach(i => {
                TotalRow.getCell(i).fill = {
                    ...TotalRow.getCell(i).fill,
                    type    : 'pattern',
                    pattern : 'darkVertical',
                    fgColor : { argb: 'F2F2F2' },
                    bgColor : { argb: 'F2F2F2' }
                };
            });
        }

    //total quote ends here
    } else {
        Rowstart += 1;
        horizontalMergeCellSelector = 'C' + Rowstart + ':D' + Rowstart;
        worksheet.mergeCells(horizontalMergeCellSelector);
        let noDataCell = 'C' + Rowstart;
        worksheet.getCell(noDataCell).value = 'No Data Available';
        worksheet.getCell(noDataCell).alignment = topCenterAlign;
        Rowstart += 1;
    }
    insertBorder(worksheet, Rowstart, 'double');
    Rowstart += 1;

    return Rowstart;
};
/*method to insert adhoc & proposal sections of excel  */
const sectionInsertion = async (
    worksheet,
    sections,
    alignment,
    HalfIndexValue,
    Rowstart, leftSectionDivider,
    rightSectionDivider,
    fullWidthSectionDivider
) => {
    let index = 0;
    let leftContentLength = 0;
    for (const section of sections) {
        let rowLines=0;
        let content = section.section_content;
        if (section[alignment] === 'fullwidth') {
            horizontalMergeCellSelector = 'A' + Rowstart +
              ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart;

            worksheet.mergeCells(horizontalMergeCellSelector);
            worksheet.getCell('A' + Rowstart).value = ' ' + section.section_header;
            styleRow = Rowstart + 1;

            worksheet.getCell('A' + Rowstart).border = {
                ...worksheet.getCell('A' + Rowstart).border,
                bottom : { style: 'thin' },
                left   : { style: 'thin' },
                right  : { style: 'thin' }
            };

            worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border = {
                ...worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border,
                right : { style: 'thin' }
              
            };
            worksheet.getCell('A' + styleRow).border = {
                ...worksheet.getCell('A' + styleRow).border,
                left : { style: 'thin' }
              
            };
            // to make right thin border if its not first section
            if (index > 1) {
                styleRow = Rowstart - 1;
                worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border = {
                    ...worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border,
                    right : { style: 'thin' }
                };
            }
            worksheet.getCell('A' + Rowstart).font = exelBoldFont;
            Rowstart = Rowstart + 2;
            worksheet.mergeCells('A' + Rowstart +  ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart);
            worksheet.getCell('A' + Rowstart).value = content;
            worksheet.getCell('A' + Rowstart).alignment = {
                ...worksheet.getCell('A' + Rowstart).alignment,
                vertical   : 'top',
                horizontal : 'left',
                wrapText   : true,
                indent     : 1
            };
            worksheet.getCell('A' + Rowstart).border = {
                ...worksheet.getCell('A' + Rowstart).border,
                right : { style: 'thin' },
                left  : { style: 'thin' }
            };
            Rowstart++;
            worksheet.mergeCells('A' + Rowstart +  ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart);
            worksheet.getCell('A' + Rowstart).border = {
                ...worksheet.getCell('A' + Rowstart).border,
                right  : { style: 'thin' },
                bottom : { style: 'thin' },
                left   : { style: 'thin' }
            };
            let endRow = worksheet.getRow(Rowstart-1);
            content.split('\n').forEach((line)=>{
                rowLines+=Math.ceil(line.length/fullWidthSectionDivider)?Math.ceil(line.length/fullWidthSectionDivider):1;
            });
            endRow.height = rowLines*13;
            Rowstart += 1;
        }
        if (section[alignment] === 'left') {
            content.split('\n').forEach((line)=>{
                rowLines+=Math.ceil(line.length/leftSectionDivider)?Math.ceil(line.length/leftSectionDivider):1;
            });
            leftContentLength = rowLines*13;
            horizontalMergeCellSelector =
        'A' +
        Rowstart +
        ':' +
        sheetRowColumnIndexes[HalfIndexValue - 1] +
        Rowstart;

            worksheet.mergeCells(horizontalMergeCellSelector);
            worksheet.getCell('A' + Rowstart).value = ' ' + section.section_header;

            worksheet.getCell('A' + Rowstart).border = {
                ...worksheet.getCell('A' + Rowstart).border,
                bottom : { style: 'thin' },
                right  : { style: 'thin' },
                left   : { style: 'thin' }
            };
            worksheet.getCell('A' + Rowstart).border.bottom.style = 'thin';
            styleRow = Rowstart + 1;

            // making right border based on adhoc half index
            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue - 1] + styleRow
            ).border = {
                ...worksheet.getCell(
                    sheetRowColumnIndexes[HalfIndexValue - 1] + styleRow
                ).border,
                right : { style: 'thin' }
            };
            worksheet.getCell(
                'A' + styleRow
            ).border = {
                ...worksheet.getCell(
                    'A' + styleRow
                ).border,
                left : { style: 'thin' }
            };
            worksheet.getCell('A' + Rowstart).font = exelBoldFont;
            // temporary left section row index
            leftTempRowIndex = Rowstart + 2;
            worksheet.mergeCells(
                'A' +
          leftTempRowIndex +
          ':' +
          sheetRowColumnIndexes[HalfIndexValue - 1] +
          leftTempRowIndex
            );
            worksheet.getCell('A' + leftTempRowIndex).value = content;
            worksheet.getCell('A' + leftTempRowIndex).alignment = {
                ...worksheet.getCell('A' + leftTempRowIndex).alignment,
                ...topLeftAlign,
                wrapText : true ,
                indent   : 1
            };
            worksheet.getCell('A' + (leftTempRowIndex)).border = {
                ...worksheet.getCell('A' + (leftTempRowIndex)),
                right : { style: 'thin' },
                left  : { style: 'thin' }
            };
            worksheet.mergeCells(
                'A' +
          (leftTempRowIndex+1) +
          ':' +
          sheetRowColumnIndexes[HalfIndexValue - 1] +
          (leftTempRowIndex+1)
            );
            worksheet.getCell('A' + (leftTempRowIndex+1)).border = {
                ...worksheet.getCell('A' + (leftTempRowIndex+1)),
                right  : { style: 'thin' },
                left   : { style: 'thin' },
                bottom : { style: 'thin' }
                
            };
            // assigning rowstart with temp left row index if its last or there are no right section after that
            if (
                index === sections.length - 1 ||
        sections[index + 1][alignment] !== 'right'
            ) {
                Rowstart = leftTempRowIndex + 2;
                worksheet.getRow(leftTempRowIndex).height =  leftContentLength;
            }
        }
        if (section[alignment] === 'right') {
            horizontalMergeCellSelector =
        sheetRowColumnIndexes[HalfIndexValue] + Rowstart + ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart;
            worksheet.mergeCells(horizontalMergeCellSelector);
            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart
            ).value = ' ' + section.section_header;
            styleRow = Rowstart + 1;

            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart
            ).border = {
                ... worksheet.getCell(
                    sheetRowColumnIndexes[HalfIndexValue] + Rowstart
                ).border,
                bottom : { style: 'thin' },
                right  : { style: 'thin' }
            };

            worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border = {
                ...worksheet.getCell(sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + styleRow).border,
                right : { style: 'thin' }
            };
            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart
            ).font = exelBoldFont;
            Rowstart = Rowstart + 2;
            worksheet.mergeCells(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart + ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart
            );
            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart
            ).value = content;
            worksheet.getCell(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart
            ).alignment = {
                ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart)
                    .alignment,
                ...topLeftAlign,
                wrapText : true,
                indent   : 1
            };
            worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border = {
                ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border,
                right : { style: 'thin' }
            };
            Rowstart = Rowstart + 1;
            worksheet.mergeCells(
                sheetRowColumnIndexes[HalfIndexValue] + Rowstart + ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart
            );
            worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border = {
                ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border,
                right  : { style: 'thin' },
                bottom : { style: 'thin' }     
            };
            //checking if its not first index & also is there any left section beside  & making borders
            if (index == 0) {
                worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border = {
                    ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + Rowstart).border,
                    bottom : { style: 'thin' },
                    right  : { style: 'thin' },
                    left   : { style: 'thin' }
                };
                worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + (Rowstart-1)).border = {
                    ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] +(Rowstart-1)).border,
                    left : { style: 'thin' }
                };
                worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + (Rowstart-2)).border = {
                    ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + (Rowstart-2)).border,
                    left : { style: 'thin' }
                };
                worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + (Rowstart-3)).border = {
                    ...worksheet.getCell(sheetRowColumnIndexes[HalfIndexValue] + (Rowstart-2)).border,
                    left : { style: 'thin' }
                };

              
            }
            content.split('\n').forEach((line)=>{
                rowLines+=Math.ceil(line.length/rightSectionDivider)?Math.ceil(line.length/rightSectionDivider):1;
            });
            leftContentLength > rowLines*13
                ? (worksheet.getRow(Rowstart-1).height = leftContentLength)
                : (worksheet.getRow(Rowstart-1).height = rowLines*13);
            Rowstart++;
        }
     

        index++;
    }
    insertBorder(worksheet, Rowstart, 'double');
    Rowstart++;
    worksheet.getRow((Rowstart)).height=1.5;
    // if (promiseFlag) {
    Rowstart++;
    return Rowstart;
    // }
};
/*method to insert sow section of excel  */
const sowSection = async (worksheet, sowSections, Rowstart) => {
    worksheet.getCell('A' + Rowstart).value = ' SCOPE OF WORK';
    worksheet.getCell('A' + Rowstart).font = exelBoldFont;
    worksheet.getCell('A' + Rowstart).alignment = {
        ...worksheet.getCell('A' + Rowstart).alignment,
        wrapText : false };
    insertBorder(worksheet, Rowstart, 'thin');
    Rowstart = Rowstart + 2;

    for (const sowSection of sowSections) {
        horizontalMergeCellSelector = 'A' + Rowstart + ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart;

        worksheet.mergeCells(horizontalMergeCellSelector);
        worksheet.getCell('A' + Rowstart).value = ' ' + sowSection.header;
        worksheet.getCell('A' + Rowstart).font = {
            ...worksheet.getCell('A' + Rowstart).font,
            name      : 'Calibri',
            bold      : true,
            size      : 10,
            underline : true
        };
        worksheet.getCell('A' + Rowstart).alignment = {
            ...worksheet.getCell('A' + Rowstart).alignment,
            topLeftAlign};

        if (sowSection.sow_inclusions) {
            Rowstart = await insertSowContent(
                worksheet,
                'Inclusions:',
                sowSection,
                'sow_inclusions',
                Rowstart
            );
        }
        if (sowSection.sow_exclusions) {
            Rowstart = await insertSowContent(
                worksheet,
                'Exclusions:',
                sowSection,
                'sow_exclusions',
                Rowstart
            );
        }
        if (sowSection.assumption) {
            Rowstart = await insertSowContent(
                worksheet,
                'Assumptions:',
                sowSection,
                'assumption',
                Rowstart
            );
        }
        Rowstart++;
    }
    return Rowstart;
};

/*method to insert borders for sections in excel  */
const insertBorder = (worksheet, Rowstart, borderType) => {
    finishRow = worksheet.getRow(Rowstart);
    sheetRowIndexes.forEach(i => {
        finishRow.getCell(i).border = {
            ...finishRow.getCell(i).border,
            bottom : { style: borderType }
        };
    });
};
/*method to insert exclusions,assumpations,inclusions of sow in excel  */
const insertSowContent = async (
    worksheet,
    header,
    sowSection,
    section,
    Rowstart
) => {
    Rowstart++;
    horizontalMergeCellSelector = 'A' + Rowstart + ':C' + Rowstart;
    worksheet.mergeCells(horizontalMergeCellSelector);
    worksheet.getCell('A' + Rowstart).value = '          ' + header;
    worksheet.getCell('A' + Rowstart).font = {
        ...worksheet.getCell('A' + Rowstart).font,
        name : 'Arial',
        bold : true,
        size : 10
    };
    let contentArray = sowSection[section].split('*');
    contentArray.splice(0, 1);
    contentArray.forEach(content => {
        content= content.trim();
        content= content.split('\n').join(' ');
        Rowstart++;
        horizontalMergeCellSelector = 'A' + Rowstart +  ':'+ sheetRowColumnIndexes[sheetRowColumnIndexes.length - 1] + Rowstart;
        worksheet.mergeCells(horizontalMergeCellSelector);
        worksheet.getCell('A' + Rowstart).value = '             *' + content;
        worksheet.getRow(Rowstart).height =Math.ceil(('             *' + content).length/113)*14 ;
        worksheet.getCell('A' + Rowstart).alignment = {
            ...worksheet.getCell('A' + Rowstart).alignment,
            ...topLeftAlign};
    });
    Rowstart++;
    return Rowstart;
};
/*method to insert a particular cell of block section in excel  */
const insertBlockCell = (index, row, value, alignment, font, colorCode,hideValueFlag=false) => {
    row.getCell(index).value = hideValueFlag?'':value;
    row.getCell(index).alignment = alignment;
    row.getCell(index).font = font;
    row.getCell(index).fill = {
        ...row.getCell(index).fill,
        type    : 'pattern',
        pattern : 'darkVertical',
        fgColor : { argb: colorCode },
        bgColor : { argb: colorCode }
    };
};
/*method to determine half index of adhoc & proposal sections in excel  */
const sectionHalfIndex = async columnValues => {
    // variables to decide half width of  section
    let halfWidth = 0,
        HalfIndex;
    for (let element of columnValues) {
        halfWidth += element.width;
        // max limit for halfwidth is 49.5
        if (halfWidth >= 38) {
            HalfIndex = element.index;

            break;
        }
    }
    return HalfIndex;
};
const HeaderBlockInsertion = async (headerKey,prepareQuoteBlocks,Rowstart,
    headerConfig,worksheet,orderCodeRowHeightDivider,descriptionRowHeightDivider,detailedDescriptionRowHeightDivider) =>{
    let RcisDiscountRow=0,discountFlag,colorCode,headerRow;
    if(prepareQuoteBlocks[headerKey]){
        headerRow=worksheet.getRow(Rowstart);
        if(!defaultTemplate){
            horizontalMergeCellSelector = 
            sheetRowColumnIndexes[headerConfig['description'].index-1] + 
            Rowstart + ':'+ 
            String.fromCharCode(
                (sheetRowColumnIndexes[headerConfig['description'].index-1]
                    .charCodeAt(0))+1+extraRowMerge) + Rowstart;
        
            worksheet.mergeCells(horizontalMergeCellSelector);
        }
        sheetRowIndexes.forEach(index=>headerRow.getCell(index).fill = {
            type    : 'pattern',
            pattern : 'darkVertical',
            fgColor : { argb: 'dedede' },
            bgColor : { argb: 'dedede' }
        });
        headerRow.getCell(headerConfig['description'].index).value=headerKey;
        headerRow.getCell(headerConfig['description'].index).font=exelBoldFont;
        if(dispPriceAtHeader){
            let TotalPrice = (dispPriceAtBlock) ? currencyFormat(
                prepareQuoteBlocks[headerKey].header_quoted_unit_price -
                    prepareQuoteBlocks[headerKey].header_quoted_discount_total): currencyFormat(
                prepareQuoteBlocks[headerKey].header_quoted_unit_price);
            headerRow.getCell(headerConfig['total'].index).value = TotalPrice;
            headerRow.getCell(headerConfig['total'].index).font=exelBoldFont;
            headerRow.getCell(headerConfig['total'].index).alignment={ ...topRightAlign, wrapText: true };
        }     
        if(!dispPriceAtBlock&&prepareQuoteBlocks[headerKey].totalDiscountBocks>0){
            RcisDiscountRow=Rowstart;
            Rowstart+=(prepareQuoteBlocks[headerKey].totalDiscountBocks+1);
        }
        Rowstart += 1;
        for (let element of prepareQuoteBlocks[headerKey].blocks) {
            if(!tbdFlag){
                tbdFlag=Number(element.transportation_fee)=== -1;
            }
            if(!tbdFlag){
                transportFeeTypeArray.push(element.transportation_fee_type);
                totalTransportFeeValue= totalTransportFeeValue+Number(element.transportation_fee);
            }
            // assigning block name with custom description  if it present to display
            if (element.custom_description) {
                // eslint-disable-next-line camelcase
                element.block_description = element.custom_description;
            }
            //assigning color code based on discount
            if (element.discount !== 0) {
                colorCode = dispPriceAtBlock?'D3D3D3':'ffffff';
                discountFlag = true;
            } else {
                discountFlag = false;
                colorCode = dispPriceAtBlock?'99CCFF':'ffffff';
            }
            let blockRow = worksheet.getRow(Rowstart);
            blockRow.height= Math.max(Math.ceil((element.block_name ? element.block_name.trim() : '').length/orderCodeRowHeightDivider), 
                Math.ceil((element.block_description ? element.block_description.trim() : '').length/descriptionRowHeightDivider))*14;
            insertBlockCell(
                headerConfig['quantity'].index,
                blockRow,
                element.block_quantity,
                {...topCenterAlign,wrapText: true},
                exelBoldFont,
                colorCode
            );
            insertBlockCell(
                headerConfig['order code'].index,
                blockRow,
                element.block_name ? element.block_name.trim() : '',
                { ...topLeftAlign, wrapText: true },
                exelBoldFont,
                colorCode
            );
            descriptionInsertion(worksheet,
                element.block_description ?
                    element.block_description.trim() : '',
                colorCode,headerConfig,Rowstart,blockRow);
            // if(!defaultTemplate){
            //     horizontalMergeCellSelector = 
            //     sheetRowColumnIndexes[headerConfig['description'].index-1] + 
            //     Rowstart + ':'+ 
            //     String.fromCharCode(
            //         (sheetRowColumnIndexes[headerConfig['description'].index-1]
            //             .charCodeAt(0))+1+extraRowMerge) + Rowstart;
               
            //     worksheet.mergeCells(horizontalMergeCellSelector);
            // }
            // insertBlockCell(
            //     headerConfig['description'].index,
            //     blockRow,
            //     element.block_description ? element.block_description.trim() : '',
            //     { ...topLeftAlign, wrapText: true },
            //     exelBoldFont,
            //     colorCode
            // ); 
            insertBlockCell(
                headerConfig['unit Price'].index,
                blockRow,
                currencyFormat(element.quoted_unit_price),
                { ...topRightAlign, wrapText: true },
                exelBoldFont,
                colorCode,
                !dispPriceAtBlock
            );
            insertBlockCell(
                headerConfig['total'].index,
                blockRow,
                currencyFormat(element.initial_total_value),
                { ...topRightAlign, wrapText: true },
                exelBoldFont,
                colorCode,
                !dispPriceAtBlock
            );
            if((!discountFlag && element.detailed_description)||(!dispPriceAtBlock && element.detailed_description)){
                Rowstart = await insertDetailedDescription(worksheet,Rowstart,element.detailed_description,headerConfig,detailedDescriptionRowHeightDivider,colorCode);
            }
            // inserting discount columns based on discount flag
            if (discountFlag) {
             
                if(dispPriceAtBlock){
                    Rowstart += 1;
                    // blockRow=worksheet.getRow(Rowstart);
                }else{
                    // blockRow=worksheet.getRow(RcisDiscountRow);
                    RcisDiscountRow+=1;
                }
                blockRow = dispPriceAtBlock?
                    worksheet.getRow(Rowstart):worksheet.getRow(RcisDiscountRow);
                let mergeRowStart =  dispPriceAtBlock?Rowstart:RcisDiscountRow;
                insertBlockCell(
                    headerConfig['quantity'].index,
                    blockRow,
                    element.block_quantity,
                    topCenterAlign,
                    exelBoldFont,
                    '99CFB8'
                );
                insertBlockCell(
                    headerConfig['order code'].index,
                    blockRow,
                    element.block_name ? element.block_name.trim() : '',
                    { ...topLeftAlign, wrapText: true },
                    exelBoldFont,
                    '99CFB8'
                );
                if(!defaultTemplate){
                    horizontalMergeCellSelector = 
                    sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                    mergeRowStart + ':'+ 
                    String.fromCharCode(
                        (sheetRowColumnIndexes[headerConfig['description'].index-1]
                            .charCodeAt(0))+1+extraRowMerge) + mergeRowStart;
                    worksheet.mergeCells(horizontalMergeCellSelector);
                }
                insertBlockCell(
                    headerConfig['description'].index,
                    blockRow,
                    element.block_description ? element.block_description.trim() : '',
                    { ...topLeftAlign, wrapText: true },
                    exelBoldFont,
                    '99CFB8'
                );
                let tempValue =
              '(' +
              currencyFormat(element.discount_amount_value) +
              ') ' +
              element.discount.toFixed(2) +
              '% Discount';
                let tempvaluelength= tempValue.trim().length;
                insertBlockCell(
                    headerConfig['unit Price'].index,
                    blockRow,
                    tempValue,
                    { ...topRightAlign, wrapText: true },
                    exelBoldFont,
                    '99CFB8'
                );
                tempValue = currencyFormat(element.discount_total_value);
                insertBlockCell(
                    headerConfig['total'].index,
                    blockRow,
                    tempValue,
                    { ...topRightAlign, wrapText: true },
                    exelBoldFont,
                    '99CFB8'
                );
                let tempHeight= Math.max(Math.ceil((element.block_name ? element.block_name.trim() : '').length/orderCodeRowHeightDivider), 
                    Math.ceil(( element.block_description ? element.block_description.trim() : '').length/descriptionRowHeightDivider),
                    Math.ceil(
                        tempvaluelength/11)
                )*14;
                blockRow.height=tempHeight;
                if(dispPriceAtBlock){
                    Rowstart += 1;
                    blockRow = worksheet.getRow(Rowstart);
                    blockRow.height=Math.max(Math.ceil((element.block_name ? element.block_name.trim() : '').length/orderCodeRowHeightDivider), 
                        Math.ceil(( element.block_description ? element.block_description.trim() : '').length/descriptionRowHeightDivider)
                    )*14;
                    insertBlockCell(
                        headerConfig['quantity'].index,
                        blockRow,
                        element.block_quantity,
                        topCenterAlign,
                        exelBoldFont,
                        '99CCFF'
                    );
                    insertBlockCell(
                        headerConfig['order code'].index,
                        blockRow,
                        element.block_name ? element.block_name.trim() : '',
                        { ...topLeftAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );
                    descriptionInsertion(worksheet,
                        element.block_description ?
                            element.block_description.trim() : '',
                        '99CCFF',headerConfig,Rowstart,blockRow);
                    // if(!defaultTemplate){
                    //     horizontalMergeCellSelector = 
                    //     sheetRowColumnIndexes[headerConfig['description'].index-1] + 
                    //     Rowstart + ':'+ 
                    //     String.fromCharCode(
                    //         (sheetRowColumnIndexes[headerConfig['description'].index-1]
                    //             .charCodeAt(0))+1+extraRowMerge) + Rowstart;
                    //     worksheet.mergeCells(horizontalMergeCellSelector);
                    // }
                    // insertBlockCell(
                    //     headerConfig['description'].index,
                    //     blockRow,
                    //     element.block_description ? element.block_description.trim() : '',
                    //     { ...topLeftAlign, wrapText: true },
                    //     exelBoldFont,
                    //     '99CCFF'
                    // );
                    tempValue = currencyFormat(element.final_amount_value);
                    insertBlockCell(
                        headerConfig['unit Price'].index,
                        blockRow,
                        tempValue,
                        { ...topRightAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );

                    tempValue = currencyFormat(element.final_total_value);
                    insertBlockCell(
                        headerConfig['total'].index,
                        blockRow,
                        tempValue,
                        { ...topRightAlign, wrapText: true },
                        exelBoldFont,
                        '99CCFF'
                    );
                    if(element.detailed_description){
                        Rowstart = await insertDetailedDescription(worksheet,Rowstart,element.detailed_description,headerConfig,detailedDescriptionRowHeightDivider,'99CCFF');
                    }
                }
               
            }
            Rowstart += 1;
        } 
        if(RcisDiscountRow!=0){
            headerRow=worksheet.getRow(RcisDiscountRow+1);
            sheetRowIndexes.forEach(index=>headerRow.getCell(index).fill = {
                type    : 'pattern',
                pattern : 'darkVertical',
                fgColor : { argb: '99CCFF' },
                bgColor : { argb: '99CCFF' }
            });
            headerRow.getCell(headerConfig['description'].index).value=headerKey;
            headerRow.getCell(headerConfig['description'].index).font=exelBoldFont;
            headerRow.getCell(headerConfig['total'].index).value=currencyFormat(
                prepareQuoteBlocks[headerKey].header_quoted_unit_price
                -prepareQuoteBlocks[headerKey].header_quoted_discount_total);
            headerRow.getCell(headerConfig['total'].index).font=exelBoldFont;
            headerRow.getCell(headerConfig['total'].index).alignment={ ...topRightAlign, wrapText: true };
        }
    }
    return Rowstart;
};
const descriptionInsertion = (worksheet,value,colorCode,headerConfig,Rowstart,blockRow) =>{
    if(!defaultTemplate){
        horizontalMergeCellSelector = 
        sheetRowColumnIndexes[headerConfig['description'].index-1] + 
        Rowstart + ':'+ 
        String.fromCharCode(
            (sheetRowColumnIndexes[headerConfig['description'].index-1]
                .charCodeAt(0))+1+extraRowMerge) + Rowstart;
        worksheet.mergeCells(horizontalMergeCellSelector);
    }
    insertBlockCell(
        headerConfig['description'].index,
        blockRow,
        value,
        { ...topLeftAlign, wrapText: true },
        exelBoldFont,
        colorCode
    );
};
const insertDetailedDescription = async (worksheet,
    Rowstart,detailedDescription,headerConfig,divider,colorCode) =>{
    Rowstart += 1;
    let detailedDescriptionHeight=0,newLineArray=detailedDescription.trim().split('\n');
    let detailedDescriptionRow =  worksheet.getRow(Rowstart);
    let tempRows=0;
    newLineArray.forEach(item=>{
        if(item.length){
            let tempHeight = Math.ceil((
                item.length/divider)*14);
            if(tempHeight>14){
                tempRows= tempRows+ (tempHeight/14);
            }else{
                tempRows= tempRows+ 1;
                tempHeight =14;
            }
				
            detailedDescriptionHeight= Number(detailedDescriptionHeight)+ tempHeight;
        }else{
            tempRows= tempRows+ 1;
            detailedDescriptionHeight= Number(detailedDescriptionHeight)+ 14;
        }
       
    });
    detailedDescriptionHeight= Math.ceil(detailedDescriptionHeight);
    detailedDescriptionHeight = (detailedDescriptionHeight>14)?(detailedDescriptionHeight-tempRows):detailedDescriptionHeight;
    detailedDescriptionRow.height=detailedDescriptionHeight;
    let detailedDescriptionIndex=orderCodeDescriptionAdjacentPair?headerConfig['order code'].index
        :headerConfig['description'].index;
    if(defaultTemplate){
        horizontalMergeCellSelector = 
        sheetRowColumnIndexes[detailedDescriptionIndex-1] + 
        Rowstart + ':'+ 
        String.fromCharCode(
            (sheetRowColumnIndexes[detailedDescriptionIndex-1]
                .charCodeAt(0))+1) + Rowstart;
    }else{
        horizontalMergeCellSelector = 
        detailedDescriptionMergeSelector[0] + 
        Rowstart + ':'+ 
        detailedDescriptionMergeSelector[1] + Rowstart;
    }
    worksheet.mergeCells(horizontalMergeCellSelector);
    let detailedDescFont = {
        ...exelBoldFont
    };
    delete detailedDescFont.bold;
    insertBlockCell(
        detailedDescriptionIndex,
        detailedDescriptionRow,
        detailedDescription.trim(),
        { ...topLeftAlign, wrapText: true },
        detailedDescFont,
        colorCode
    );
    sheetRowIndexes.forEach(i => {
        detailedDescriptionRow.getCell(i).fill = {
            ...detailedDescriptionRow.getCell(i).fill,
            type    : 'pattern',
            pattern : 'darkVertical',
            fgColor : { argb: colorCode },
            bgColor : { argb: colorCode }
        };
    });
    return Rowstart;
};
// eslint-disable-next-line max-lines-per-function

module.exports = quotePdfService;
