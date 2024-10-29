import React from "react";

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

type ActivityProps = {
	activities: ActivityItem[];
};

const Activity: React.FC<ActivityProps> = ({ activities }) => {
	if (!Array.isArray(activities)) {
		return <div>データの取得に失敗しました。</div>;
	}

	return (
		<div className="activities-section container mx-auto p-4">
			<h2 className="text-3xl font-bold mb-4">活動内容</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{activities.map((activity, index) => (
					<div key={index} className="border p-4 rounded-lg shadow-lg">
						<img
							src={activity.sumnail.url}
							alt={activity.title}
							className="mb-4"
						/>
						<h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
						<p>{activity.body}</p>
						{activity.image.map((img, imgIndex) => (
							<img
								key={imgIndex}
								src={img.url}
								alt={activity.title}
								className="mb-4"
							/>
						))}
						<p>{activity.thesis ? "論文あり" : "論文なし"}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Activity;
