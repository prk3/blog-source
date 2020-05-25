export default function Image({ slug, title, src, alt }) {
  return (
    <figure>
      <picture>
        <source
          type="image/webp"
          srcSet={`/assets/${slug}/${src}-post-1x.webp 830w, /assets/${slug}/${src}-post-2x.webp 1660w`}
          sizes="(min-height: 660px) 660px, 100vw"
        />
        <source
          type="image/jpg"
          srcSet={`/assets/${slug}/${src}-post-1x.jpg 830w, /assets/${slug}/${src}-post-2x.jpg 1660w`}
          sizes="(min-height: 660px) 660px, 100vw"
        />
        <img
          className="fancy__image"
          src={`/assets/${slug}/${src}-post-1x.jpg`}
          alt={alt}
        />
      </picture>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
