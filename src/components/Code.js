import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';

export default function({ language = null, value }) {

  if (0 && language !== null && SyntaxHighlighter.supportedLanguages.includes(language)) {
    const highlighter = import(`react-syntax-highlighter/dist/cjs/languages/prism/${language}`);
    SyntaxHighlighter.registerLanguage(language, highlighter);
  }

  return (
    <div className="code">
      <SyntaxHighlighter language={language} style={prism}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
