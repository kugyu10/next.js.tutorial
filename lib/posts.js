import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  return allPostsData.sort(({ date: a}, {date: b}) => {
    if (a < b) {
      return 1;
    }else if (a > b) {
      return -1;
      
    }else {
      return 0;
    }
  });
}
