import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Code from '../../components/markdown/Code';
import Paragraph from '../../components/markdown/Paragraph';
import Image from '../../components/markdown/Image';
import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';
import { getPosts } from '../../utils';

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps(context) {
  const { slug } = context.params;
  const config = (await import('../../../data/config.json')).default;
  const tags = (await import('../../../data/tags.json')).default;
  const posts = getPosts();

  const index = posts.findIndex(post => post.slug === slug);
  if (index === -1) throw new Error(`Post "${slug}" does not exist.`);

  const thisPost = posts[index];
  const nextPost = posts[index-1] ?? null;
  const prevPost = posts[index+1] ?? null;

  return {
    props: JSON.parse(JSON.stringify({
      post: thisPost,
      nextPost,
      prevPost,
      config,
      tags,
    })),
  };
};

export async function getStaticPaths() {
  const posts = getPosts();

  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({ params: { slug }})),
  };
}

export default function Post({ config, post, nextPost, prevPost, tags }) {
  return (
    <div className="Post">
      <Head>
        <title>{post.meta.title} - {config.title}</title>
        <meta name="author" content={config.author.name} />
        <meta name="keywords" content={post.meta.tags} />
        <meta name="description" content={post.meta.short} />
      </Head>
      <PostHeader post={post} config={config} tags={tags} />
      <div className="Post__body">
        <div className="Post__bodyColumn fancy">
          <ReactMarkdown
            source={post.content}
            renderers={{
              code: Code,
              paragraph: Paragraph,
              image: props => <Image {...props} slug={post.slug} />
            }}
          />
        </div>
      </div>
      <PostFooter nextPost={nextPost} prevPost={prevPost} />
    </div>
  );
}
