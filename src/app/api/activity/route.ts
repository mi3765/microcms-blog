import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../libs/microcms";

export async function GET() {
	try {
		const activities = await client.get({ endpoint: "activity" });
		return NextResponse.json(activities.contents);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch activities data" },
			{ status: 500 }
		);
	}
}
