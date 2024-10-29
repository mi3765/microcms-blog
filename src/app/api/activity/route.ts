import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../libs/microcms";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const limit = searchParams.get("limit") || "10";
	const offset = searchParams.get("offset") || "0";

	try {
		const activities = await client.get({
			endpoint: "activity",
			queries: { limit: parseInt(limit), offset: parseInt(offset) },
		});
		return NextResponse.json(activities.contents);
	} catch (error) {
		console.error("Error fetching activities data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch activities data" },
			{ status: 500 }
		);
	}
}
