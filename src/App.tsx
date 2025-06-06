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

NOTES:
  - Close Visual Studio before running in delete mode
  - Running this tool will remove build artifacts and require rebuilding projects
  - The tool is safe to use but always make sure you have backups
                                </pre>
                            </div>
                        </div>
                    </section>
                    
                    <button 
                        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                        onClick={() => setShowCode(!showCode)}
                    >
                        {showCode ? "Hide Code" : "Show Source Code"}
                    </button>
                    
                    {showCode && (
                        <section className="bg-card p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-4">Source Code</h2>
                            <p className="mb-4">
                                The tool is written in C# and packaged as a .NET tool. Here's the main program file:
                            </p>
                            <div className="bg-muted p-4 rounded overflow-auto max-h-[500px] text-sm">
                                <pre>{`
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
            bool helpMode = args.Contains("--help") || args.Contains("-h");
            
            // Show help if requested and exit
            if (helpMode)
            {
                DisplayHelp();
                return 0;
            }
            
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
        
        // Additional methods omitted for brevity
        
        static void DisplayHelp()
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("HELP: Visual Studio Project Cleaner Tool");
            Console.WriteLine("======================================");
            Console.ResetColor();
            
            Console.WriteLine("\nPURPOSE:");
            Console.WriteLine("  Cleans up Visual Studio generated folders (.vs, bin, obj) to free disk space");
            Console.WriteLine("  and resolve potential Visual Studio issues.");
            
            Console.WriteLine("\nUSAGE:");
            Console.WriteLine("  vsclean [options]");
            
            Console.WriteLine("\nOPTIONS:");
            Console.WriteLine("  --help, -h     : Display this help message");
            Console.WriteLine("  --delete, -d   : Delete the identified folders (otherwise only preview)");
            
            Console.WriteLine("\nEXAMPLES:");
            Console.WriteLine("  vsclean             : Preview folders that would be deleted");
            Console.WriteLine("  vsclean --delete    : Delete all found folders after confirmation");
            Console.WriteLine("  vsclean -h          : Display help information");
            
            Console.WriteLine("\nBEHAVIOR:");
            Console.WriteLine("  - Without options, the tool runs in preview mode only");
            Console.WriteLine("  - The tool scans recursively from the current directory");
            Console.WriteLine("  - It searches for .vs, bin, and obj folders");
            Console.WriteLine("  - In delete mode, it checks if Visual Studio is locking folders");
            Console.WriteLine("  - A confirmation prompt is shown before any deletion occurs");
            
            Console.WriteLine("\nNOTES:");
            Console.WriteLine("  - Close Visual Studio before running in delete mode");
            Console.WriteLine("  - Running this tool will remove build artifacts and require rebuilding projects");
            Console.WriteLine("  - The tool is safe to use but always make sure you have backups");
        }
    }
}`}</pre>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App