# VsCleanerTool

A .NET tool to clean up Visual Studio generated folders (.vs, bin, obj) from project directories.

For full documentation and updates, visit our [project site](https://github.com/yourusername/vscleaner-tool).

## Installation

Install as a global tool:

```bash
dotnet tool install --global VsCleanerTool
```

Or install locally to your project:

```bash
dotnet new tool-manifest # If you don't have one
dotnet tool install VsCleanerTool
```

## Usage

Navigate to your project directory and run:

```bash
# Preview mode - shows what would be deleted
vsclean

# Delete mode - removes the folders
vsclean --delete
# or
vsclean -d
```

## Features

- Scans recursively from the current directory
- Identifies .vs, bin, and obj folders
- Preview mode shows which folders would be deleted
- Delete mode removes the found folders
- Checks if .vs folder is locked by Visual Studio
- Color-coded output for better readability

## Building from Source

```bash
git clone [repository-url]
cd VsCleanerTool
dotnet pack
```

This will create a NuGet package in the `./nupkg` directory.

To install the locally built package:

```bash
dotnet tool install --global --add-source ./nupkg VsCleanerTool
```

## License

MIT