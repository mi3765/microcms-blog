import Link from "next/link";
import { client } from "../../../libs/microcms";
import Header from "../../components/Header";

type NewsItem = {
	id: string;
	title: string;
	createdAt: string;
};

type NewsPageProps = {
	searchParams: { page?: string };
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
	const page = parseInt(searchParams.page || "1", 10);
	const limit = 10;
	const offset = (page - 1) * limit;

	const newsResponse = await client.get({
		endpoint: "news",
		queries: { limit, offset, orders: "-createdAt" },
	});

	const news: NewsItem[] = newsResponse.contents;
	const totalCount = newsResponse.totalCount;
	const totalPages = Math.ceil(totalCount / limit);

	return (
		<div>
			<Header />
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">お知らせ一覧</h1>
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
				<div className="mt-4 flex justify-between">
					{page > 1 && (
						<Link href={`/news?page=${page - 1}`}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								前のページ
							</button>
						</Link>
					)}
					{page < totalPages && (
						<Link href={`/news?page=${page + 1}`}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								次のページ
							</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
