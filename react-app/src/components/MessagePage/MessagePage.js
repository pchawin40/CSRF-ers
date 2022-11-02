// import components
<<<<<<< HEAD
import LeftBar from "./LeftBar"
import ProfileBar from "./ProfileBar"
import MessageSender from "./MessageSender"
import MessageDisplay from "./MessageDisplay"
import SearchBar from "./SearchBar"
import { Editor } from "../Editor/Editor"
=======
import LeftBar from './LeftBar';
import ProfileBar from './ProfileBar';
import MessageSender from './MessageSender';
import MessageDisplay from './MessageDisplay';
import SearchBar from './SearchBar';
>>>>>>> dev

// import context
import MessageProvider from '../../context/MessageContext';
import { useProfile } from '../../context/ProfileContext';

// import css
import './MessagePage.css';

// import react
import React from 'react';

const MessagePage = () => {
<<<<<<< HEAD
    /**
     * Controlled Input
     */
    const { profileBarActive, setProfileBarActive } = useProfile();

    return (
        <div id="message-page-main">
            <section id="message-page-header">
                <SearchBar/>
            </section>
            <section
                id="message-page-body"
                className={`message-page-body-profile-${profileBarActive}`}
            >
                {/* Left Bar */}
                <aside id="left-bar">
                    <LeftBar />
                </aside>

                {/* Message Display */}
                <aside id="message-display">
                    <MessageDisplay />
                </aside>
                
                {/* <MessageSender /> */}
                <aside id="message-sender">
                    <Editor />
                </aside>
                
                {/* Message Profile Bar */}
                <aside id={`message-profile-${profileBarActive}`}>
                    <ProfileBar />
                </aside>
            </section>


        </div>
    )
}


export default MessagePage
=======
	/**
	 * Controlled Input
	 */
	const { profileBarActive, setProfileBarActive } = useProfile();

	return (
		<div id='message-page-main'>
			<section id='message-page-header'>
				<SearchBar />
			</section>
			<section
				id='message-page-body'
				className={`message-page-body-profile-${profileBarActive}`}
			>
				{/* Left Bar */}
				<aside id='left-bar'>
					<MessageProvider>
						<LeftBar />
					</MessageProvider>
				</aside>

				{/* Message Display */}
				<aside id='message-display'>
					<MessageDisplay />
				</aside>

				{/* <MessageSender /> */}
				<aside id='message-sender'></aside>

				{/* Message Profile Bar */}
				<aside id={`message-profile-${profileBarActive}`}>
					<ProfileBar />
				</aside>
			</section>
		</div>
	);
};

export default MessagePage;
>>>>>>> dev
