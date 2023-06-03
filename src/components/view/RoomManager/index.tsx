import React from 'react';

import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';

const RoomManager: React.FC = () => {
	return (
		<div className="mt-10 rounded-[30px] bg-blue-100 p-10 text-base">
			<CreateRoomForm />
			<RoomList />
		</div>
	);
};

export default RoomManager;
