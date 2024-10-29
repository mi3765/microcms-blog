import React from "react";
import Header from "../../components/Header";

const MemberPage: React.FC = () => {
	return (
		<div>
			<Header />
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">Our Members</h1>
				<p className="text-lg">
					Meet our team members. We are a group of dedicated professionals
					working together to achieve our goals.
				</p>
			</div>
		</div>
	);
};

export default MemberPage;
