# Visual Studio Project Cleaner Tool PRD

## Core Purpose & Success
- **Mission Statement**: A command-line tool to safely identify and clean Visual Studio generated folders (.vs, bin, obj) from project directories.
- **Success Indicators**: Accurate identification of target folders, proper deletion handling, and clear user feedback.
- **Experience Qualities**: Efficient, Safe, Reliable.

## Project Classification & Approach
- **Complexity Level**: Micro Tool (single-purpose)
- **Primary User Activity**: Acting (executing cleanup operations)

## Thought Process for Feature Selection
- **Core Problem Analysis**: Visual Studio projects accumulate temporary files and folders that take up disk space.
- **User Context**: Developers will use this tool when they need to clean up project directories or before archiving projects.
- **Critical Path**: Scan directories → Identify target folders → Display/Delete based on user option
- **Key Moments**: 
  1. Folder identification with clear presentation
  2. Safe deletion with confirmation
  3. Lock detection for .vs folder

## Essential Features
1. **Directory Scanning**
   - What: Recursively scan from current directory to find .vs, bin, and obj folders
   - Why: Locate all target folders without manual searching
   - Success: All target folders correctly identified

2. **Preview Mode**
   - What: Display all folders that would be deleted without taking action
   - Why: Safety check before actual deletion
   - Success: Clear, organized display of detected folders

3. **Deletion Mode**
   - What: Remove all identified folders when --delete/-d flag is provided
   - Why: Complete the cleanup process
   - Success: All folders properly deleted with confirmation

4. **Lock Detection**
   - What: Check if .vs folder is locked by Visual Studio or VS Code before deletion
   - Why: Prevent errors and alert user to close these applications
   - Success: Accurate detection and clear warning message

5. **Help Documentation**
   - What: Provide comprehensive help with --help/-h flag showing usage instructions
   - Why: Enable users to understand all tool features and proper usage
   - Success: Clear, well-organized help output that covers all functions

6. **Statistics Display**
   - What: Show statistics about disk space saved after deletion
   - Why: Provide users with quantifiable results of the cleanup
   - Success: Accurate calculation and clear presentation of space saved

7. **README Documentation in NuGet Package**
   - What: Include the README.md file in the NuGet package
   - Why: Provide documentation directly accessible through NuGet package gallery
   - Success: README properly rendered in NuGet package listing and available to users

8. **Project Site URL in Package Metadata**
   - What: Include a project site URL in the NuGet package metadata
   - Why: Provide users with access to additional documentation and project updates
   - Success: URL properly displayed in NuGet package listing and accessible to users

## Design Direction
- Command-line interface with clear, structured output
- Color-coded terminal output for different types of messages (information, warnings, success)

## Edge Cases & Problem Scenarios
- **Access Permission Issues**: Handle cases where folders can't be accessed or deleted
- **Large Directory Structures**: Ensure performance remains good with deep folder hierarchies
- **Non-Standard Project Structures**: Handle projects that don't follow conventional folder organization

## Implementation Considerations
- **Packaging**: Create as a .NET tool for easy installation via dotnet tool command
- **Documentation**: Ensure proper README inclusion and project site URL in NuGet package for improved user experience
- **Testing Focus**: Verify detection accuracy and safe deletion behavior
- **Critical Questions**: How to reliably detect if a folder is locked by Visual Studio or VS Code?

## Technical Implementation Plan
- Create a .NET Core console application
- Use System.IO for file operations
- Package as a .NET tool with appropriate metadata (including project site URL)
- Implement command-line argument parsing (--delete/-d, --help/-h)
- Create clear, informative console output
- Implement comprehensive help documentation
- Include README.md in NuGet package for documentation