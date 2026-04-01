import React, { useRef, useEffect } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import type { SupportedLanguage } from '../utils/languageDefaults';

// ─── Custom Theme Definitions ───────────────────────────────────────────────
// 6 themes total: 3 built-in (vs, vs-dark, hc-black) + 3 custom

const MONOKAI_THEME: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '75715E', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'F92672' },
    { token: 'string', foreground: 'E6DB74' },
    { token: 'number', foreground: 'AE81FF' },
    { token: 'type', foreground: '66D9EF', fontStyle: 'italic' },
    { token: 'function', foreground: 'A6E22E' },
    { token: 'variable', foreground: 'F8F8F2' },
    { token: 'constant', foreground: 'AE81FF' },
    { token: 'tag', foreground: 'F92672' },
    { token: 'attribute.name', foreground: 'A6E22E' },
    { token: 'attribute.value', foreground: 'E6DB74' },
    { token: 'delimiter', foreground: 'F8F8F2' },
  ],
  colors: {
    'editor.background': '#272822',
    'editor.foreground': '#F8F8F2',
    'editor.lineHighlightBackground': '#3E3D32',
    'editor.selectionBackground': '#49483E',
    'editorCursor.foreground': '#F8F8F0',
    'editorWhitespace.foreground': '#464741',
    'editorLineNumber.foreground': '#90908A',
    'editorLineNumber.activeForeground': '#C2C2BF',
  },
};

const GITHUB_DARK_THEME: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '8B949E', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'FF7B72' },
    { token: 'string', foreground: 'A5D6FF' },
    { token: 'number', foreground: '79C0FF' },
    { token: 'type', foreground: 'FFA657' },
    { token: 'function', foreground: 'D2A8FF' },
    { token: 'variable', foreground: 'C9D1D9' },
    { token: 'constant', foreground: '79C0FF' },
    { token: 'tag', foreground: '7EE787' },
    { token: 'attribute.name', foreground: '79C0FF' },
    { token: 'attribute.value', foreground: 'A5D6FF' },
  ],
  colors: {
    'editor.background': '#0D1117',
    'editor.foreground': '#C9D1D9',
    'editor.lineHighlightBackground': '#161B22',
    'editor.selectionBackground': '#264F78',
    'editorCursor.foreground': '#58A6FF',
    'editorWhitespace.foreground': '#21262D',
    'editorLineNumber.foreground': '#484F58',
    'editorLineNumber.activeForeground': '#C9D1D9',
  },
};

const SOLARIZED_DARK_THEME: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '586E75', fontStyle: 'italic' },
    { token: 'keyword', foreground: '859900' },
    { token: 'string', foreground: '2AA198' },
    { token: 'number', foreground: 'D33682' },
    { token: 'type', foreground: 'B58900' },
    { token: 'function', foreground: '268BD2' },
    { token: 'variable', foreground: '839496' },
    { token: 'constant', foreground: 'CB4B16' },
    { token: 'tag', foreground: '268BD2' },
    { token: 'attribute.name', foreground: '93A1A1' },
    { token: 'attribute.value', foreground: '2AA198' },
  ],
  colors: {
    'editor.background': '#002B36',
    'editor.foreground': '#839496',
    'editor.lineHighlightBackground': '#073642',
    'editor.selectionBackground': '#073642',
    'editorCursor.foreground': '#D30102',
    'editorWhitespace.foreground': '#073642',
    'editorLineNumber.foreground': '#586E75',
    'editorLineNumber.activeForeground': '#93A1A1',
  },
};

// ─── Theme Map ──────────────────────────────────────────────────────────────

export const EDITOR_THEMES = [
  { id: 'vs-dark', label: 'VS Dark' },
  { id: 'vs', label: 'VS Light' },
  { id: 'hc-black', label: 'High Contrast' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'solarized-dark', label: 'Solarized Dark' },
] as const;

export type EditorThemeId = (typeof EDITOR_THEMES)[number]['id'];

// ─── Keyboard Shortcuts Definition ──────────────────────────────────────────
// 15+ custom shortcuts for developer productivity

export interface KeyboardShortcut {
  id: string;
  label: string;
  keybinding: string; // Human-readable
  monacoKeys: number; // Monaco keybinding code (set lazily in onMount)
}

