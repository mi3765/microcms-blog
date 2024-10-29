import News from "../../components/News";
import { client } from "../../../libs/microcms";

async function fetchNews() {
	const res = await fetch("http://localhost:3000/api/news", {
		next: { revalidate: 60 }, // キャッシュを有効にする場合
	});
	if (!res.ok) {
		throw new Error("Failed to fetch news data");
	}
	return res.json();
}

export default async function NewsPage() {
	try {
		const news = await fetchNews();

		return (
			<div>
				<h1 className="text-3xl font-bold mb-4">お知らせ</h1>
				<News news={news} />
			</div>
		);
	} catch (error) {
		console.error("Error rendering NewsPage:", error);
		return <div>データの取得に失敗しました。</div>;
	}
}
