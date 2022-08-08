import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { GetStaticProps, GetStaticPaths } from 'next';



export default function Post({postData}: {postData: 
  {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    {postData.title}<br />
    <Date dateString={postData.date} /><br />
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>;
}

//postDataをSSGする記述 [id]はparamsに入る
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  }
}


//静的パスを生成
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}