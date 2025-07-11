const { Gitlab } = require('@gitbeaker/rest');
const fs = require('fs');
const path = require('path');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function createBranchCommitAndMergeRequest({
  projectId,
  host,
  branchName,
  folderPath,
  accessToken,
  targetBranch = 'main',
}) {
  // Initialize GitLab API client
  const api = new Gitlab({
    host ,
    token: accessToken,
  });

  try {
    // Create a new branch
    await api.Branches.create(projectId, branchName, targetBranch);
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

    // Prepare file actions for a single commit
    const actions = files.map((file) => {
      const filePath = path.relative(folderPath, file);
      console.log("file",filePath)
      const fileContent = fs.readFileSync(file, { encoding: 'base64' });
      // const fileContent = fs.readFileSync(file, 'utf8');

      return {
        action: 'create',
        file_path: filePath.replace(/\\/g, '/'),
        content: fileContent,
        encoding: 'base64'
      };
    });

    // Create a single commit with all file changes
    await api.Commits.create(projectId, branchName, 'Initial commit of folder', actions);
    console.log(`Files committed to branch ${branchName}`);

    // Create a merge request
    const mergeRequest = await api.MergeRequests.create(projectId, branchName, targetBranch, `Merge ${branchName} into ${targetBranch}`, {
      description: `This merge request adds the contents of ${folderPath}`,
    });
    console.log(`Merge request created: ${mergeRequest.web_url}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
createBranchCommitAndMergeRequest({
  projectId: 162715, // Replace with your project ID
  host : 'https://gitlab.dell.com',  // git host
  branchName: 'new-feature-branch-5',
  folderPath: './NGXR000024_config_files', // Replace with your folder path
  accessToken: 'glpat-dddddddd', // Replace with your access token
});

