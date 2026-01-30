import { useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import { configureATA } from './utils/ata';
import type { OnMount } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor';

// 👇 PUT IT HERE (module scope)
let lastSuggestions: monaco.languages.CompletionItem[] = [];
const INITIAL_CODE = `import React from 'react';
import { Button } from 'react-bootstrap';

function Example() {
  return (
    <div></div>
  );
}
`;

function App() {
  const onMount: OnMount = useCallback((editor, monaco) => {
    // Setup ATA
    const tsLang = monaco.languages.typescript;

const originalProvider =
  tsLang.getTypeScriptWorker;

monaco.languages.registerCompletionItemProvider('typescript', {
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

    lastSuggestions = info.entries.map((entry: { name: string }) => ({
      label: entry.name,
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: entry.name,
    }));

    return {
      suggestions: lastSuggestions,
    };
  },
});

    const ata = configureATA(
      (code, path) => {
        const filePath = `file://${path}`;
        console.log(`[ATA] Adding ${filePath} (${code.length} bytes)`);

        if (path.endsWith('.json')) {
          // For package.json, we create a model so resolution works, 
          // but we don't add it as an extra lib (which expects TS/JS).
          const uri = monaco.Uri.parse(filePath);
          if (!monaco.editor.getModel(uri)) {
            monaco.editor.createModel(code, 'json', uri);
          }
        } else {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filePath);
        }
      }
    );

    // Trigger ATA on content change
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      ata(content);
    })

editor.addCommand(
  monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
  () => {
    if (!lastSuggestions.length) {
      console.log('No suggestions captured yet');
      return;
    }

    const text = lastSuggestions
      .map((s) => s.label)
      .join('\n');

    navigator.clipboard.writeText(text);
    console.log(lastSuggestions)
    console.log(`[Copied ${lastSuggestions.length} suggestions]`);
  }
);



    // Initial trigger
    ata(editor.getValue());

    // Inject a global environment file to force indexing of types
    const envUri = monaco.Uri.parse('file:///env.d.ts');
    if (!monaco.editor.getModel(envUri)) {
      monaco.editor.createModel(
        `import * as React from 'react';\nimport * as ReactBootstrap from 'react-bootstrap';\nimport * as MuiMaterial from '@mui/material';\nimport * as ChakraUI from '@chakra-ui/react';`,
        'typescript',
        envUri
      );
    }
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', height: '100vh', color: 'white' }}>
      <h1>Monaco Editor + ATA (LSP-like Suggestions)</h1>
      <p>Try importing a library like <code>lodash</code> or <code>axios</code>. Types will be fetched automatically.</p>
      <CodeEditor 
        initialValue={INITIAL_CODE} 
        onMount={onMount} 
        path="file:///main.tsx"
      />
    </div>
  );
}

export default App;
