// src/components/context/MessageContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext);

// create provider for message page
export default function MessageProvider({ children }) {
	// state for context
	const [createChannelOpenModal, setCreateChannelOpenModal] = useState(false);
	const [createDMROpenModal, setCreateDMROpenModal] = useState(false);
	const [addPeopleModal, setAddPeopleModal] = useState(false);
	const [rightClickModal, setRightClickModal] = useState(false);
	const [channelName, setChannelName] = useState([]);
	const [dmrName, setDMRName] = useState([]);
	const [routeType, setRouteType] = useState('dmr');
	const [checkRouteProperlyOwned, setCheckRouteProperlyOwned] = useState(false);
	const [messageHoverModal, setMessageHoverModal] = useState(false);
	const [senderAuth, setSenderAuth] = useState(false);

	// Message Provider
	return (
		<>
			<MessageContext.Provider
				value={{
					createChannelOpenModal,
					setCreateChannelOpenModal,
					createDMROpenModal,
					setCreateDMROpenModal,
					addPeopleModal,
					setAddPeopleModal,
					channelName,
					setChannelName,
					dmrName,
					setDMRName,
					rightClickModal,
					setRightClickModal,
					routeType,
					setRouteType,
					checkRouteProperlyOwned,
					setCheckRouteProperlyOwned,
					messageHoverModal,
					setMessageHoverModal,
					senderAuth,
					setSenderAuth,
				}}
			>
				{children}
			</MessageContext.Provider>
		</>
	);
}
