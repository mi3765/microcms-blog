import React from "react";

type NewsItem = {
	id: string;
	title: string;
	body: string;
	image: {
		url: string;
	}[];
};

type NewsProps = {
	news: NewsItem[];
};

const News: React.FC<NewsProps> = ({ news }) => {
	if (!Array.isArray(news)) {
		return <div>データの取得に失敗しました。</div>;
	}

	return (
		<div className="news-section container mx-auto p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{news.map((item) => (
					<div key={item.id} className="border p-4 rounded-lg shadow-lg">
						{item.image.map((img, index) => (
							<img
								key={index}
								src={img.url}
								alt={item.title}
								className="mb-4"
							/>
						))}
						<h3 className="text-2xl font-bold mb-2">{item.title}</h3>
						<p>{item.body}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default News;
