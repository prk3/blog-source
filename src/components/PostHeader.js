import Link from 'next/link';
import PostHeaderImg from './PostHeaderImg';
import Tag from './Tag';
import { formatDate } from '../utils';

export default function PostHeader({ post, config, tags }) {
  return (
    <header className="PostHeader">
      <PostHeaderImg slug={post.slug} background={post.meta.background} />
      <div className="PostHeader__navContainer">
        <div className="PostHeader__navColumn">
          <nav>
            <Link href="/">
              <a className="PostHeader__logo">prk3</a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="PostHeader__titleContainer">
        <div className="PostHeader__titleColumn">
          <h1 className="PostHeader__title">{post.meta.title}</h1>
          <h2 className="PostHeader__author">{config.author.name}</h2>
          <h3 className="PostHeader__date">
            <time dateTime={new Date(post.meta.published)}>
              {formatDate(new Date(post.meta.published))}
            </time>
          </h3>
          {post.meta.tags && (
            <div className="PostHeader__tags">
              {post.meta.tags.split(',').map(slug => {
                const tag = { slug, ...tags[slug] };
                return <Tag key={slug} tag={tag} />
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
