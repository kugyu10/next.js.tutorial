import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

  // postsディレクトリ以下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    // MDファイルを文字列として読み込み
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // メタデータのためにgray-matterを使う
    const matterResult = matter(fileContents);

    // データとIDを紐付ける
    return {
      id,
      ...matterResult.data,
    };
  });


  //日付順にposts並び替え
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;

    } else {
      return 0;
    }
  });
}

//posts配下にあるファイル名をすべて取得して返す。例：
// [
//   {
//     params: {
//       id: 'ssg-ssr'
//     }
//   },
//   {
//     params: {
//       id: 'pre-rendering'
//     }
//   }
// ]
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

//`id`で与えられたpostの中身を取得する
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  //メタデータのためgray-matterを使う
  const matterResult = matter(fileContents);

  //MarkdownをHTMLにコンバート
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  //idとデータを結合する
  return {
     id,
     contentHtml,
     ...matterResult.data,
  };
}