export const SHORTCUTS_LIST: Omit<KeyboardShortcut, 'monacoKeys'>[] = [
  { id: 'formatDocument', label: 'Format Document', keybinding: 'Ctrl+Shift+F' },
  { id: 'toggleMinimap', label: 'Toggle Minimap', keybinding: 'Ctrl+Shift+M' },
  { id: 'toggleWordWrap', label: 'Toggle Word Wrap', keybinding: 'Alt+Z' },
  { id: 'zoomIn', label: 'Zoom In', keybinding: 'Ctrl+=' },
  { id: 'zoomOut', label: 'Zoom Out', keybinding: 'Ctrl+-' },
  { id: 'resetZoom', label: 'Reset Zoom', keybinding: 'Ctrl+0' },
  { id: 'duplicateLine', label: 'Duplicate Line', keybinding: 'Ctrl+Shift+D' },
  { id: 'deleteLine', label: 'Delete Line', keybinding: 'Ctrl+Shift+K' },
  { id: 'moveLineUp', label: 'Move Line Up', keybinding: 'Alt+Up' },
  { id: 'moveLineDown', label: 'Move Line Down', keybinding: 'Alt+Down' },
  { id: 'toggleComment', label: 'Toggle Comment', keybinding: 'Ctrl+/' },
  { id: 'findReplace', label: 'Find & Replace', keybinding: 'Ctrl+H' },
  { id: 'goToLine', label: 'Go to Line', keybinding: 'Ctrl+G' },
  { id: 'selectAllOccurrences', label: 'Select All Occurrences', keybinding: 'Ctrl+Shift+L' },
  { id: 'foldAll', label: 'Fold All', keybinding: 'Ctrl+Shift+[' },
  { id: 'unfoldAll', label: 'Unfold All', keybinding: 'Ctrl+Shift+]' },
  { id: 'copySuggestions', label: 'Copy Suggestions', keybinding: 'Ctrl+Shift+S' },
  { id: 'toggleFullscreen', label: 'Toggle Fullscreen', keybinding: 'F11' },
];

// ─── Component ──────────────────────────────────────────────────────────────

interface CodeEditorProps {
  initialValue?: string;
  language?: SupportedLanguage;
  theme?: EditorThemeId;
  onMount?: OnMount;
  path?: string;
  lastSuggestionsRef?: React.MutableRefObject<monaco.languages.CompletionItem[]>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  language = 'typescript',
  theme = 'vs-dark',
  onMount,
  path,
  lastSuggestionsRef,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const minimapEnabled = useRef(false);
  const fontSizeRef = useRef(14);

  // Update theme when prop changes
  useEffect(() => {
    if (editorRef.current) {
      // Monaco's setTheme is global, just call it
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // ── Register Custom Themes ──────────────────────────────────────
    monacoInstance.editor.defineTheme('monokai', MONOKAI_THEME);
    monacoInstance.editor.defineTheme('github-dark', GITHUB_DARK_THEME);
    monacoInstance.editor.defineTheme('solarized-dark', SOLARIZED_DARK_THEME);

    // Apply the initial theme
    monacoInstance.editor.setTheme(theme);

    // ── Configure TypeScript Compiler Options ───────────────────────
    (monacoInstance.languages.typescript as any).typescriptDefaults.setCompilerOptions({
      target: (monacoInstance.languages.typescript as any).ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: (monacoInstance.languages.typescript as any).ModuleResolutionKind.NodeJs,
      module: (monacoInstance.languages.typescript as any).ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: (monacoInstance.languages.typescript as any).JsxEmit.ReactJSX,
      reactNamespace: 'React',
      allowJs: true,
      allowUmdGlobalAccess: true,
      typeRoots: ['node_modules/@types'],
      types: ['react-bootstrap', '@mui/material', '@chakra-ui/react'],
      baseUrl: 'file:///',
      paths: {
        '*': ['file:///node_modules/*'],
        'react-bootstrap': ['file:///node_modules/react-bootstrap/cjs/index.d.ts'],
        '@mui/material': ['file:///node_modules/@mui/material/index.d.ts'],
      },
    });

    (monacoInstance.languages.typescript as any).typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    (monacoInstance.languages.typescript as any).typescriptDefaults.setEagerModelSync(false);

    // ── Register 15+ Custom Keyboard Shortcuts ──────────────────────

    // 1. Format Document (Ctrl+Shift+F)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyF,
      () => {
        editor.getAction('editor.action.formatDocument')?.run();
        console.log('[Shortcut] Format Document');
      }
    );

    // 2. Toggle Minimap (Ctrl+Shift+M)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyM,
      () => {
        minimapEnabled.current = !minimapEnabled.current;
        editor.updateOptions({ minimap: { enabled: minimapEnabled.current } });
        console.log(`[Shortcut] Minimap: ${minimapEnabled.current ? 'ON' : 'OFF'}`);
      }
    );

    // 3. Toggle Word Wrap (Alt+Z)
    editor.addCommand(
      monacoInstance.KeyMod.Alt | monacoInstance.KeyCode.KeyZ,
      () => {
        const current = editor.getOption(monacoInstance.editor.EditorOption.wordWrap);
        const next = current === 'on' ? 'off' : 'on';
        editor.updateOptions({ wordWrap: next });
        console.log(`[Shortcut] Word Wrap: ${next}`);
      }
    );

    // 4. Zoom In (Ctrl+=)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Equal,
      () => {
        fontSizeRef.current = Math.min(fontSizeRef.current + 2, 40);
        editor.updateOptions({ fontSize: fontSizeRef.current });
        console.log(`[Shortcut] Zoom In: ${fontSizeRef.current}px`);
      }
    );

