const fetch = require('node-fetch');
const fs = require('fs');

const accessToken = 'glpat-p6wW6U_L-wR8LsR65v4Z';
const projectId = '223616';
const filePath = 'TESTUPLOAD.js'; // Local file path
const destinationFileName = 'fileupload4.js'; // Destination file name inside the app folder
const branch = 'main';

const commitMessage = 'create a new file';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// Read the content of the local file
const fileContent = fs.readFileSync(filePath, 'utf8');

const apiUrl = `https://gitlab.dell.com/api/v4/projects/${projectId}/repository/files/app%2F${encodeURIComponent(destinationFileName)}`;
const requestBody = {
  branch: branch,
  
  content: fileContent,
  commit_message: commitMessage
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'PRIVATE-TOKEN': accessToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
})
.then(response => {
  if (response.ok) {
    console.log('File created successfully.');
    //console.log('Full response:', response.json());
  } else {
    //console.error('Failed to create file:', response.statusText);
    response.json().then(data => console.error('Failed to create file:', data));
  }
})
.catch(error => {
  console.error('Error creating file:', error);
});
