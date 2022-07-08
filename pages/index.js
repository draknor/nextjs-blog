import Head from 'next/head';
import Layout, { siteTitle } from "../components/layout";
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData} from "../lib/posts";
import useSWR from 'swr';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>User Profile</h3>
        {Profile()}
      </section>
      <section className={utilStyles.headingMd}>
        <h3>Introduction</h3>
        <p>Hello, I'm <b>Dave</b>. I like to learn new things, like <b>Next.js</b>!</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '} <a href={"https://nextjs.org/learn"}>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={'${utilStyles.headingMd} ${utilStyles.padding1px}'}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          { allPostsData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date dateString={date}/>
                </small>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

// Static page generation at build time
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// Server-side rendering at run time
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // any properties
//     },
//   };
// }

function Profile() {
  const {data, error} = useSWR('api/user', fetch);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // render data
  return <div>hello {data.name}</div>;
}