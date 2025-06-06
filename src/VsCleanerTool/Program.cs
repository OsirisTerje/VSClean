using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Diagnostics;
using System.Threading.Tasks;

namespace VsCleanerTool
{
    public class Program
    {
        static async Task<int> Main(string[] args)
        {
            Console.WriteLine("Visual Studio Project Cleaner Tool");
            Console.WriteLine("--------------------------------");
            
            bool deleteMode = args.Contains("--delete") || args.Contains("-d");
            
            string currentDirectory = Directory.GetCurrentDirectory();
            
            Console.WriteLine($"Scanning directory: {currentDirectory}");
            Console.WriteLine();
            
            if (deleteMode)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("DELETE MODE: Folders will be removed");
                Console.ResetColor();
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine("PREVIEW MODE: Showing folders that would be deleted");
                Console.WriteLine("Use --delete or -d option to perform actual deletion");
                Console.ResetColor();
            }
            
            Console.WriteLine();
            
            // Find all target folders
            var foldersToDelete = FindTargetFolders(currentDirectory);
            
            // Display folders grouped by type
            DisplayFolders(foldersToDelete);
            
            // If in delete mode, perform deletions
            if (deleteMode && foldersToDelete.Any())
            {
                Console.WriteLine();
                Console.Write("Proceed with deletion? (y/N): ");
                var key = Console.ReadKey();
                Console.WriteLine();
                
                if (key.KeyChar == 'y' || key.KeyChar == 'Y')
                {
                    await DeleteFolders(foldersToDelete);
                }
                else
                {
                    Console.WriteLine("Deletion cancelled.");
                }
            }
            
            return 0;
        }
        
        private static Dictionary<string, List<string>> FindTargetFolders(string rootDirectory)
        {
            var result = new Dictionary<string, List<string>>
            {
                { ".vs", new List<string>() },
                { "bin", new List<string>() },
                { "obj", new List<string>() }
            };
            
            try
            {
                // Find .vs folder in root
                var vsFolder = Path.Combine(rootDirectory, ".vs");
                if (Directory.Exists(vsFolder))
                {
                    result[".vs"].Add(vsFolder);
                }
                
                // Find all bin and obj folders recursively
                foreach (var directory in Directory.GetDirectories(rootDirectory, "*", SearchOption.AllDirectories))
                {
                    var dirName = new DirectoryInfo(directory).Name;
                    
                    // Skip traversing into .git folders
                    if (dirName == ".git")
                        continue;
                    
                    if (dirName == "bin" || dirName == "obj")
                    {
                        result[dirName].Add(directory);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Error scanning directories: {ex.Message}");
                Console.ResetColor();
            }
            
            return result;
        }
        
        private static void DisplayFolders(Dictionary<string, List<string>> foldersDict)
        {
            int totalCount = foldersDict.Sum(group => group.Value.Count);
            
            if (totalCount == 0)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("No target folders found. Nothing to clean up.");
                Console.ResetColor();
                return;
            }
            
            foreach (var group in foldersDict)
            {
                if (group.Value.Count > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"{group.Key} folders ({group.Value.Count}):");
                    Console.ResetColor();
                    
                    foreach (var folder in group.Value)
                    {
                        Console.WriteLine($"  {folder}");
                    }
                    
                    Console.WriteLine();
                }
            }
            
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"Total: {totalCount} folder(s) found");
            Console.ResetColor();
        }
        
        private static async Task DeleteFolders(Dictionary<string, List<string>> foldersDict)
        {
            // Check if .vs folder is locked
            if (foldersDict[".vs"].Count > 0)
            {
                foreach (var vsFolder in foldersDict[".vs"])
                {
                    if (IsVsFolderLocked(vsFolder))
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("WARNING: .vs folder appears to be locked by Visual Studio.");
                        Console.WriteLine("Please close all instances of Visual Studio before deleting.");
                        Console.WriteLine();
                        Console.Write("Continue anyway? (y/N): ");
                        Console.ResetColor();
                        
                        var key = Console.ReadKey();
                        Console.WriteLine();
                        
                        if (key.KeyChar != 'y' && key.KeyChar != 'Y')
                        {
                            Console.WriteLine("Operation cancelled.");
                            return;
                        }
                        
                        break;
                    }
                }
            }
            
            int deletedCount = 0;
            int errorCount = 0;
            
            foreach (var group in foldersDict)
            {
                foreach (var folder in group.Value)
                {
                    try
                    {
                        Console.Write($"Deleting {folder}... ");
                        
                        // For large folders, deletion might take time, so use async
                        await Task.Run(() => DeleteDirectory(folder));
                        
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("Done");
                        Console.ResetColor();
                        deletedCount++;
                    }
                    catch (Exception ex)
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"Error: {ex.Message}");
                        Console.ResetColor();
                        errorCount++;
                    }
                }
            }
            
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Successfully deleted {deletedCount} folder(s)");
            Console.ResetColor();
            
            if (errorCount > 0)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Failed to delete {errorCount} folder(s)");
                Console.ResetColor();
            }
        }
        
        private static void DeleteDirectory(string path)
        {
            // Set attributes to normal for all files before deletion
            foreach (var file in Directory.GetFiles(path, "*", SearchOption.AllDirectories))
            {
                File.SetAttributes(file, FileAttributes.Normal);
            }
            
            Directory.Delete(path, true);
        }
        
        private static bool IsVsFolderLocked(string path)
        {
            try
            {
                // Check for Visual Studio processes
                var vsProcesses = Process.GetProcessesByName("devenv");
                if (vsProcesses.Length > 0)
                {
                    return true;
                }
                
                // Try to create a test file in .vs folder
                var testFile = Path.Combine(path, "locktest.tmp");
                using (var fs = new FileStream(testFile, FileMode.Create, FileAccess.ReadWrite, FileShare.None))
                {
                    fs.WriteByte(0);
                }
                
                // If successful, delete the test file
                File.Delete(testFile);
                return false;
            }
            catch
            {
                // If any exception occurs, consider the folder locked
                return true;
            }
        }
    }
}