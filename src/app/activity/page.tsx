"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../../../libs/microcms";
import Header from "../../components/Header";

type ActivityItem = {
	id: string;
	title: string;
	createdAt: string;
	sumnail: {
		url: string;
	};
	thesis: boolean;
};

type ActivityPageProps = {
	searchParams: { year?: string };
};

export default function ActivityPage({ searchParams }: ActivityPageProps) {
	const [activeTab, setActiveTab] = useState("project");
	const [activities, setActivities] = useState<ActivityItem[]>([]);
	const year = searchParams.year || new Date().getFullYear().toString();

	useEffect(() => {
		async function fetchActivities() {
			try {
				const activitiesResponse = await client.get({
					endpoint: "activity",
					queries: { limit: 100, orders: "-createdAt" },
				});

				console.log("Fetched activities:", activitiesResponse.contents);
				setActivities(activitiesResponse.contents);
			} catch (error) {
				console.error("Error fetching activities:", error);
			}
		}

		fetchActivities();
	}, []);

	const filteredActivities = activities.filter(
		(activity) => new Date(activity.createdAt).getFullYear().toString() === year
	);

	const projects = filteredActivities.filter((activity) => !activity.thesis);
	const theses = filteredActivities.filter((activity) => activity.thesis);

	return (
		<div>
			<Header />
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">活動内容一覧</h1>
				<div className="mb-4">
					<button
						className={`mr-4 ${activeTab === "project" ? "font-bold" : ""}`}
						onClick={() => setActiveTab("project")}
					>
						プロジェクト
					</button>
					<button
						className={`mr-4 ${activeTab === "thesis" ? "font-bold" : ""}`}
						onClick={() => setActiveTab("thesis")}
					>
						論文
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{activeTab === "project" &&
						projects.map((item) => (
							<Link key={item.id} href={`/activity/${item.id}`}>
								<div className="border p-4 rounded-lg shadow-lg cursor-pointer">
									<img
										src={item.sumnail.url}
										alt={item.title}
										className="mb-4"
									/>
									<h2 className="text-xl font-bold">{item.title}</h2>
									<p className="text-gray-500">
										{new Date(item.createdAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						))}
					{activeTab === "thesis" &&
						theses.map((item) => (
							<Link key={item.id} href={`/activity/${item.id}`}>
								<div className="border p-4 rounded-lg shadow-lg cursor-pointer">
									<img
										src={item.sumnail.url}
										alt={item.title}
										className="mb-4"
									/>
									<h2 className="text-xl font-bold">{item.title}</h2>
									<p className="text-gray-500">
										{new Date(item.createdAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						))}
				</div>
				<div className="mt-4">
					{Array.from(
						new Set(
							activities.map((activity) =>
								new Date(activity.createdAt).getFullYear()
							)
						)
					).map((year) => (
						<Link key={year} href={`/activity?year=${year}`}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
								{year}
							</button>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
