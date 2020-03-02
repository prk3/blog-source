import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Code from '../../components/Code';
import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';
import { getPosts } from '../../utils';

export default function Post({ config, post, nextPost, prevPost }) {
  return (
    <div className="post">
      <Head>
        <title>{post.meta.title} - {config.title}</title>
        <meta name="author" content={config.author.name} />
        <meta name="keywords" content={post.meta.tags} />
        <meta name="description" content={post.meta.short} />
        <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,700&display=swap" rel="stylesheet"></link>
      </Head>
      <PostHeader post={post} config={config} />
      <div className="post__body">
        <div className="post__body__column fancy">
          <ReactMarkdown source={post.content} renderers={{ code: Code }}/>
        </div>
      </div>
      <PostFooter nextPost={nextPost} prevPost={prevPost} />
    </div>
  );
}

Post.getInitialProps = async context => {
  const { slug } = context.query;
  const config = await import('../../data/config.json');
  const posts = getPosts();

  const index = posts.findIndex(post => post.slug === slug);
  if (index === -1) throw new Error(`Post "${slug}" does not exist.`);

  const thisPost = posts[index];
  const nextPost = posts[index-1];
  const prevPost = posts[index+1];

  return { post: thisPost, nextPost, prevPost, config };
};


