import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import ReactMarkdown from "react-markdown";

export default function App() {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState("Output will appear here...");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput("Processing...\n");

    try {
      const response = await axios.post("http://localhost:5000/Ai/getPromt", { code });
      const resultLines = response.data.split("\n");
      setOutput("");

      for (let i = 0; i < resultLines.length; i++) {
        setTimeout(() => {
          setOutput((prev) => prev + resultLines[i] + "\n");
        }, i * 200);
      }
    } catch (error) {
      setOutput("Error executing code");
    }

    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col md:flex-row gap-4 h-screen">
      {/* Code Input Section */}
      <div className="flex flex-col w-full md:w-1/2 space-y-4">
        <Editor
          height="60vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          onChange={setCode}
          options={{
            fontSize: 14,
            automaticLayout: true,
            autoClosingBrackets: "always",
            suggestOnTriggerCharacters: true,
            tabSize: 2,
          }}
        />
        <button
          onClick={handleRunCode}
          className={`bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Output Section */}
      <div className="w-full md:w-1/2 bg-gray-800 p-4 rounded-md h-60 md:h-full overflow-auto">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: ({ children }) => (
              <pre className="whitespace-pre-wrap text-green-400 w-full h-full overflow-auto p-2">
                {children}
              </pre>
            ),
            code: ({ children }) => <code className="text-green-400">{children}</code>,
          }}
        >
          {output || "Output will appear here..."}
        </ReactMarkdown>
      </div>
    </div>
  );
}