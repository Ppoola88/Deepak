# --------------------- Configuration ---------------------

# Name of the document library (e.g., "Documents")
$libraryName = "Documents"

# Prefix for target folders (e.g., "folder_")
$targetFolderPrefix = "folder_"

# ---------------------------------------------------------

try {
    # Retrieve all folders in the specified library
    Write-Host "Retrieving folders from '$libraryName' library..." -ForegroundColor Cyan
    $folders = Get-PnPFolderItem -FolderSiteRelativeUrl $libraryName -ItemType Folder

    foreach ($folder in $folders) {
        $folderName = $folder.Name
        Write-Host "Processing folder: $folderName" -ForegroundColor Green

        # Skip folders that are already target folders to avoid recursion
        if ($folderName.StartsWith($targetFolderPrefix, [System.StringComparison]::InvariantCultureIgnoreCase)) {
            Write-Host "Skipping target folder: $folderName" -ForegroundColor Yellow
            continue
        }

        # Ensure the folder name is not empty and has at least one character
        if ([string]::IsNullOrEmpty($folderName) -or $folderName.Length -lt 1) {
            Write-Warning "Folder '$folderName' has an invalid name. Skipping."
            continue
        }

        # Extract the first letter and convert it to uppercase
        $firstLetter = $folderName.Substring(0,1).ToUpper()

        # Define the target folder name (e.g., "folder_A")
        $targetFolderName = "${targetFolderPrefix}${firstLetter}"

        # Define the site-relative URLs
        $targetFolderUrl = "$libraryName/$targetFolderName"
        $sourceFolderUrl = "$libraryName/$folderName"
        $destinationFolderUrl = "$libraryName/$targetFolderName/$folderName"

        # Check if the target folder exists; if not, create it
        $existingTargetFolder = Get-PnPFolder -Url $targetFolderUrl -ErrorAction SilentlyContinue
        if (-not $existingTargetFolder) {
            Write-Host "Creating target folder: $targetFolderName" -ForegroundColor Magenta
            New-PnPFolder -Name $targetFolderName -Folder $libraryName
        } else {
            Write-Host "Target folder already exists: $targetFolderName" -ForegroundColor Blue
        }

        # Move the folder to the target folder
        Write-Host "Moving '$folderName' to '$targetFolderName'..." -ForegroundColor Cyan
        Move-PnPFile -SourceUrl $sourceFolderUrl -TargetUrl $destinationFolderUrl -Force

        Write-Host "Successfully moved '$folderName' to '$targetFolderName'." -ForegroundColor Green
    }

    Write-Host "Folder organization completed successfully." -ForegroundColor Green
}
catch {
    Write-Error "An error occurred: $_"
}
