import { useCallback, useRef, useState } from 'react';
import CodeEditor, { EDITOR_THEMES, SHORTCUTS_LIST, type EditorThemeId } from './components/CodeEditor';
import { configureATA } from './utils/ata';
import { debounce } from './hooks/useDebounce';
import { SUPPORTED_LANGUAGES, getDefaultCode, getFileExtension, type SupportedLanguage } from './utils/languageDefaults';
import { LIBRARY_PRESETS } from './utils/libraryPresets';
import { TypeDefinitionRegistry } from './utils/TypeDefinitionRegistry';
import type { OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';
import './App.css';

function App() {
  const [language, setLanguage] = useState<SupportedLanguage>('typescript');
  const [theme, setTheme] = useState<EditorThemeId>('vs-dark');
  const [library, setLibrary] = useState<string>('none');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [ataStatus, setAtaStatus] = useState<string>('');
  const [defCount, setDefCount] = useState(0);
  const [editorKey, setEditorKey] = useState(0);

  // Shared ref for suggestions (used by copy-suggestions shortcut)
  const lastSuggestionsRef = useRef<monaco.languages.CompletionItem[]>([]);

  const onMount: OnMount = useCallback((editor, monacoInstance) => {
    const tsLang = monacoInstance.languages.typescript as any;
    const originalProvider = tsLang.getTypeScriptWorker;

    // Register custom completion provider
    monacoInstance.languages.registerCompletionItemProvider('typescript', {
      triggerCharacters: ['.', '{', '<', '"', "'"],
      async provideCompletionItems(
        model: monaco.editor.ITextModel,
        position: monaco.Position,
        _context: monaco.languages.CompletionContext,
        _token: monaco.CancellationToken
      ) {
        const worker = await originalProvider();
        const client = await worker(model.uri);

        const info = await client.getCompletionsAtPosition(
          model.uri.toString(),
          model.getOffsetAt(position),
          {}
        );

        if (!info) return;

        lastSuggestionsRef.current = info.entries.map((entry: { name: string }) => ({
          label: entry.name,
          kind: monacoInstance.languages.CompletionItemKind.Text,
          insertText: entry.name,
        }));

        return {
          suggestions: lastSuggestionsRef.current,
        };
      },
    });

    // Setup ATA with debounced triggering
    const ata = configureATA(
      (code, path) => {
        const filePath = `file://${path}`;

        if (path.endsWith('.json')) {
          const uri = monacoInstance.Uri.parse(filePath);
          if (!monacoInstance.editor.getModel(uri)) {
            monacoInstance.editor.createModel(code, 'json', uri);
          }
        } else {
          (monacoInstance.languages.typescript as any).typescriptDefaults.addExtraLib(code, filePath);
        }
      },
      (progress) => {
        setAtaStatus(`Fetching types: ${progress.downloaded}/${progress.total}`);
      }
    );

    // Debounced ATA trigger — 30ms for sub-50ms latency
    const debouncedAta = debounce((content: string) => {
      ata(content);
      // Update stats display
      const stats = TypeDefinitionRegistry.getStats();
      setDefCount(stats.totalDefinitions);
      if (stats.totalDefinitions > 0) {
        setAtaStatus(
          `${stats.totalDefinitions} type defs | ${stats.uniquePackages} packages | ${(stats.totalBytes / 1024).toFixed(0)}KB`
        );
      }
    }, 30);

    // Wire up content change with debounce
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      debouncedAta(content);
    });

    // Initial ATA trigger
    ata(editor.getValue());

    // Inject environment definitions
    const envUri = monacoInstance.Uri.parse('file:///env.d.ts');
    if (!monacoInstance.editor.getModel(envUri)) {
      monacoInstance.editor.createModel(
        `import * as React from 'react';\nimport * as ReactBootstrap from 'react-bootstrap';\nimport * as MuiMaterial from '@mui/material';\nimport * as ChakraUI from '@chakra-ui/react';`,
        'typescript',
        envUri
      );
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as SupportedLanguage);
    setLibrary('none'); // Reset library when changing language
    setEditorKey(k => k + 1);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as EditorThemeId);
  };

  const handleLibraryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const libId = e.target.value;
    setLibrary(libId);
    // Switch to TypeScript when selecting a library
    if (libId !== 'none') {
      setLanguage('typescript');
    }
    setEditorKey(k => k + 1);
  };

  // Determine what code to show
  const getEditorCode = () => {
    if (library !== 'none') {
      const preset = LIBRARY_PRESETS.find(l => l.id === library);
      return preset?.defaultCode ?? getDefaultCode(language);
    }
    return getDefaultCode(language);
  };

  return (
    <div className="ide-container" data-theme={theme}>
      {/* ── Toolbar ────────────────────────────────────────────── */}
      <header className="ide-toolbar">
        <div className="toolbar-left">
          <h1 className="toolbar-title">
            <span className="title-icon">⚡</span>
            AutoSuggestion IDE
          </h1>
          <span className="toolbar-badge">Monaco + ATA</span>
        </div>

        <div className="toolbar-center">
          {ataStatus && (
            <div className="ata-status">
              <span className="status-dot" />
              {ataStatus}
            </div>
          )}
        </div>

        <div className="toolbar-right">
          {/* Language Selector */}
          <div className="toolbar-group">
            <label htmlFor="language-select" className="toolbar-label">Language</label>
            <select
              id="language-select"
              className="toolbar-select"
              value={language}
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Library Selector */}
          <div className="toolbar-group">
            <label htmlFor="library-select" className="toolbar-label">Library</label>
            <select
              id="library-select"
              className="toolbar-select"
              value={library}
              onChange={handleLibraryChange}
            >
              {LIBRARY_PRESETS.map((lib) => (
                <option key={lib.id} value={lib.id}>
                  {lib.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="toolbar-group">
            <label htmlFor="theme-select" className="toolbar-label">Theme</label>
            <select
              id="theme-select"
              className="toolbar-select"
              value={theme}
              onChange={handleThemeChange}
            >
              {EDITOR_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Shortcuts Button */}
          <button
            className="toolbar-button"
            onClick={() => setShowShortcuts(!showShortcuts)}
            title="Keyboard Shortcuts"
          >
            ⌨️ Shortcuts
          </button>
        </div>
      </header>

      {/* ── Status Bar (bottom info) ──────────────────────────── */}
      <div className="ide-editor-wrapper">
        <CodeEditor
          key={editorKey}
          initialValue={getEditorCode()}
          language={language}
          theme={theme}
          onMount={onMount}
          path={`file:///main${getFileExtension(language)}`}
          lastSuggestionsRef={lastSuggestionsRef}
        />
      </div>

      {/* ── Status Bar ────────────────────────────────────────── */}
      <footer className="ide-statusbar">
        <span>{SUPPORTED_LANGUAGES.find(l => l.id === language)?.label}</span>
        <span>|</span>
        <span>{library !== 'none' ? LIBRARY_PRESETS.find(l => l.id === library)?.label : 'No Library'}</span>
        <span>|</span>
        <span>{EDITOR_THEMES.find(t => t.id === theme)?.label}</span>
        <span>|</span>
        <span>{defCount} type definitions loaded</span>
        <span>|</span>
        <span>{SHORTCUTS_LIST.length} shortcuts active</span>
      </footer>

      {/* ── Keyboard Shortcuts Panel ──────────────────────────── */}
      {showShortcuts && (
        <div className="shortcuts-overlay" onClick={() => setShowShortcuts(false)}>
          <div className="shortcuts-panel" onClick={(e) => e.stopPropagation()}>
            <div className="shortcuts-header">
              <h2>⌨️ Keyboard Shortcuts</h2>
              <button
                className="shortcuts-close"
                onClick={() => setShowShortcuts(false)}
              >
                ✕
              </button>
            </div>
            <div className="shortcuts-grid">
              {SHORTCUTS_LIST.map((shortcut) => (
                <div key={shortcut.id} className="shortcut-item">
                  <span className="shortcut-label">{shortcut.label}</span>
                  <kbd className="shortcut-key">{shortcut.keybinding}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
