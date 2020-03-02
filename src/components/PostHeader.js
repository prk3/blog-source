import Link from 'next/link';
import PostHeaderImg from './PostHeaderImg';
import { formatDate } from '../utils';

export default function PostHeader({ post, config }) {
  const date = formatDate(new Date(post.meta.published));

  return (
    <header className="postHeader">
      <PostHeaderImg slug={post.slug} background={post.meta.background} />
      <div className="postHeader__navContainer">
        <div className="postHeader__navColumn">
          <nav>
            <Link href="/">
              <a className="clean noUnderline postHeader__logo">prk3</a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="postHeader__titleContainer">
        <div className="postHeader__titleColumn">
          <h1 className="postHeader__title">{post.meta.title}</h1>
          <h2 className="postHeader__author">{config.author.name}</h2>
          <h3 className="postHeader__date">{date}</h3>
        </div>
      </div>
    </header>
  );
}
