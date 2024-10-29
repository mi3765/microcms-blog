import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../libs/microcms";

export async function GET() {
	try {
		const news = await client.get({ endpoint: "news" });
		return NextResponse.json(news.contents);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch news data" },
			{ status: 500 }
		);
	}
}
