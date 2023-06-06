import React from 'react';

import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';

const RoomManager: React.FC = () => {
	return (
		<div className="mb-5 mt-10 rounded-[10px] bg-slate-2 p-10 text-base">
			<CreateRoomForm />
			<RoomList />
		</div>
	);
};

export default RoomManager;
