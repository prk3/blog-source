import Link from 'next/link';
import PostRef from './PostRef';

export default function PostFooter({ prevPost, nextPost }) {
  return (
    <footer className="PostFooter">
      <div className="PostFooter__column">
        <h1 className="PostFooter__title">Thanks for reading!</h1>
        <p className="PostFooter__message">
          <span>Want to ask a question or discuss the topic? Found a mistake?</span>
          <br />
          <span>Open a </span>
          <a className="link--clean" href="https://github.com/prk3/blog-source/issues">github issue</a>
          <span>!</span>
        </p>
        <nav className="PostFooter__nav">
          <div className="PostFooter__next">
            {nextPost && <PostRef align="left" label="Next post" post={nextPost} />}
          </div>
          <div className="PostFooter__back">
            <Link href="/">
              <a className="PostFooter__backLink">Home</a>
            </Link>
          </div>
          <div className="PostFooter__prev">
            {prevPost && <PostRef align="right" label="Previous post" post={prevPost} />}
          </div>
        </nav>
      </div>
    </footer>
  )
}
