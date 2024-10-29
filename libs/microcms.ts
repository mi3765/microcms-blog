import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
	throw new Error("Missing microCMS service domain or API key");
}

export const client = createClient({
	serviceDomain,
	apiKey,
});
