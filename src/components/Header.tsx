import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
	return (
		<header className="bg-gray-800 text-white p-4">
			<nav className="container mx-auto flex justify-between">
				<div className="flex space-x-4">
					<Link href="/">Top</Link>
					<Link href="/news">News</Link>
					<Link href="/activity">Activity</Link>
					<Link href="/member">Member</Link>
					<Link href="/faq">FAQ</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
