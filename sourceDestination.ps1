# Define variables
$siteUrl = "https://msssharepointtest.healthpartners.com/CARS"   # Site URL
$libraryName = "Folder Move Test 01"                             # Library containing both source and destination folders

# Connect to SharePoint Online
Connect-SPOService -Url $siteUrl -Credential (Get-Credential)

# Get all folders in the library
$folders = Get-SPOListItem -List $libraryName -Folder "/" | Where-Object { $_.FileSystemObjectType -eq "Folder" }

# Loop through each folder and move it to the corresponding destination folder
foreach ($folder in $folders) {
    $folderName = $folder["FileLeafRef"] # Folder name in the source
    Write-Output "Processing folder: $folderName"

    # Match source folder names (_FolderA, _FolderB, etc.) to destination folders (A01, A02, etc.)
    if ($folderName -like "_FolderA") {
        $destinationFolderName = "A01"
    } elseif ($folderName -like "_FolderB") {
        $destinationFolderName = "A02"
    } elseif ($folderName -like "_FolderC") {
        $destinationFolderName = "A03"
    } else {
        Write-Output "Skipping $folderName: No matching destination folder."
        continue
    }

    # Ensure the destination folder exists
    $destinationFolder = Get-SPOListItem -List $libraryName -Folder "/" | Where-Object { $_["FileLeafRef"] -eq $destinationFolderName }
    if (-not $destinationFolder) {
        Write-Output "Creating destination folder: $destinationFolderName"
        New-SPOListItem -List $libraryName -ContentType "Folder" -FieldValues @{"Title"=$destinationFolderName}
    }

    # Construct source and destination folder paths
    $sourceFolderPath = "$libraryName/$folderName"
    $destinationFolderPath = "$libraryName/$destinationFolderName"

    # Move the folder to the destination folder
    Write-Output "Moving $folderName to $destinationFolderName"
    Move-SPOListItem -List $libraryName -Item $folder -DestinationFolder $destinationFolderName
}

# Disconnect from SharePoint
Disconnect-SPOService
Write-Output "Script execution completed."
