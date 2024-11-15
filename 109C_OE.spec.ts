# Define the source and destination folder paths
$sourceFolderPath = ""
$destinationFolderPath = ""
 
# Navigate to the source folder
Set-Location -Path $sourceFolderPath
 
# Get all the folders from the source directory
$folders = Get-ChildItem -Directory
 
# Loop through each folder
foreach ($folder in $folders) {
    # Get the first letter of the folder name
    $firstLetter = $folder.Name.Substring(0, 1).ToUpper()
 
    # Check if the first letter is between A and Z
    if ($firstLetter -match '^[A-Z]$') {
        # Create the target folder name (e.g., _FolderA)
        $targetFolder = "_Folder" + "$firstLetter"
       
        # Define the target path
        $targetFolderPath = Join-Path -Path $destinationFolderPath -ChildPath $targetFolder
       
        # Create the destination folder if it doesn't exist
        if (-Not (Test-Path -Path $targetFolderPath)) {
            New-Item -Path $targetFolderPath -ItemType Directory
            Write-Output "Created target folder: $targetFolderPath"
        }
 
        # Define the full path for the source folder
        $sourceFolderFullPath = Join-Path -Path $sourceFolderPath -ChildPath $folder.Name
 
        # Check if the source folder exists before moving
        if (Test-Path -Path $sourceFolderFullPath) {
            # Move the folder to the target folder
            Move-Item -Path $sourceFolderFullPath -Destination $targetFolderPath
            Write-Output "Moved folder: $($folder.Name) to $targetFolderPath"
        }
    }
}
