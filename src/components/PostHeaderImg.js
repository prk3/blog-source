export default function PostHeaderImg({ slug, background }) {
  return (
    <picture className="PostHeaderImg">
      <source type="image/webp" media="(max-width:  480px)" srcSet={`/assets/${slug}/header-s-2x.webp   960w, /assets/${slug}/header-s-1x.webp   480w`} />
      <source type="image/webp" media="(max-width:  960px)" srcSet={`/assets/${slug}/header-m-2x.webp  1920w, /assets/${slug}/header-m-1x.webp   960w`} />
      <source type="image/webp" media="(max-width: 1440px)" srcSet={`/assets/${slug}/header-l-2x.webp  2880w, /assets/${slug}/header-l-1x.webp  1440w`} />
      <source type="image/webp" media="(max-width: 1920px)" srcSet={`/assets/${slug}/header-x-2x.webp  3840w, /assets/${slug}/header-x-1x.webp  1920w`} />
      <source type="image/webp"                             srcSet={`/assets/${slug}/header-xx-2x.webp 5120w, /assets/${slug}/header-xx-1x.webp 2560w`} />

      <source type="image/jpg" media="(max-width:  480px)" srcSet={`/assets/${slug}/header-s-2x.jpg   960w, /assets/${slug}/header-s-1x.jpg   480w`} />
      <source type="image/jpg" media="(max-width:  960px)" srcSet={`/assets/${slug}/header-m-2x.jpg  1920w, /assets/${slug}/header-m-1x.jpg   960w`} />
      <source type="image/jpg" media="(max-width: 1440px)" srcSet={`/assets/${slug}/header-l-2x.jpg  2880w, /assets/${slug}/header-l-1x.jpg  1440w`} />
      <source type="image/jpg" media="(max-width: 1920px)" srcSet={`/assets/${slug}/header-x-2x.jpg  3840w, /assets/${slug}/header-x-1x.jpg  1920w`} />
      <source type="image/jpg"                             srcSet={`/assets/${slug}/header-xx-2x.jpg 5120w, /assets/${slug}/header-xx-1x.jpg 2560w`} />

      <img
        className="PostHeaderImg__img"
        src={`/assets/${slug}/header-m-1x.jpg`}
        alt="header image"
        style={{ color: background, backgroundColor: background }}
      />
    </picture>
  );
}
