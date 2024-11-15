# Define the SharePoint site URL and source/destination folder paths
$siteUrl = "https://msssharepointtest.healthpartners.com/sites/CARS"
$sourceFolderPath = "CARS/Folder Move Test Template"  # Relative path within the document library
$destinationFolderPath = "CARS/Folder Move Test Template/TargetFolder"  # Target path

# Connect to the SharePoint site
Connect-PnPOnline -Url $siteUrl -Interactive

# Get all folders in the source folder
$sourceFolders = Get-PnPListItem -List "Documents" -Folder $sourceFolderPath | Where-Object { $_.FileSystemObjectType -eq "Folder" }

# Loop through each folder in the source directory
foreach ($folder in $sourceFolders) {
    # Get the folder name
    $folderName = $folder.FieldValues["FileLeafRef"]

    # Get the first letter of the folder name
    $firstLetter = $folderName.Substring(0, 1).ToUpper()

    # Check if the first letter is between A and Z
    if ($firstLetter -match '^[A-Z]$') {
        # Create the target folder name (e.g., _FolderA)
        $targetFolderName = "_Folder" + "$firstLetter"

        # Combine the destination folder path with the target folder name
        $targetFolderPath = Join-Path $destinationFolderPath $targetFolderName

        # Check if the target folder exists; if not, create it
        $existingFolder = Get-PnPListItem -List "Documents" -Folder $targetFolderPath -ErrorAction SilentlyContinue
        if (-Not $existingFolder) {
            # Create the target folder
            New-PnPListItem -List "Documents" -Folder $destinationFolderPath -Values @{FileLeafRef = $targetFolderName}
            Write-Output "Created target folder: $targetFolderPath"
        }

        # Define the source folder's full SharePoint path
        $sourceFolderFullPath = Join-Path $sourceFolderPath $folderName

        # Move the folder to the target location
        Move-PnPFile -ServerRelativeUrl $sourceFolderFullPath -TargetServerRelativeUrl $targetFolderPath -Force
        Write-Output "Moved folder: $folderName to $targetFolderPath"
    }
}

# Disconnect after operations are complete
Disconnect-PnPOnline