    // 5. Zoom Out (Ctrl+-)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Minus,
      () => {
        fontSizeRef.current = Math.max(fontSizeRef.current - 2, 8);
        editor.updateOptions({ fontSize: fontSizeRef.current });
        console.log(`[Shortcut] Zoom Out: ${fontSizeRef.current}px`);
      }
    );

    // 6. Reset Zoom (Ctrl+0)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Digit0,
      () => {
        fontSizeRef.current = 14;
        editor.updateOptions({ fontSize: 14 });
        console.log('[Shortcut] Reset Zoom: 14px');
      }
    );

    // 7. Duplicate Line (Ctrl+Shift+D)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyD,
      () => {
        editor.getAction('editor.action.copyLinesDownAction')?.run();
        console.log('[Shortcut] Duplicate Line');
      }
    );

    // 8. Delete Line (Ctrl+Shift+K)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyK,
      () => {
        editor.getAction('editor.action.deleteLines')?.run();
        console.log('[Shortcut] Delete Line');
      }
    );

    // 9. Move Line Up (Alt+Up)
    editor.addCommand(
      monacoInstance.KeyMod.Alt | monacoInstance.KeyCode.UpArrow,
      () => {
        editor.getAction('editor.action.moveLinesUpAction')?.run();
        console.log('[Shortcut] Move Line Up');
      }
    );

    // 10. Move Line Down (Alt+Down)
    editor.addCommand(
      monacoInstance.KeyMod.Alt | monacoInstance.KeyCode.DownArrow,
      () => {
        editor.getAction('editor.action.moveLinesDownAction')?.run();
        console.log('[Shortcut] Move Line Down');
      }
    );

    // 11. Toggle Comment (Ctrl+/)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Slash,
      () => {
        editor.getAction('editor.action.commentLine')?.run();
        console.log('[Shortcut] Toggle Comment');
      }
    );

    // 12. Find & Replace (Ctrl+H)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyH,
      () => {
        editor.getAction('editor.action.startFindReplaceAction')?.run();
        console.log('[Shortcut] Find & Replace');
      }
    );

    // 13. Go to Line (Ctrl+G)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyG,
      () => {
        editor.getAction('editor.action.gotoLine')?.run();
        console.log('[Shortcut] Go to Line');
      }
    );

    // 14. Select All Occurrences (Ctrl+Shift+L)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyL,
      () => {
        editor.getAction('editor.action.selectHighlights')?.run();
        console.log('[Shortcut] Select All Occurrences');
      }
    );

    // 15. Fold All (Ctrl+Shift+[)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.BracketLeft,
      () => {
        editor.getAction('editor.foldAll')?.run();
        console.log('[Shortcut] Fold All');
      }
    );

    // 16. Unfold All (Ctrl+Shift+])
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.BracketRight,
      () => {
        editor.getAction('editor.unfoldAll')?.run();
        console.log('[Shortcut] Unfold All');
      }
    );

    // 17. Copy Suggestions (Ctrl+Shift+S) — original shortcut preserved
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyS,
      () => {
        const suggestions = lastSuggestionsRef?.current ?? [];
        if (!suggestions.length) {
          console.log('No suggestions captured yet');
          return;
        }
        const text = suggestions.map((s) => s.label).join('\n');
        navigator.clipboard.writeText(text);
        console.log(`[Shortcut] Copied ${suggestions.length} suggestions`);
      }
    );

    // 18. Toggle Fullscreen (F11)
    editor.addCommand(monacoInstance.KeyCode.F11, () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      console.log('[Shortcut] Toggle Fullscreen');
    });

    // Call parent onMount
    if (onMount) {
      onMount(editor, monacoInstance);
    }
  };

  return (
    <Editor
      height="100%"
      language={language}
      defaultValue={initialValue}
      onMount={handleEditorDidMount}
      path={path}
      theme={theme}
      options={{
        minimap: { enabled: minimapEnabled.current },
        fontSize: fontSizeRef.current,
        wordWrap: 'on',
        automaticLayout: true,
        quickSuggestions: { other: true, comments: true, strings: true },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true },
        padding: { top: 16 },
        scrollBeyondLastLine: false,
        suggestOnTriggerCharacters: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
