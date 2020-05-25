export default function Paragraph(props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];

  // a single image does not need to be wrapped within a paragraph
  if (children.length == 1
    && ('key' in children[0])
    && String(children[0].key).startsWith('image-')) {
    return children[0];
  }

  // a paragraph starting with text can get
  if (children.length > 0
    && ('key' in children[0])
    && String(children[0].key).startsWith('text-')) {
    return <p className="fancy__textFirstParagraph">{props.children}</p>;
  }

  return <p>{props.children}</p>;
}
