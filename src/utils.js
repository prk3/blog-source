import matter from 'gray-matter';

let _postsCache = null;

/**
 * Returns an array of posts { slug, meta, content }[].
 * Posts are sorted by date, latest to oldest.
 */
export function getPosts() {
  if (_postsCache) return _postsCache;

  const dir = require.context('../posts', true, /\.md$/);
  const fileNames = dir.keys();
  const fileValues = fileNames.map(dir);

  const posts = fileNames.map((name, i) => {
    const slug = name.match(/\/([\w-]+)\.md$/)[1];

    const parsed = matter(fileValues[i].default);
    const meta = parsed.data;
    const content = parsed.content;

    return { slug, meta, content };
  });

  posts.sort((a, b) => b.meta.published - a.meta.published);

  _postsCache = posts;
  return posts;
}

export function formatDate(date) {
  const month = date.toLocaleString('en', { month: 'long' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
