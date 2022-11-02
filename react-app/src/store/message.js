/* --------- ACTIONS -------- */
//? Action: set channel
const GET_CHANNEL_MESSAGES = 'channels/GET_CHANNEL_MESSAGES';

// action creator: get channel messages
export const getChannelMessages = (messages) => {
	return {
		type: GET_CHANNEL_MESSAGES,
		messages,
	};
};

/* --------- THUNKS -------- */

// thunk get messages in channel
export const thunkGetChannelMessages =
	(channelId, type = 'channels') =>
	async (dispatch) => {
		// fetch messages in channel
		if (channelId) {
			const res = await fetch(`/api/${type}/${channelId}/messages`).catch(
				(res) => {
					console.log(res);
				}
			);

			// if response ok
			if (res.ok) {
				const channelMessages = await res.json();

				// dispatch user data to state
				dispatch(getChannelMessages(channelMessages.channel_messages));

				return channelMessages;
			}
		}
	};

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllMessages = (state) =>
	state.messages.message
		? Object.values(state.messages.message)
		: state.messages;

/* --------- REDUCERS -------- */
const initialState = {};

export default function messageReducer(state = initialState, action) {
	const newMessages = { ...state };

	switch (action.type) {
		default:
			return Object.assign({}, newMessages, action.messages);
	}
}
