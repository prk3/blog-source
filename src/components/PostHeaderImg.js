const FORMATS = ['webp', 'jpg'];

export default function PostHeaderImg({ slug, background }) {
  const makeSrcset = format => `
    /${slug}/header-x.${format} 1920w,
    /${slug}/header-l.${format} 1440w,
    /${slug}/header-m.${format} 960w,
    /${slug}/header-s.${format} 480w,
  `;

  return (
    <picture>
      {FORMATS.map(format => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={makeSrcset(format)}
          sizes="100vw"
        />
      ))}
      <img
        className="postHeaderImg"
        src={`/${slug}/header-m.${FORMATS[FORMATS.length-1]}`}
        alt="header image"
        style={{ color: background, backgroundColor: background }}
      />
    </picture>
  );
}
