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
                            <div className="bg-muted p-4 rounded">
                                <code># Delete mode<br />vsclean --delete</code>
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