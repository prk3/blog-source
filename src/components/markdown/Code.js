import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';

export default function Code({ language = null, value }) {
  return (
    <div className="Code">
      <SyntaxHighlighter language={language} style={prism}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
