const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const folderName = 'testUpload5'; // Name of the local folder you want to upload
const branch = 'main';
const commitMessage = 'upload new folder in app folder';
const accessToken = 'glpat-p6wW6U_L-wR8LsR65v4Z'; // Your private token
const projectId = '223616'; // Your project ID

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Function to read all files in a directory
function getFilesInDirectory(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (let item of items) {
    if (item.isDirectory()) {
      files = files.concat(getFilesInDirectory(path.join(dir, item.name)));
    } else {
      files.push(path.join(dir, item.name));
    }
  }
  return files;
}


// Function to upload a single file
async function uploadFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(folderName, filePath);
  const destinationFileName = `app/${folderName}/${relativePath.replace(/\\/g, '/')}`;

  const apiUrl = `https://gitlab.dell.com/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(destinationFileName)}`;
  const requestBody = {
    branch: branch,
    content: fileContent,
    commit_message: commitMessage
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log(`File ${destinationFileName} created successfully.`);
    } else {
      console.error(`Failed to create file ${destinationFileName}:`, responseData);
    }
  } catch (error) {
    console.error(`Error creating file ${destinationFileName}:`, error);
  }
}

// Main function to upload all files in the folder
async function uploadFolder() {
  // no need to create a new folder, gitlab will create it automatically if it does not exist
  // Upload files
  const files = getFilesInDirectory(folderName);
  for (let file of files) {
    await uploadFile(file);
  }
}

uploadFolder();
