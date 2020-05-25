import Head from 'next/head';
import PostPreview from '../components/PostPreview';
import { getPosts } from '../utils';

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps(context) {
  const config = (await import('../../data/config.json')).default;
  const tags = (await import('../../data/tags.json')).default;
  const posts = getPosts();

  return {
    props: JSON.parse(JSON.stringify({
      posts,
      config,
      tags,
    })),
  };
};

export default function Index({ posts, config, tags }) {
  return (
    <div className="Index">
      <Head>
        <title>{config.title}</title>
        <meta name="author" content={config.author.name} />
      </Head>
      <div className="Index__container">
        <div className="Index__about">
          <div className="Index__aboutColumn">
            <picture className="Index__aboutPic">
              <source type="image/webp" srcSet="/assets/avatar.webp 766w" />
              <source type="image/jpg" srcSet="/assets/avatar.jpg 766w" />
              <img className="Index__aboutAvatar" src="/assets/avatar.jpg" alt="avatar" />
            </picture>
            <h1 className="Index__aboutTitle">prk3</h1>
            <p className="Index__aboutParagraph">Hi! I'm prk3 and this is my personal blog, where every now and then I will be posting my discoveries, experiences and thoughts. Although I work mostly with Javascript and Typescript, you can expect articles about other interesting technologies, like C++ and Rust. Stay tuned!</p>

            <p className="Index__aboutParagraph">Oops, I almost forgot. This is a static blog! If you want to contact me or start a discussion, please create a GitHub issue.</p>

            <a className="Index__aboutRepoLink" href="https://github.com/prk3/blog-source">
              <img src="/assets/gh-logo.svg" alt="GitHub"/>
            </a>
          </div>
        </div>
        <div className="Index__posts">
          <div className="Index__postsColumn">
            <div className="Index__postsGuide">
              {posts.map((post, i) => (
                <PostPreview key={i} post={post} tags={tags} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


