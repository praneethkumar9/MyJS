/**
 * S-18485 UI: Infinite scroll for work plans list
 
https://www.ag-grid.com/javascript-grid-infinite-scrolling/ --------------------------------

Implemented Infinite scroll referring above link ,Below I have added code 
Below code includes,
1.	Infinite scroll (lazy loading)
2.	Sort
3.	Filter
•	    Contains
•	Not contains
•	Equal
•	Greater than
•	Less Than
 Difficulties :- lazy loading need more customization to get the other filtering working
 */

/*======================== code starts from here ===================================================*/

/**
* Component WorkPlansGridView is defined as
* `<e-work-plans-grid-view>`
*
* Imperatively create component
* @example
* let component = new WorkPlansGridView();
*
* Declaratively create component
* @example
* <e-work-plans-grid-view></e-work-plans-grid-view>
*
* @extends {LitComponent}
*/
import { definition } from '@eui/component';
import { LitComponent, html } from '@eui/lit-component';
import { Grid } from 'ag-grid-community';
import { ConditionPosition } from 'ag-grid-community/dist/lib/filter/provided/simpleFilter';
import '@eui/layout';
import '@eui/base';
import '@eui/table';
import style from './workPlansGridView.css';


/**
* @property {Boolean} propOne - show active/inactive state.
* @property {String} propTwo - shows the "Hello World" string.
*/
const MutationObserver = window.MutationObserver
|| window.WebKitMutationObserver
|| window.MozMutationObserver;
let eGridDiv;


@definition('e-work-plans-grid-view', {
style,
home: 'work-plans-grid-view',
props: {
columnDefs: {
attribute: false,
type: Array,
required: true,
},
rowData: { attribute: false, type: Array, default: [] },
grid: { type: Object },
theme: { attribute: false, type: String },
paginationinfo: { type: Object, default: {} },
response: { attribute: false },
rowDataWithCount: { type: Array },
_errMsg: {
type: String,
default: '',
},
_errMsgGoTo: {
type: String,
default: '',
},
pagesList: {
type: Array,
default: [],
},
cuurentPageNo: {
type: Number,
default: 1,
},
searchValue: {
type: Array,
default: [{
customerRecord: '',
customer: '',
contract: '',
geography: '',
deliveryModel: '',
quoteType: '',
status: '',
}],
},
perPageUserRecords: { type: Number, default: 10 },
noOfPages: { type: String, default: '0' },
sortOrder: { type: String, default: 'id' },
firstRecord: { type: Number, default: 0 },
newCurrent: { type: String, default: '1' },
totalRecords: { type: String, default: '0' },
},
})
export default class WorkPlansGridView extends LitComponent {
/**
* Render the <e-work-plans-grid-view> component. This function is called each time a
* prop changes.
*/
constructor() {
super();
const self = this;
const { EUI } = window;
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
if (mutation.type === 'attributes') {
self.theme = mutation.target.getAttribute('theme') === 'dark'
? 'ag-theme-balham-dark'
: 'ag-theme-balham';
}
});
});


observer.observe(document.querySelector('eui-theme-v0'), {
attributes: true, // configure it to listen to attribute changes
});


this.gridOptions = {
defaultColDef: {
filter: true,
sortable: true,
headerComponentParams: {
menuIcon: 'fa-bars',
},
},
floatingFilter: true,
enableColResize: true,
// paginationPageSize: 20,
cacheBlockSize: 20, // no.of data per scroll
blockLoadDebounceMillis: 300,//delay after user stops scrolling to get data
enableServerSideFilter: false,
enableServerSideSorting: false,
rowModelType: 'infinite',// enable infinte scroll
pagination: false,
paginationAutoPageSize: false,
components: {
// moreIcon: MoreIcon,
loadingRenderer: (params) => {
if (params.value !== undefined) {
return params.value;
}
return '<eui-base-v0-loader size="small"></eui-base-v0-loader>';
},
},
floatingFiltersHeight: 20,
headerHeight: 24,
getRowHeight() {
const height = 40;
return height;
},
};


