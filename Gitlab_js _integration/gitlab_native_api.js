const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function createBranchCommitAndMergeRequest({
  projectId,
  branchName,
  folderPath,
  accessToken,
  targetBranch = 'main',
}) {
  const apiUrl = `https://gitlab.com/api/v4/projects/${projectId}`;
  const headers = {
    'Private-Token': accessToken,
  };

  try {
    // Create a new branch
    await axios.post(`${apiUrl}/repository/branches`, {
      branch: branchName,
      ref: targetBranch,
    }, { headers });
    console.log(`Branch ${branchName} created`);

    // Function to get all files in a directory recursively
    function getAllFiles(dirPath, arrayOfFiles = []) {
      const files = fs.readdirSync(dirPath);

      files.forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
          arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, file));
        }
      });

      return arrayOfFiles;
    }

    // Get all files in the folder and its subfolders
    const files = getAllFiles(folderPath);

    // Prepare actions for a single commit
    const actions = files.map((file) => {
      const filePath = path.relative(folderPath, file);
      const fileContent = fs.readFileSync(file, { encoding: 'base64' });

      return {
        action: 'create',
        file_path: filePath,
        content: fileContent,
        encoding: 'base64',
      };
    });

    // Create a single commit with all file changes
    await axios.post(`${apiUrl}/repository/commits`, {
      branch: branchName,
      commit_message: 'Initial commit of folder',
      actions: actions,
    }, { headers });
    console.log(`Files committed to branch ${branchName}`);

    // Create a merge request
    const mergeRequest = await axios.post(`${apiUrl}/merge_requests`, {
      source_branch: branchName,
      target_branch: targetBranch,
      title: `Merge ${branchName} into ${targetBranch}`,
      description: `This merge request adds the contents of ${folderPath}`,
    }, { headers });
    console.log(`Merge request created: ${mergeRequest.data.web_url}`);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example usage
createBranchCommitAndMergeRequest({
  projectId: 123456, // Replace with your project ID
  branchName: 'new-feature-branch',
  folderPath: './path/to/folder', // Replace with your folder path
  accessToken: 'your-access-token', // Replace with your access token
});
