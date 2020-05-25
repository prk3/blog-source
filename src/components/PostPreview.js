import Link from 'next/link';
import Tag from '../components/Tag';
import { formatDate } from '../utils';

export default function PostPreview({ post, tags }) {
  return (
    <div className="PostPreview">
      <Link href={`/posts/${post.slug}`}>
        <a className="PostPreview__link fancy">
          <h1 className="PostPreview__title">{post.meta.title}</h1>
        </a>
      </Link>

      <div className="PostPreview__dateRow">
        <Link href={`/posts/${post.slug}`}>
          <a className="PostPreview__link">
            <time dateTime={new Date(post.meta.published)}>
              {formatDate(new Date(post.meta.published))}
            </time>
          </a>
        </Link>
      </div>

      <div>
        {post.meta.tags.split(',').map(slug => {
          const tag = { slug, ...tags[slug] };
          return <Tag key={slug} tag={tag} />;
        })}
      </div>

      <Link href={`/posts/${post.slug}`}>
        <a className="PostPreview__link fancy">
          <p>{post.meta.short}</p>
        </a>
      </Link>
    </div>
  );
}
