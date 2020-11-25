import Head from 'next/head';
import { getPosts } from '../../utils';
import Tag from '../../components/Tag';
import PostPreview from '../../components/PostPreview';

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps(context) {
  const { slug } = context.params;
  const config = (await import('../../../data/config.json')).default;
  const tags = (await import('../../../data/tags.json')).default;
  const posts = getPosts();

  if (!tags[slug]) throw new Error(`Tag "${slug}" does not exist.`);

  return {
    props: JSON.parse(JSON.stringify({
      slug,
      posts,
      tags,
      config,
    })),
  };
};

export async function getStaticPaths() {
  const tags = (await import('../../../data/tags.json')).default;

  return {
    fallback: false,
    paths: Object.keys(tags).map(slug => ({ params: { slug } })),
  };
};

export default function TagPage({ slug, posts, tags, config }) {
  const relatedPosts = posts.filter(post => !!post.meta.tags && post.meta.tags.split(',').includes(slug));
  return (
    <div className="TagPage">
      <Head>
        <title>{tags[slug].title} tag - {config.title}</title>
        <meta name="author" content={config.author.name} />
        <meta name="keywords" content={slug} />
        <meta name="description" content={tags[slug].title} />
      </Head>
      <div className="TagPage__title">
        <span>Tag: </span>
        <Tag tag={{ slug, ...tags[slug]}} />
      </div>
      <div className="TagPage__previewColumn">
        {relatedPosts.map(post => <PostPreview key={post.slug} post={post} tags={tags} />)}
      </div>
    </div>
  );
}


