import type { ReactNode } from "react";

const Header: React.FC = (): ReactNode => {
	return (
		<div className="w-full bg-teal-800 font-bold text-2xl text-white px-2 py-2">
			Task-Man
		</div>
	);
};

export default Header;
