import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../../libs/microcms";
import { useRouter } from "next/router";

type NewsDetail = {
	id: string;
	title: string;
	content: string;
	date: string;
	image: {
		url: string;
	};
};

type Props = {
	news: NewsDetail;
};

const NewsDetailPage: React.FC<Props> = ({ news }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{news.title}</h1>
			<img src={news.image.url} alt={news.title} className="mb-4" />
			<p className="text-gray-600">{news.date}</p>
			<div>{news.content}</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await client.get({ endpoint: "news" });
	const paths = data.contents.map((news: { id: string }) => ({
		params: { id: news.id },
	}));

	return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const data = await client.get({
		endpoint: "news",
		contentId: params?.id as string,
	});
	return {
		props: {
			news: data,
		},
	};
};

export default NewsDetailPage;
