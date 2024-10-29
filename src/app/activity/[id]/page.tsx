import { client } from "../../../../libs/microcms";

type ActivityDetailProps = {
	params: { id: string };
};

type ActivityItem = {
	id: string;
	title: string;
	createdAt: string;
	body: string;
	image: {
		url: string;
	}[];
};

export default async function ActivityDetailPage({
	params,
}: ActivityDetailProps) {
	const activityResponse = await client.get({
		endpoint: "activity",
		contentId: params.id,
	});

	const activity: ActivityItem = activityResponse;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
			<p className="text-gray-500 mb-4">
				{new Date(activity.createdAt).toLocaleDateString()}
			</p>
			{activity.image.map((img, index) => (
				<img key={index} src={img.url} alt={activity.title} className="mb-4" />
			))}
			<div
				className="prose"
				dangerouslySetInnerHTML={{ __html: activity.body }}
			/>
		</div>
	);
}
