import React from "react";

type HeroSectionProps = {
	title: string;
	subtitle: string;
	imageUrl: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
	title,
	subtitle,
	imageUrl,
}) => {
	return (
		<div
			className="hero-section bg-cover bg-center h-screen flex items-center justify-center"
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<div className="text-center text-white">
				<h1 className="text-5xl font-bold mb-4">{title}</h1>
				<p className="text-2xl mb-8">{subtitle}</p>
				<a
					href="#about"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					詳細を見る
				</a>
			</div>
		</div>
	);
};

export default HeroSection;
