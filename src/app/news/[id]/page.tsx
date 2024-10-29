import { client } from "../../../../libs/microcms";

type NewsDetailProps = {
	params: { id: string };
};

type NewsItem = {
	id: string;
	title: string;
	createdAt: string;
	body: string;
	image: {
		url: string;
	}[];
};

export default async function NewsDetailPage({ params }: NewsDetailProps) {
	const newsResponse = await client.get({
		endpoint: "news",
		contentId: params.id,
	});

	const news: NewsItem = newsResponse;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{news.title}</h1>
			<p className="text-gray-500 mb-4">
				{new Date(news.createdAt).toLocaleDateString()}
			</p>
			{news.image.map((img, index) => (
				<img key={index} src={img.url} alt={news.title} className="mb-4" />
			))}
			<div className="prose" dangerouslySetInnerHTML={{ __html: news.body }} />
		</div>
	);
}
