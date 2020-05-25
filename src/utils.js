import matter from 'gray-matter';

let _postsCache = null;
let _postsCacheTime = null;

/**
 * Returns an array of posts { slug, meta, content }[].
 * Posts are sorted by date, latest to oldest.
 */
export function getPosts() {
  if (_postsCacheTime !== null && _postsCacheTime + 10000 > Date.now()) {
    return _postsCache;
  }

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

  posts.sort((a, b) => {
    // date descending
    const dateDiff = b.meta.published - a.meta.published;
    if (dateDiff !== 0) {
      return dateDiff;
    }

    // title descending
    return b.meta.title.localeCompare(a.meta.title);
  });

  _postsCache = posts;
  _postsCacheTime = Date.now();

  return posts;
}

export function formatDate(date) {
  const month = date.toLocaleString('en', { month: 'long' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
