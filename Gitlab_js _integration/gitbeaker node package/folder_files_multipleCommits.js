const { Gitlab } = require('@gitbeaker/node');
const fs = require('fs');
const path = require('path');

async function createBranchCommitAndMergeRequest({
  projectId,
  branchName,
  folderPath,
  accessToken,
  targetBranch = 'main',
}) {
  // Initialize GitLab API client
  const api = new Gitlab({
    token: accessToken,
  });

  try {
    // Create a new branch
    await api.Branches.create(projectId, branchName, targetBranch);
    console.log(`Branch ${branchName} created`);

    // Read files from the folder
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, { encoding: 'base64' });

      // Create a commit for each file
      await api.RepositoryFiles.create(
        projectId,
        path.join(folderPath, file),
        branchName,
        {
          content: fileContent,
          encoding: 'base64',
          commit_message: `Add ${file}`,
        }
      );
      console.log(`File ${file} committed to branch ${branchName}`);
    }

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
  projectId: 123456, // Replace with your project ID
  branchName: 'new-feature-branch',
  folderPath: './path/to/folder', // Replace with your folder path
  accessToken: 'your-access-token', // Replace with your access token
});
