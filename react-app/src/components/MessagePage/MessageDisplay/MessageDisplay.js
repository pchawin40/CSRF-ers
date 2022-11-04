// import css
import './MessageDisplay.css';

// import context
import { useChannel } from '../../../context/ChannelContext';

//! BJM todo: set up react components

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useParams } from 'react-router-dom';

// import store
import * as messageActions from '../../../store/message';
import * as userActions from '../../../store/users';
import * as sessionActions from '../../../store/session';
import * as channelActions from '../../../store/channel';
import * as dmrActions from '../../../store/dmr';
import { Modal } from '../../../context/Modal';
import ShowMembersModal from './ShowMembersModal';

const MessageDisplay = () => {
	/**
	 *  Controlled Inputs
	 */
	// get all messages that belong to current channel
	const [messages, setMessages] = useState([]);
	const { currentChannel, setCurrentChannel } = useChannel();

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	// use selector
	const currentChat = useSelector(
		channelId
			? channelActions.getChatById(chatId)
			: dmrActions.getChatById(chatId)
	);

	// invoke dispatch
	const dispatch = useDispatch();

	// redux state
	const messageState = useSelector(messageActions.getAllMessages);
	const usersState = useSelector(userActions.getAllUsers);
	const [showMembersModal, setShowMembersModal] = useState(false);

	// per message state
	useEffect(() => {
		dispatch(
			channelId
				? messageActions.thunkGetChannelMessages(chatId)
				: messageActions.thunkGetChannelMessages(chatId, 'dmr')
		);
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch, chatId]);

	// per messageState
	useEffect(() => {
		if (Object.values(messageState).length > 0) {
			const currentMessages = Object.values(messageState).filter((message) => {
				return message.messageable_id === chatId;
			});

			setMessages(currentMessages);
		}
	}, [messageState, usersState]);

	// per current chat
	useEffect(() => {
		if (currentChat) {
			setCurrentChannel(currentChat);
		}
	}, [currentChat]);

	return Object.values(usersState).length > 0 && currentChat ? (
		<section id='message-display-main'>
			<section id='message-main-header'>
				<section id='message-main-header-left'>
					{/* BJM todo: Implement a button add feature maintaining css */}
					<button id='message-main-header-name'>
						{Object.values(currentChat).length > 0
							? currentChat.channel_name
							: ''}
					</button>
				</section>
				<section id='message-main-header-right'>
					{/* BJM: todo on click display modal of members, incorporate centralized slack modal */}
					<button onClick={(_) => setShowMembersModal(true)}>Members</button>
				</section>
			</section>
			{/* BJM: todo create loop of messages grabbing all messages in channel */}
			<section id='message-display-container'>
				{typeof messageState === 'object' &&
					messageState &&
					Object.values(messageState).length > 0 &&
					messages.map((message) => (
						<section className='message' key={message.id}>
							<aside className='profile-pic'>
								<img
									src={
										Object.values(usersState).find(
											(user) => user.id === message.sender_id
										).profile_image
									}
								/>
							</aside>
							<aside className='profile-name'>
								{
									Object.values(usersState).find(
										(user) => user.id === message.sender_id
									).display_name
								}
								<aside className='message-text'>{message.message}</aside>
							</aside>
						</section>
					))}
			</section>
			{showMembersModal && (
				// render profile modal
				<Modal onClose={(_) => setShowMembersModal(false)}>
					<ShowMembersModal setShowMembersModal={setShowMembersModal} />
				</Modal>
			)}
		</section>
	) : (
		<section id='message-display-main'>Message not available. TBD</section>
	);
};

export default MessageDisplay;
