import Link from 'next/link';

export default function PostRef({ post, align, label }) {
  return (
    <div className={`postRef postRef--${align}`}>
      <Link href={`/posts/${post.slug}`}>
        <a className="clean noUnderline postRef__link">
          <div className="postRef__label">{label}</div>
          <h6 className="postRef__title">{post.meta.title}</h6>
          {align === 'left' && <div className="postRef__arrow">❮</div>}
          {align === 'right' && <div className="postRef__arrow">❯</div>}
        </a>
      </Link>
    </div>
  )
}
