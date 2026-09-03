import React, { useState, useEffect, useRef } from 'react';
import { IconCheck } from './Icons';

interface IdeCodeViewerProps {
  filename: string;
  language: string;
  code: string;
  badge?: string;
  className?: string;
}

export const IdeCodeViewer: React.FC<IdeCodeViewerProps> = ({
  filename,
  language,
  code,
  badge = 'IAC',
  className = ''
}) => {
  const [content, setContent] = useState<string>(code);
  const [originalCode, setOriginalCode] = useState<string>(code);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(code);
    setOriginalCode(code);
    setIsEditing(false);
    setJustSaved(false);
  }, [code, filename]);

  const isModified = content !== originalCode;
  const lines = content.trim().split('\n');

  // Interactive Simulate Edit Action
  const handleSimulateEdit = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Realistic developer edit scenarios based on file
    let newContent = content;
    if (content.includes('ManagedBy')) {
      newContent = content.replace(
        /ManagedBy\s*=\s*"EgyKode-Pilot"/,
        'ManagedBy   = "EgyKode-Pilot"\n      AutoScale   = true\n      MaxCapacity = 8 # Scaled for High-Traffic Season'
      );
    } else if (content.includes('replicas')) {
      newContent = content.replace(/replicas:\s*\d+/, 'replicas: 4 # Scaled for high traffic');
    } else {
      newContent = content + '\n\n# Reviewer Override: Verified by Platform Team\nsecurity_review_passed = true';
    }

    setContent(newContent);
    setIsSimulating(false);
  };

  const handleSave = () => {
    setOriginalCode(content);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setContent(originalCode);
    setJustSaved(false);
  };

  // Syntax highlighting for display mode
  const renderHighlightedLine = (line: string, lang: string) => {
    // 1. Comments
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return (
        <span className="text-gray-500 dark:text-[#64748b] italic">
          {line}
        </span>
      );
    }

    // 2. YAML syntax
    if (lang === 'yaml' || lang === 'yml') {
      const match = line.match(/^(\s*)([a-zA-Z0-9_-]+):(\s*)(.*)$/);
      if (match) {
        const [, indent, key, colonSpace, value] = match;
        return (
          <>
            <span>{indent}</span>
            <span className="text-sky-700 dark:text-[#78b7ff] font-medium">{key}</span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span>{colonSpace}</span>
            {value.startsWith('"') || value.startsWith("'") ? (
              <span className="text-emerald-700 dark:text-[#7ee2a8] font-medium">{value}</span>
            ) : value.startsWith('[') || value.startsWith('{') ? (
              <span className="text-purple-700 dark:text-[#c58af9]">{value}</span>
            ) : (
              <span className="text-gray-800 dark:text-[#f3f4f6]">{value}</span>
            )}
          </>
        );
      }
      if (line.trim().startsWith('- ')) {
        const indent = line.substring(0, line.indexOf('- '));
        const rest = line.substring(line.indexOf('- ') + 2);
        return (
          <>
            <span>{indent}</span>
            <span className="text-sky-700 dark:text-[#78b7ff] font-bold">- </span>
            <span className="text-gray-800 dark:text-[#f3f4f6]">{rest}</span>
          </>
        );
      }
    }

    // 3. HCL / Terraform syntax
    if (lang === 'hcl' || lang === 'terraform') {
      const blockMatch = line.match(/^(\s*)([a-zA-Z0-9_]+)\s+(".*?"|\w+)?\s*({?)$/);
      if (blockMatch) {
        const [, indent, keyword, name, brace] = blockMatch;
        return (
          <>
            <span>{indent}</span>
            <span className="text-purple-700 dark:text-[#c58af9] font-semibold">{keyword}</span>
            {name && <span className="text-emerald-700 dark:text-[#7ee2a8] font-medium"> {name}</span>}
            {brace && <span className="text-gray-500 dark:text-gray-400"> {brace}</span>}
          </>
        );
      }

      const attrMatch = line.match(/^(\s*)([a-zA-Z0-9_-]+)(\s*=\s*)(.*)$/);
      if (attrMatch) {
        const [, indent, key, eq, val] = attrMatch;
        return (
          <>
            <span>{indent}</span>
            <span className="text-sky-700 dark:text-[#78b7ff] font-medium">{key}</span>
            <span className="text-gray-500 dark:text-gray-400">{eq}</span>
            {val.startsWith('"') || val.startsWith("'") ? (
              <span className="text-emerald-700 dark:text-[#7ee2a8] font-medium">{val}</span>
            ) : !isNaN(Number(val)) || val === 'true' || val === 'false' ? (
              <span className="text-amber-700 dark:text-[#e3b77a] font-medium">{val}</span>
            ) : (
              <span className="text-gray-800 dark:text-[#f3f4f6]">{val}</span>
            )}
          </>
        );
      }
    }

    // Default formatting
    return (
      <span>
        {line.split(/(".*?"|'.*?'|[{}\[\]])/g).map((part, i) => {
          if (part.startsWith('"') || part.startsWith("'")) {
            return <span key={i} className="text-emerald-700 dark:text-[#7ee2a8] font-medium">{part}</span>;
          }
          if (part === '{' || part === '}' || part === '[' || part === ']') {
            return <span key={i} className="text-purple-700 dark:text-[#c58af9]">{part}</span>;
          }
          return <span key={i} className="text-gray-800 dark:text-gray-300">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-[#22de7e]/30 bg-white dark:bg-[#080b0e] shadow-lg dark:shadow-2xl transition-colors duration-200 ${className}`}>
      {/* IDE Tab Bar */}
      <div className="flex items-center justify-between px-3 select-none text-[11px] border-b border-gray-200 dark:border-white/10 bg-[#f3f4f6] dark:bg-[#0d1217] transition-colors duration-200">
        {/* Active Tab */}
        <div className="flex items-center gap-2 py-2 px-3.5 border-t-2 border-r border-[#059669] dark:border-t-[#22de7e] border-r-gray-200 dark:border-r-white/10 bg-white dark:bg-[#080b0e] text-gray-900 dark:text-gray-200 transition-colors duration-200">
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-sky-100 dark:bg-[#0284c7]/20 text-sky-800 dark:text-[#38bdf8] border border-sky-300 dark:border-[#0284c7]/30">
            {language.toUpperCase()}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white tracking-wide">
            {filename}
          </span>
          {isModified && (
            <span
              className="w-2 h-2 rounded-full bg-amber-500 dark:bg-yellow-400 animate-pulse ml-1"
              title="Unsaved review override"
            />
          )}
        </div>

        {/* Interactive Actions & Keyboard Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulate Edit Button */}
          {!isModified ? (
            <button
              onClick={handleSimulateEdit}
              className="px-2 py-1 rounded bg-[#ecfdf5] dark:bg-[#22de7e]/15 border border-[#a7f3d0] dark:border-[#22de7e]/30 text-[#047857] dark:text-[#22de7e] hover:bg-[#d1fae5] dark:hover:bg-[#22de7e]/25 transition-all text-[10px] font-mono font-semibold flex items-center gap-1 shadow-xs"
              title="Click to simulate an infrastructure edit"
            >
              <span>⚡ Simulate Edit</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSave}
                className="px-2 py-1 rounded bg-[#059669] dark:bg-[#22de7e] text-white dark:text-black hover:bg-[#047857] dark:hover:bg-[#22de7e]/90 transition-all text-[10px] font-mono font-bold flex items-center gap-1 shadow-xs"
              >
                <span>Save Override</span>
              </button>
              <button
                onClick={handleReset}
                className="px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/20 transition-all text-[10px] font-mono"
              >
                Reset
              </button>
            </div>
          )}

          {/* Toggle Interactive Typing Mode */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-2 py-1 rounded border text-[10px] font-mono transition-all ${
              isEditing
                ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-500 text-purple-800 dark:text-purple-300 font-semibold'
                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Toggle direct text typing"
          >
            {isEditing ? '✓ Typing Mode' : '✎ Type Live'}
          </button>

          {/* Shortcuts */}
          <div className="hidden md:flex items-center gap-2 text-gray-500 dark:text-gray-500 text-[10px] font-mono">
            <span>Ctrl+S Save</span>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-3 overflow-x-auto max-h-[460px] overflow-y-auto leading-[1.65] bg-white dark:bg-[#080b0e] transition-colors duration-200 font-mono text-xs">
        {isEditing ? (
          /* Live Interactive Code Textarea */
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
              }
            }}
            className="w-full h-[400px] p-2 bg-transparent text-gray-900 dark:text-gray-100 font-mono text-[12px] leading-[1.65] border-0 focus:outline-none resize-none"
            spellCheck={false}
            autoFocus
          />
        ) : (
          /* High-Fidelity Highlighted View */
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                const hasFold = line.includes('{') || line.endsWith(':');
                return (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">
                    {/* Line Number Gutter */}
                    <td className="w-10 pr-3 text-right select-none font-mono text-[11px] align-top border-r border-gray-200 dark:border-white/5 text-gray-400 dark:text-[#475569]">
                      <span className="inline-flex items-center justify-end gap-1 w-full">
                        <span>{lineNum}</span>
                        {hasFold && <span className="text-[9px] text-gray-400 dark:text-[#64748b]">▾</span>}
                      </span>
                    </td>
                    {/* Highlighted Code Line */}
                    <td className="pl-3.5 whitespace-pre font-mono text-[12px] align-top text-gray-900 dark:text-[#f3f4f6]">
                      {renderHighlightedLine(line, language.toLowerCase())}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* IDE Status Footer */}
      <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 border-t border-gray-200 dark:border-white/10 bg-[#f3f4f6] dark:bg-[#0d1217] text-[10px] select-none font-mono text-gray-600 dark:text-gray-400 transition-colors duration-200 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {justSaved ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#22de7e] shrink-0"></span>
              <span className="text-[#047857] dark:text-[#22de7e] font-semibold flex items-center gap-1 whitespace-nowrap truncate">
                <IconCheck size={12} className="shrink-0" />
                <span className="hidden sm:inline">Override saved & </span>validated
              </span>
            </>
          ) : isModified ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-yellow-400 animate-pulse shrink-0"></span>
              <span className="text-amber-800 dark:text-yellow-400 font-semibold whitespace-nowrap truncate">
                <span className="hidden sm:inline">Modified in review</span>
                <span className="sm:hidden">Modified</span>
              </span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#22de7e] shrink-0"></span>
              <span className="whitespace-nowrap truncate">
                <span className="hidden sm:inline">No draft changes</span>
                <span className="sm:hidden">Clean</span>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-gray-500 dark:text-gray-400 shrink-0">
          <span className="hidden md:inline whitespace-nowrap">Ln 1, Col 1</span>
          <span className="whitespace-nowrap">{lines.length} lines</span>
          <span className="hidden sm:inline whitespace-nowrap">Spaces: 2</span>
          <span className="hidden sm:inline whitespace-nowrap">UTF-8</span>
          <span className="uppercase font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap px-1.5 py-0.5 rounded bg-gray-200/70 dark:bg-white/5 border border-gray-300/50 dark:border-white/5">
            {language}
          </span>
        </div>
      </div>
    </div>
  );
};
