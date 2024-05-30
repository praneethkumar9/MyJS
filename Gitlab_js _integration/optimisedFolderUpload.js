const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const folderName = 'emptyfolderUpload2'; // Name of the local folder you want to upload
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

// Function to upload all files in the folder in one commit
async function uploadFolder() {
  const files = getFilesInDirectory(folderName);
  const actions = files.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(folderName, filePath);
    const destinationFileName = `app/${folderName}/${relativePath.replace(/\\/g, '/')}`;

    return {
      action: 'create',
      file_path: destinationFileName,
      content: fileContent
    };
  });

  const apiUrl = `https://gitlab.dell.com/api/v4/projects/${projectId}/repository/commits`;
  const requestBody = {
    branch: branch,
    commit_message: commitMessage,
    actions: actions
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
      console.log('Folder uploaded successfully.');
    } else {
      console.error('Failed to upload folder:', responseData);
    }
  } catch (error) {
    console.error('Error uploading folder:', error);
  }
}

uploadFolder();
// If empty folder upload then keep a file .gitkeep in the folder and upload.