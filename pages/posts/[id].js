import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';


//postDataをSSGする記述 [id]はparamsに入る
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


export default function Post( {postData} ) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    {postData.title}<br />
    {postData.id}<br />
    <Date dateString={postData.date} /><br />
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>;
}


//静的パスを生成
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}