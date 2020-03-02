import Link from 'next/link';
import PostRef from './PostRef';

export default function PostFooter({ prevPost, nextPost }) {
  return (
    <footer className="postFooter">
      <div className="postFooter__column">
        <h1 className="postFooter__title">Thanks for reading!</h1>
        <p className="postFooter__message">
          <span>Want to ask a question or discuss the topic? Found a mistake? Open a </span>
          <a className="clean" href="https://github.com/prk3/blog-source/issues">github issue</a>
          <span>!</span>
        </p>
        <nav className="postFooter__nav">
          <div className="postFooter__next">
            {nextPost && <PostRef align="left" label="Next post" post={nextPost} />}
          </div>
          <div className="postFooter__back">
            <Link href="/">
              <a className="clean noUnderline postFooter__back__link">Home</a>
            </Link>
          </div>
          <div className="postFooter__prev">
            {prevPost && <PostRef align="right" label="Previous post" post={prevPost} />}
          </div>
        </nav>
      </div>
    </footer>
  )
}