this.columnDefs = [
{
headerName: 'Id',
headerComponentParams: { menuIcon: 'fa-cog' },
field: 'id',
tooltipField: 'id',
width: 250,
sortable: true,
filterParams: { //custom filters
filterOptions: ['equals', 'lessThan', 'greaterThan'],// filters added
suppressAndOrCondition: true,
},
cellRenderer: 'loadingRenderer', // to get loader at end of page before loading new data
},
{
headerName: 'Site Id',
headerComponentParams: { menuIcon: 'fa-cog' },
field: 'site_id',
tooltipField: 'site_id',
width: 250,
sortable: true,
filterParams: {
filterOptions: ['equals', 'lessThan', 'greaterThan'],
suppressAndOrCondition: true,
},
cellRenderer: 'loadingRenderer',
},
{
headerName: 'Project',
headerComponentParams: true,
field: 'project',
tooltipField: 'project',
width: 250,
sortable: true,
filterParams: {
filterOptions: ['contains', 'notContains'],
suppressAndOrCondition: true,
},
},
{
headerName: 'Work Plan',
field: 'work_plan',
tooltipField: 'work_plan',
sortable: true,
width: 250,
filterParams: {
filterOptions: ['contains', 'notContains'],
suppressAndOrCondition: true,
},
},
{
headerName: 'Customer',
field: 'customer',
tooltipField: 'customer',
sortable: true,
width: 250,
filterParams: {
filterOptions: ['contains', 'notContains'],
suppressAndOrCondition: true,
},
},
{
headerName: 'Market',
field: 'market',
tooltipField: 'market',
sortable: true,
width: 250,
filterParams: {
filterOptions: ['contains', 'notContains'],
suppressAndOrCondition: true,
},
},
];
// code to sort column 
this.sortData = function (sortModel, data) {
const sortPresent = sortModel && sortModel.length > 0;
if (!sortPresent) {
return data;
}
// do an in memory sort of the data, across all the fields
const resultOfSort = data.slice();
resultOfSort.sort((a, b) => {
for (let k = 0; k < sortModel.length; k++) {
const sortColModel = sortModel[k];
const valueA = a[sortColModel.colId];
const valueB = b[sortColModel.colId];
// this filter didn't find a difference, move onto the next one
if (valueA == valueB) {
continue;
}
const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
if (valueA > valueB) {
return sortDirection;
}
return sortDirection * -1;
}
// no filters found a difference
return 0;
});
return resultOfSort;
};
// code for customer filter for each column 
this.filterData = function (filterModel, data) {
const filterPresent = filterModel && Object.keys(filterModel).length > 0;
if (!filterPresent) {
return data;
} 
const resultOfFilter = [];
for (let i = 0; i < data.length; i++) {
const item = data[i]; 
// code of id column filter[equals,lessthan,greaterthan]
if (filterModel.id) {
const { id } = item;
const allowedId = parseInt(filterModel.id.filter, 10);
// EQUALS = 1;
// LESS_THAN = 2;
// GREATER_THAN = 3;
if (filterModel.id.type == 'equals') {
if (id !== allowedId) {
continue;
}
} else if (filterModel.id.type == 'lessThan') {
if (id >= allowedId) {
continue;
}
} else {
if (id <= allowedId) {
continue;
}
}
}
if (filterModel.site_id) {
const siteId = item.site_id;
const allowedsiteId = parseInt(filterModel.site_id.filter);
if (filterModel.site_id.type == 'equals') {
if (siteId !== allowedsiteId) {
continue;
}
} else if (filterModel.site_id.type == 'lessThan') {
if (siteId >= allowedsiteId) {
continue;
}
} else {
if (siteId <= allowedsiteId) {
continue;
}
}
} 
//code to filter project column
// code of id column filter['contains', 'notContains']
if (filterModel.project) { 
var project = item.project.toLowerCase(); // change everything to lowercase
var allowedproject = filterModel.project.filter.toString().toLowerCase();
console.log("project",project);
console.log("allowedproject",allowedproject);
if (filterModel.project.type == 'contains') {
console.log("inside");
if (!project.includes(allowedproject)) {
console.log("inside11");
continue;
}
} else if (filterModel.project.type == 'notContains') {
if (project.includes(allowedproject)) {
continue;
}
}
}
if (filterModel.work_plan) {
const workPlan = item.work_plan.toLowerCase();
const allowedworkPlan = filterModel.work_plan.filter.toString().toLowerCase();
if (filterModel.work_plan.type == 'contains') {
if (!workPlan.includes(allowedworkPlan)) {
continue;
}
} else if (filterModel.work_plan.type == 'notContains') {
if (workPlan.includes(allowedworkPlan)) {
continue;
}
}
}
if (filterModel.customer) {
const customer = item.customer.toLowerCase();
const allowedcustomer = filterModel.customer.filter.toString().toLowerCase();
if (filterModel.customer.type == 'contains') {
if (!customer.includes(allowedcustomer)) {
continue;
}
} else if (filterModel.customer.type == 'notContains') {
if (customer.includes(allowedcustomer)) {
continue;
}
}
}
if (filterModel.market) {
const market = item.market.toLowerCase();
const allowedMarket = filterModel.market.filter.toString().toLowerCase();
if (filterModel.market.type == 'contains') {
if (!market.includes(allowedMarket)) {
continue;
}
} else if (filterModel.market.type == 'notContains') {
if (market.includes(allowedMarket)) {
continue;
}
}
}
resultOfFilter.push(item);
}
return resultOfFilter;
};
this.sortAndFilter = function (allOfTheData, sortModel, filterModel) {
return this.sortData(sortModel, this.filterData(filterModel, allOfTheData));
};
}


