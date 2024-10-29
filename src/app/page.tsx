import HeroSection from "../components/HeroSection";
import News from "../components/News";
import Activity from "../components/Activity";
import { client } from "../../libs/microcms";

type NewsItem = {
	id: string;
	title: string;
	body: string;
	image: {
		url: string;
	}[];
};

type ActivityItem = {
	title: string;
	sumnail: {
		url: string;
	};
	body: string;
	image: {
		url: string;
	}[];
	thesis: boolean;
};

export default async function HomePage() {
	try {
		const newsResponse = await client.get({ endpoint: "news" });
		const activitiesResponse = await client.get({ endpoint: "activity" });

		const news: NewsItem[] = newsResponse.contents || [];
		const activities: ActivityItem[] = activitiesResponse.contents || [];

		return (
			<div>
				<HeroSection
					title="トップページのタイトル"
					subtitle="トップページのサブタイトル"
					imageUrl="https://example.com/hero-image.jpg"
				/>
				<News news={news} />
				<Activity activities={activities} />
			</div>
		);
	} catch (error) {
		console.error("Error fetching data:", error);
		return <div>データの取得に失敗しました。</div>;
	}
}
