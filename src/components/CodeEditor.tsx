import React, { useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  initialValue?: string;
  onMount?: OnMount;
  path?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onMount, path }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // Configure TypeScript compiler options
    monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monacoInstance.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monacoInstance.languages.typescript.JsxEmit.ReactJSX,
      reactNamespace: 'React',
      allowJs: true,
      allowUmdGlobalAccess: true,
      typeRoots: ['node_modules/@types'],
      types: ['react-bootstrap', '@mui/material', '@chakra-ui/react'],
      baseUrl: 'file:///',
      paths: {
        '*': ['file:///node_modules/*'],
        'react-bootstrap': ['file:///node_modules/react-bootstrap/cjs/index.d.ts'],
        '@mui/material': ['file:///node_modules/@mui/material/index.d.ts']
      }
    });

    // Eagerly sync compiler options
    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    
    // Eagerly sync models so that package.json files are seen by the worker
    // WARNING: This can cause performance issues/crashes with many files.
    // Disabling it for now as it seems to be causing OOM crashes.
    monacoInstance.languages.typescript.typescriptDefaults.setEagerModelSync(false);

    // Add extra libraries if needed (e.g. React types if we want them built-in, 
    // but ATA should handle most things)

    if (onMount) {
      onMount(editor, monacoInstance);
    }
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="typescript"
      defaultValue={initialValue}
      onMount={handleEditorDidMount}
      path={path}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        quickSuggestions: { other: true, comments: true, strings: true },
      }}
    />
  );
};

export default CodeEditor;
