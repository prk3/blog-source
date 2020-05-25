import Link from 'next/link';

export default function PostRef({ post, align, label }) {
  return (
    <div className={`PostRef PostRef--${align}`}>
      <Link href={`/posts/${post.slug}`}>
        <a className="PostRef__link">
          <div className="PostRef__label">{label}</div>
          <h6 className="PostRef__title">{post.meta.title}</h6>
          {align === 'left' && <div className="PostRef__arrow">❮</div>}
          {align === 'right' && <div className="PostRef__arrow">❯</div>}
        </a>
      </Link>
    </div>
  )
}
