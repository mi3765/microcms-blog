import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

console.log("Service Domain:", serviceDomain);
console.log("API Key:", apiKey);

if (!serviceDomain || !apiKey) {
	throw new Error("Missing microCMS service domain or API key");
}

export const client = createClient({
	serviceDomain,
	apiKey,
});
