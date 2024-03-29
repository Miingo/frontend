import { createSocket, socketUrl } from './socket'
import { derive, subscribeKey } from "valtio/utils"
import { proxy, ref } from "valtio"

import { getTokenPayload } from './utils/getTokenPayload';

const state = proxy( {
	user: null,
	userInfo: null,
	accessToken: null,
	users: [],
	friends: [],
	posts: [],
	comments: [],
	statuses: [],
	viewStatuses: [],
	conversations: [],
	messages: [],
	followings: [],
	followers: [],
	socket: null,
	isLoading: false,
	currentConversation: null,
	wsErrors: ref( [] ),
} );

derive( {
	isLoggedIn: ( get ) => get( state ).user,
	hasAccessToken: ( get ) => get( state ).accessToken,
	hasPosts: ( get ) => get( state ).users.length,
	hasComments: ( get ) => get( state ).comments?.length,
	hasSocket: ( get ) => get( state ).socket,
	hasWsErrors: (get) => get(state).wsErrors.length,
	me: ( get ) => {
		const accessToken = get( state ).accessToken
		if ( !accessToken ) return null
		const payload = getTokenPayload( accessToken )

		return {
			_id: payload.sub,
			name: payload.name,
			email: payload.email,
		}
	},
},

	{
		proxy: state,
	}
);

const actions = {
	initSocket: () => {
		if ( !state.socket ) {
			state.socket = ref( createSocket( { socketUrl, state, actions } ) );
		} else {
			state.socket.connect();
		}

	},
	setUserInfo: (user)=>{
		state.userInfo = user
	},
	updateUserImg: (user) => {
		state.userInfo = { ...state.userInfo, user: { image: user.image, coverImage: user.coverImage } }
	},
	sendMessage: (message) => {
		console.log(state.socket)
		if (state.socket && state.socket.connected) {
			console.log('message in state before',message)
			state.socket.emit('send_message', message)
		}
	},

	chatStarted: (chat) => {
		
		if (state.socket && state.socket.connected) {
			console.log('JOINNG CHATS', chat)
			state.socket.emit('joinChat', chat)
		}
	},
	setFollowers: (followers) => {
		state.followers = followers
	},
	setFollowings: (followings) => {
		state.followings = followings;
	},

	recievedMessages: (message) => {
			state.messages = [...state.messages, message]	
	
	},
	setFriends: (friends) => {
		state.friends = friends;
	},
	setOnlineStatus: (freindOnline) => {
		const friendIndex = state.friends.findIndex(f => f._id.toString() === freindOnline._id.toString());
		const updatedFriends = [...state.friends.slice(0, friendIndex), freindOnline, ...state.friends.slice(friendIndex + 1)];
		state.friends = updatedFriends;
	},
	setConversations: (conversations) => {
		state.conversations = conversations
	},
	setCurrentConversation: (current) => {
		state.currentConversation = current
	},
	setMessages: (messages) => {
		state.messages = messages
	},

	setMessage: (message) => {
		console.log('FRESH NEW MESSAGE', message);
		state.messages = [...state.messages, message]
	},
	startLoading: () => {
		state.isLoading = true
	},
	stopLoading: () => {
		state.isLoading = false
	},
	setUser: ( user ) => {
		state.user = user
		localStorage.setItem( 'user', JSON.stringify( user ) )
	},
	setAccessToken: ( accessToken ) => {
		state.accessToken = accessToken
	},
	addUsers: ( users ) => {
		state.users = users
		const loggedInUser = state.users.find( user => user._id === state.me._id )
		const otherUsers = state.users.filter( user => user._id !== loggedInUser._id )
		state.users = [loggedInUser, ...otherUsers]
	},
	follow: ( userTobeFollowed ) => {
		const userTobeFollowedIndex = state.users.findIndex( user => user._id === userTobeFollowed._id )
		const newUsers = [...state.users.slice( 0, userTobeFollowedIndex ), userTobeFollowed, ...state.users.slice( userTobeFollowedIndex + 1 )]
		state.users = newUsers
	},
	addPost: ( post ) => {
		state.posts = [post, ...state.posts]
		state.posts.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
	},
	addPosts: ( posts ) => {
		state.posts = posts
		state.posts.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
	},
	addComment: ( comment ) => {
		const currentComments = [...state.comments]
		if ( !currentComments.length === 0 ) {
			state.comments = [comment]
			state.comments.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
			return
		}
		const index = currentComments.findIndex( c => c._id === comment._id )
		if ( index === -1 ) {
			state.comments = [comment, ...currentComments]

		} else {
			state.comments = [
				...currentComments.slice( 0, index ),
				comment,
				...currentComments.slice( index + 1 ),
			]

		}
		state.comments.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
	},
	addComments: ( comments ) => {
		const currentComments = [...state.comments]
		currentComments.forEach( ( comment ) => {
			const index = comments.findIndex( ( c ) => c._id === comment._id )
			if ( index !== -1 ) {
				comments[index] = comment
			}
		} )
		state.comments = comments
		state.comments.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
	},
	addStatus: ( statuses ) => {
		state.statuses = statuses
	},
	addViewStatus: ( viewStatuses ) => {
		state.viewStatuses = viewStatuses
		console.log( "IN STATE: ", state.viewStatuses )
		state.viewStatuses.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) )
	},
	setSocket: ( socket ) => {
		state.socket = socket
	},
	deletePost ( id ) {
		state.posts = state.posts.filter( ( post ) => post._id !== id )

	},
	deleteComment ( id ) {
		state.comments = state.comments.filter( comment => comment.id !== id )
	},
	likePost ( likes, id ) {
		const likedPost = state.posts.find( post => post._id === id )
		likedPost.likes = likes

		const currentPosts = [...state.posts]
		const index = currentPosts.findIndex( post => post._id === id )
		currentPosts[index] = likedPost
		state.posts = currentPosts

	},
	incrementCommentsCountForPost ( id ) {
		const post = state.posts.find( post => post._id === id )
		post.commentCounts += 1

		const currentPosts = [...state.posts]
		const index = currentPosts.findIndex( post => post._id === id )
		currentPosts[index] = post
		state.posts = currentPosts
	}
}

subscribeKey( state, 'accessToken', () => {
	if ( state.accessToken ) {
		localStorage.setItem( 'accessToken', state.accessToken )

	} else {
		localStorage.removeItem( 'accessToken' )
		localStorage.removeItem( 'me' );
	}

} )

subscribeKey( state, 'user', () => {
	if ( state.user ) {
		localStorage.setItem( 'user', JSON.stringify( state.user ) );
		//state.user = localStorage.getItem('')
	} else {
		localStorage.removeItem( 'user' );
	}
} )

export { state, actions }
