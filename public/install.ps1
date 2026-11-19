# EgyKode Pilot has no script installer. This script downloads and runs nothing: download the
# package from the website and check its SHA-256 before opening it. It does not call `exit`:
# run as `iwr ... | iex` that would close the caller's own PowerShell session.
Write-Host "EgyKode Pilot has no script installer. Nothing was downloaded or installed."
Write-Host "Download it from https://pilot.egykode.com (Get Pilot) and verify its checksum first."
