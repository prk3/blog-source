import Link from 'next/link';

export default function Tag({ tag }) {
  if (!tag.title || !tag.color) {
    throw new Error('Tag incomplete.')
  }

  return (
    <Link href={`/tags/${tag.slug}`}>
      <a
        className="Tag Tag--light"
        style={{ backgroundColor: tag.color }}
      >
        {tag.title}
      </a>
    </Link>
  );
}
