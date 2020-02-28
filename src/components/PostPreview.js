import Link from 'next/link';

export default function PostPreview({ context, post }) {
  return (
    <div className="postPreview">
      <Link href={`/posts/${post.slug}`}>
        <a className="clean noUnderline">
          <h1>{post.meta.title}</h1>
          <date>{String(post.meta.published)}</date>
          <p>{post.meta.short}</p>
        </a>
      </Link>
    </div>
  );
}
