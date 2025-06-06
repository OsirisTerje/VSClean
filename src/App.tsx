import { useState } from 'react'

function App() {
    const [showCode, setShowCode] = useState(false);
    
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Visual Studio Project Cleaner Tool</h1>
                    <p className="text-xl text-muted-foreground">
                        A .NET command-line tool to clean up Visual Studio generated folders
                    </p>
                </header>
                
                <div className="grid gap-8">
                    <section className="bg-card p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">What Does It Do?</h2>
                        <p className="mb-4">
                            This tool helps developers clean up unnecessary Visual Studio folders that 
                            accumulate during development:
                        </p>
                        <ul className="list-disc ml-6 mb-4 space-y-2">
                            <li><code className="bg-muted px-1 rounded">.vs</code> folders - Visual Studio settings and cache</li>
                            <li><code className="bg-muted px-1 rounded">bin</code> folders - Build output binaries</li>
                            <li><code className="bg-muted px-1 rounded">obj</code> folders - Intermediate build files</li>
                        </ul>
                        <p>
                            Cleaning these folders helps reduce disk space usage and can resolve certain Visual Studio issues.
                        </p>
                    </section>
                    
                    <section className="bg-card p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                        <ul className="grid gap-4">
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Preview mode shows what would be deleted without making changes</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Delete mode removes identified folders</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Detailed help with usage instructions</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Detects if Visual Studio is locking folders</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Recursive directory scanning</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Safe deletion with confirmation</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary">✓</span>
                                <span>Statistics on disk space saved after deletion</span>
                            </li>
                        </ul>
                    </section>
                    
                    <section className="bg-card p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Installation & Usage</h2>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Installation</h3>
                            <div className="bg-muted p-4 rounded">
                                <code>dotnet tool install --global VsCleanerTool</code>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-2">Usage</h3>
                            <div className="bg-muted p-4 rounded mb-2">
                                <code># Preview mode<br />vsclean</code>
                            </div>
                            <div className="bg-muted p-4 rounded mb-2">
                                <code># Delete mode<br />vsclean --delete</code>
                            </div>
                            <div className="bg-muted p-4 rounded">
                                <code># Help mode<br />vsclean --help</code>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <h3 className="text-xl font-bold mb-2">Help Output</h3>
                            <div className="bg-muted p-4 rounded text-sm font-mono overflow-auto">
                                <pre className="text-foreground/80">
HELP: Visual Studio Project Cleaner Tool
======================================

PURPOSE:
  Cleans up Visual Studio generated folders (.vs, bin, obj) to free disk space
  and resolve potential Visual Studio issues.

USAGE:
  vsclean [options]

OPTIONS:
  --help, -h     : Display this help message
  --delete, -d   : Delete the identified folders (otherwise only preview)

EXAMPLES:
  vsclean             : Preview folders that would be deleted
  vsclean --delete    : Delete all found folders after confirmation
  vsclean -h          : Display help information

BEHAVIOR:
  - Without options, the tool runs in preview mode only
  - The tool scans recursively from the current directory
  - It searches for .vs, bin, and obj folders
  - In delete mode, it checks if Visual Studio is locking folders
  - A confirmation prompt is shown before any deletion occurs
  - After deletion, statistics about space saved are displayed

NOTES:
  - Close Visual Studio before running in delete mode
  - Running this tool will remove build artifacts and require rebuilding projects
  - The tool is safe to use but always make sure you have backups
                                </pre>
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Terminal Output Example</h2>
                        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                            <pre>
Visual Studio Project Cleaner Tool
--------------------------------
Scanning directory: C:\Projects\MyWebApp

DELETE MODE: Folders will be removed

Found folders:
.vs folders (1):
- C:\Projects\MyWebApp\.vs

bin folders (3):
- C:\Projects\MyWebApp\bin
- C:\Projects\MyWebApp\Controllers\bin
- C:\Projects\MyWebApp\Models\bin

obj folders (3):
- C:\Projects\MyWebApp\obj
- C:\Projects\MyWebApp\Controllers\obj
- C:\Projects\MyWebApp\Models\obj

Proceed with deletion? (y/N): y

Deleting folders...
Deleted: C:\Projects\MyWebApp\.vs (45.32 MB)
Deleted: C:\Projects\MyWebApp\bin (84.75 MB)
Deleted: C:\Projects\MyWebApp\Controllers\bin (12.10 MB)
Deleted: C:\Projects\MyWebApp\Models\bin (8.97 MB)
Deleted: C:\Projects\MyWebApp\obj (29.44 MB)
Deleted: C:\Projects\MyWebApp\Controllers\obj (7.88 MB)
Deleted: C:\Projects\MyWebApp\Models\obj (6.24 MB)

Deletion complete! Statistics:
- Total folders removed: 7
- Total files deleted: 482
- Disk space reclaimed: 194.70 MB
                            </pre>
                        </div>
                    </section>
                    
                    <button 
                        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                        onClick={() => setShowCode(!showCode)}
                    >
                        {showCode ? "Hide Code" : "Show Source Code"}
                    </button>
                    
                    {showCode && (
                        <section className="bg-card p-6 rounded-lg shadow mt-4">
                            <h2 className="text-2xl font-bold mb-4">Source Code</h2>
                            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm overflow-auto">
                                <pre>
{`// VsCleanerTool.cs
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Threading.Tasks;

namespace VsCleanerTool 
{
    class Program 
    {
        static long totalSizeReclaimed = 0;
        static int totalFilesDeleted = 0;
        static int totalFoldersDeleted = 0;
        static bool deleteMode = false;
        
        static async Task Main(string[] args) 
        {
            Console.WriteLine("Visual Studio Project Cleaner Tool");
            Console.WriteLine("--------------------------------");
            
            // Parse command line arguments
            if (args.Contains("--help") || args.Contains("-h")) 
            {
                ShowHelp();
                return;
            }
            
            deleteMode = args.Contains("--delete") || args.Contains("-d");
            
            // Get current directory
            string currentDir = Directory.GetCurrentDirectory();
            Console.WriteLine($"Scanning directory: {currentDir}\\n");
            
            if (deleteMode) 
            {
                Console.WriteLine("DELETE MODE: Folders will be removed");
            } 
            else 
            {
                Console.WriteLine("PREVIEW MODE: Nothing will be deleted");
            }
            Console.WriteLine();
            
            // Find all target directories
            var vsDirectories = Directory.GetDirectories(currentDir, ".vs", SearchOption.AllDirectories);
            var binDirectories = Directory.GetDirectories(currentDir, "bin", SearchOption.AllDirectories);
            var objDirectories = Directory.GetDirectories(currentDir, "obj", SearchOption.AllDirectories);
            
            // Display what was found
            Console.WriteLine("Found folders:");
            Console.WriteLine($".vs folders ({vsDirectories.Length}):");
            foreach (var dir in vsDirectories) 
            {
                Console.WriteLine($"- {dir}");
            }
            
            Console.WriteLine();
            Console.WriteLine($"bin folders ({binDirectories.Length}):");
            foreach (var dir in binDirectories) 
            {
                Console.WriteLine($"- {dir}");
            }
            
            Console.WriteLine();
            Console.WriteLine($"obj folders ({objDirectories.Length}):");
            foreach (var dir in objDirectories) 
            {
                Console.WriteLine($"- {dir}");
            }
            
            if (deleteMode) 
            {
                // Before proceeding, check if any VS folders are locked
                bool isLocked = await CheckIfVSLocked(vsDirectories);
                if (isLocked) 
                {
                    Console.WriteLine("\\nWARNING: Visual Studio appears to be running.");
                    Console.WriteLine("Please close Visual Studio before proceeding.");
                    Console.Write("Proceed anyway? (y/N): ");
                } 
                else 
                {
                    Console.Write("\\nProceed with deletion? (y/N): ");
                }
                
                var response = Console.ReadLine()?.ToLower() ?? "n";
                if (response != "y" && response != "yes") 
                {
                    Console.WriteLine("Operation cancelled.");
                    return;
                }
                
                Console.WriteLine();
                Console.WriteLine("Deleting folders...");
                
                // Delete folders and calculate size
                DeleteFolders(vsDirectories);
                DeleteFolders(binDirectories);
                DeleteFolders(objDirectories);
                
                // Display statistics
                Console.WriteLine();
                Console.WriteLine("Deletion complete! Statistics:");
                Console.WriteLine($"- Total folders removed: {totalFoldersDeleted}");
                Console.WriteLine($"- Total files deleted: {totalFilesDeleted}");
                Console.WriteLine($"- Disk space reclaimed: {FormatSize(totalSizeReclaimed)}");
            }
        }
        
        static void ShowHelp() 
        {
            Console.WriteLine("HELP: Visual Studio Project Cleaner Tool");
            Console.WriteLine("======================================");
            Console.WriteLine();
            Console.WriteLine("PURPOSE:");
            Console.WriteLine("  Cleans up Visual Studio generated folders (.vs, bin, obj) to free disk space");
            Console.WriteLine("  and resolve potential Visual Studio issues.");
            Console.WriteLine();
            Console.WriteLine("USAGE:");
            Console.WriteLine("  vsclean [options]");
            Console.WriteLine();
            Console.WriteLine("OPTIONS:");
            Console.WriteLine("  --help, -h     : Display this help message");
            Console.WriteLine("  --delete, -d   : Delete the identified folders (otherwise only preview)");
            Console.WriteLine();
            Console.WriteLine("EXAMPLES:");
            Console.WriteLine("  vsclean             : Preview folders that would be deleted");
            Console.WriteLine("  vsclean --delete    : Delete all found folders after confirmation");
            Console.WriteLine("  vsclean -h          : Display help information");
            Console.WriteLine();
            Console.WriteLine("BEHAVIOR:");
            Console.WriteLine("  - Without options, the tool runs in preview mode only");
            Console.WriteLine("  - The tool scans recursively from the current directory");
            Console.WriteLine("  - It searches for .vs, bin, and obj folders");
            Console.WriteLine("  - In delete mode, it checks if Visual Studio is locking folders");
            Console.WriteLine("  - A confirmation prompt is shown before any deletion occurs");
            Console.WriteLine("  - After deletion, statistics about space saved are displayed");
            Console.WriteLine();
            Console.WriteLine("NOTES:");
            Console.WriteLine("  - Close Visual Studio before running in delete mode");
            Console.WriteLine("  - Running this tool will remove build artifacts and require rebuilding projects");
            Console.WriteLine("  - The tool is safe to use but always make sure you have backups");
        }
        
        static void DeleteFolders(string[] directories) 
        {
            foreach (var dir in directories) 
            {
                try 
                {
                    long size = CalculateDirectorySize(dir);
                    Directory.Delete(dir, true);
                    Console.WriteLine($"Deleted: {dir} ({FormatSize(size)})");
                    totalSizeReclaimed += size;
                    totalFoldersDeleted++;
                } 
                catch (Exception ex) 
                {
                    Console.WriteLine($"Failed to delete {dir}: {ex.Message}");
                }
            }
        }
        
        static long CalculateDirectorySize(string dir) 
        {
            DirectoryInfo dirInfo = new DirectoryInfo(dir);
            long size = 0;
            
            try 
            {
                // Add size of all files
                FileInfo[] files = dirInfo.GetFiles("*", SearchOption.AllDirectories);
                size = files.Sum(file => file.Length);
                totalFilesDeleted += files.Length;
            } 
            catch 
            {
                // If we can't access some files, just continue
            }
            
            return size;
        }
        
        static string FormatSize(long bytes) 
        {
            string[] sizes = { "B", "KB", "MB", "GB", "TB" };
            int order = 0;
            double size = bytes;
            
            while (size >= 1024 && order < sizes.Length - 1) 
            {
                order++;
                size /= 1024;
            }
            
            return $"{size:0.00} {sizes[order]}";
        }
        
        static async Task<bool> CheckIfVSLocked(string[] vsDirectories) 
        {
            try 
            {
                // Check if Visual Studio process is running
                var vsProcesses = Process.GetProcessesByName("devenv");
                if (vsProcesses.Length > 0) 
                {
                    return true;
                }
                
                // Try to check if files are locked
                foreach (var dir in vsDirectories) 
                {
                    if (Directory.Exists(dir)) 
                    {
                        try 
                        {
                            var lockFilePath = Path.Combine(dir, ".suo");
                            if (File.Exists(lockFilePath)) 
                            {
                                using (var stream = File.Open(lockFilePath, FileMode.Open, FileAccess.ReadWrite, FileShare.None)) 
                                {
                                    // If we can open it exclusively, it's not locked
                                }
                            }
                        } 
                        catch (IOException) 
                        {
                            // If we get an IOException, the file is probably locked
                            return true;
                        }
                    }
                }
            } 
            catch 
            {
                // If anything fails, assume it's better to warn the user
                return true;
            }
            
            return false;
        }
    }
}`}
                                </pre>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;