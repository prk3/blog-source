import Head from 'next/head';
import PostPreview from '../components/PostPreview';
import { getPosts } from '../utils';

export default function Index({ posts, config }) {
  return (
    <div className="index">
      <Head>
        <title>{config.title}</title>
        <meta name="author" content={config.author.name} />
        <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,700&display=swap" rel="stylesheet"></link>
      </Head>
      <div className="index__container">
        <div className="index__postList">
          {posts.map((post, i) => (
            <PostPreview key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

Index.getInitialProps = async context => {
  const config = await import('../data/config.json');
  const posts = getPosts();

  return { posts, config };
};

