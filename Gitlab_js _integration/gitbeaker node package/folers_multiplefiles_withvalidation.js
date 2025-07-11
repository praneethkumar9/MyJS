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
  // Validate inputs
  if (!projectId || !host || !branchName || !folderPath || !accessToken) {
    console.error('Missing required parameters');
    return;
  }

  // Initialize GitLab API client
  const api = new Gitlab({
    host,
    token: accessToken,
  });

  try {
    // Check if the branch already exists
    let branchExists = false;
    try {
      const branch = await api.Branches.show(projectId, branchName);
      if (branch) {
        branchExists = true;
        console.log(`Branch ${branchName} already exists`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        branchExists = false;
      } else {
        throw error;
      }
    }

    // Create a new branch if it doesn't exist
    if (!branchExists) {
      await api.Branches.create(projectId, branchName, targetBranch);
      console.log(`Branch ${branchName} created`);
    }

    // // Create a new branch
    // try {
    //     await api.Branches.create(projectId, branchName, targetBranch);
    //     console.log(`Branch ${branchName} created`);
    //   } catch (error) {
    //     if (error.response && error.response.status === 400 && error.response.data.message === 'Branch already exists') {
    //       console.log(`Branch ${branchName} already exists`);
    //     } else {
    //       throw error;
    //     }
    //   }

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
      const fileContent = fs.readFileSync(file, { encoding: 'base64' });

      return {
        action: 'create',
        file_path: filePath.replace(/\\/g, '/'),
        content: fileContent,
        encoding: 'base64',
      };
    });

    // Check if files already exist and update the action if they do
    for (let action of actions) {
      try {
        const file = await api.RepositoryFiles.show(projectId, action.file_path, branchName);
        if (file) {
          action.action = 'update';
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          action.action = 'create';
        } else {
          throw error;
        }
      }
    }

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
  host: 'https://gitlab.dell.com',  // git host
  branchName: 'new-feature-branch-5',
  folderPath: './NGXR000024_config_files', // Replace with your folder path
  accessToken: process.env.GITLAB_ACCESS_TOKEN, // Use environment variable for access token
});