render() {
return html`
<div style="position: absolute; left: 50%; top: 50%; z-index: 1">
<eui-base-v0-loader size="medium" id="loaderForWorkPlansList" hidden="true">
</eui-base-v0-loader>
</div>
<div id="myGrid" style="height: 75vh;" class="${this.theme}"></div>`;
}



didConnect() {
super.didConnect();
const pagetheme = window.localStorage.getItem('UserPreferences');
this.theme = pagetheme === 'dark' ? 'ag-theme-balham-dark' : 'ag-theme-balham';
this.gridOptions.columnDefs = this.columnDefs;
this.gridOptions.rowData = this.rowData;
this.getWorkPlans();
}


didRender() {
eGridDiv = this.shadowRoot.querySelector('#myGrid');
if (!this.grid) {
this.grid = new Grid(eGridDiv, this.gridOptions);
}
}


isFirstColumn(params) {
const displayedColumns = params.columnApi.getAllDisplayedColumns();
const thisIsFirstColumn = displayedColumns[0] === params.column;
return thisIsFirstColumn;
}


/* this function gets the list of work plans */
getWorkPlans() {
if (this.perPageUserRecords == undefined) {
this.perPageUserRecords = 10;
}
// url to call services
// eslint-disable-next-line no-undef
const url = `${config.work_order_service}getWorkPlans`;
const storage = window.localStorage;
const params = {
userId: storage.getItem('userId'),
search: this.searchValue, // filter inputs
first: this.firstRecord, // for pagination
sortOrder: this.sortOrder, // sort order
limit: this.perPageUserRecords,
};
// post call service from utility.js
// eslint-disable-next-line no-undef
utilities._postCallService(url, params, this, this._getWorkPlansCallback);
}


// call back function for getWorkPlans
_getWorkPlansCallback(response, flag, self) {
if (flag) {
// response.pop();
// self.gridOptions.api.setRowData(response);
// self.gridOptions.rowData = response;
const dataSource = {
rowCount: null, // behave as infinite scroll


getRows: function (params) {
// code to set startrow ,endrow
console.log('asking for ' + params.startRow + ' to ' + params.endRow);
setTimeout(function() {
let dataAfterSortingAndFiltering = self.sortAndFilter(
response,
params.sortModel,
params.filterModel
);
// take a slice of the total rows
let rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
console.log("afterfilter",rowsThisPage);
// if on or after the last page, work out the last row.
let lastRow = -1;
if (dataAfterSortingAndFiltering.length <= params.endRow) {
lastRow = dataAfterSortingAndFiltering.length;
}
// call the success callback
params.successCallback(rowsThisPage, lastRow);
}, 500);
},
};

// code to set datasource
self.gridOptions.api.setDatasource(dataSource);
}
}


// MAIN BLOCK ENDS HERE
}


/**
* Register the component as e-work-plans-grid-view.
* Registration can be done at a later time and with a different name
*/
WorkPlansGridView.register();



