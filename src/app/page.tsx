import Link from "next/link";
import { client } from "../../libs/microcms";

type NewsItem = {
	id: string;
	title: string;
	createdAt: string;
};

type ActivityItem = {
	id: string;
	title: string;
	createdAt: string;
	sumnail: {
		url: string;
	};
};

export default async function HomePage() {
	const newsResponse = await client.get({
		endpoint: "news",
		queries: { limit: 5, orders: "-createdAt" },
	});

	const activitiesResponse = await client.get({
		endpoint: "activity",
		queries: { limit: 3, orders: "-createdAt" },
	});

	const news: NewsItem[] = newsResponse.contents;
	const activities: ActivityItem[] = activitiesResponse.contents;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">最新のお知らせ</h1>
			<ul>
				{news.map((item) => (
					<li key={item.id} className="mb-2">
						<Link href={`/news/${item.id}`}>
							<h2 className="text-xl font-bold text-blue-500 hover:underline">
								{item.title}
							</h2>
							<p className="text-gray-500">
								{new Date(item.createdAt).toLocaleDateString()}
							</p>
						</Link>
					</li>
				))}
			</ul>
			<div className="mt-4">
				<Link href="/news">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						すべて見る
					</button>
				</Link>
			</div>

			<h1 className="text-3xl font-bold mt-8 mb-4">最新の活動内容</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{activities.map((item) => (
					<div key={item.id} className="border p-4 rounded-lg shadow-lg">
						<img src={item.sumnail.url} alt={item.title} className="mb-4" />
						<h2 className="text-xl font-bold">{item.title}</h2>
						<p className="text-gray-500">
							{new Date(item.createdAt).toLocaleDateString()}
						</p>
					</div>
				))}
			</div>
			<div className="mt-4">
				<Link href="/activity">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						すべて見る
					</button>
				</Link>
			</div>
		</div>
	);
}
