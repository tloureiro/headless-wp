import axios from 'axios'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),

  siteRoot: 'https://headless.localhost',

  async getRoutes() {

    let posts = [];

    const firstPage = await axios.get('https://api.headless.localhost/wp-json/wp/v2/posts/?per_page=100&page=1');

    const totalPages = parseInt(firstPage.headers['x-wp-totalpages']);

    posts = posts.concat(firstPage.data);

    if ( totalPages > 1 ) {
      for (let i=2; i<=totalPages; i++){
        const page = await axios.get(`https://api.headless.localhost/wp-json/wp/v2/posts/?per_page=100&page=${i}`);
        posts = posts.concat(page.data);
      }
    }

    return [
      {
        path: '/',
      },
      {
        path: '/about',
      },
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  }

}
