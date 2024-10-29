import React from "react";
import Header from "../../components/Header";

const FAQPage: React.FC = () => {
	return (
		<div>
			<Header />
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">FAQ</h1>
				<p className="text-lg">
					Here you can find answers to the most frequently asked questions.
				</p>
			</div>
		</div>
	);
};

export default FAQPage;
