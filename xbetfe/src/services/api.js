import httpRequest from './fetcher';

export const login = (username, password) => httpRequest({
    method: 'POST',
    url: '/authenticate',
    data: { username, password }
})

export const checkAuthSession = () => httpRequest({ method: 'GET', url: '/check-session' });

export const register = ({ email, password, username }) => httpRequest({
    method: 'POST',
    url: '/register',
    data: { username, password, email }
})

export const logout = () => httpRequest({ method: 'DELETE', url: '/logout' });

export const getNewsFeed = (params) => httpRequest({
    method: 'GET',
    url: '/feed',
    params
})

//  ------------------- POST METHODS ------------------

export const getSinglePost = (postID) => httpRequest({ method: 'GET', url: `/post/${postID}` });

export const createPost = (post) => httpRequest({
    method: 'POST',
    url: '/post',
    data: post
})

export const getPosts = (username, params) => {
    return httpRequest({
        method: 'GET',
        url: `/${username}/posts`,
        params
    })
}

export const deletePost = (postID) => httpRequest({ method: 'DELETE', url: `/post/${postID}` })

export const updatePost = (postID, updates) => {
    return httpRequest({
        method: 'PATCH',
        url: `/post/${postID}`,
        data: updates
    })
}

export const likePost = (id) => {
    return httpRequest({
        method: 'POST',
        url: `/like/post/${id}`
    })
}

export const getPostLikes = (postID, params) => {
    return httpRequest({
        method: 'GET',
        url: `/post/likes/${postID}`,
        params
    })
}

//  ------------------ USER METHODS ---------------------

export const getUser = (username) => httpRequest({ method: 'GET', url: `/${username}` })

export const updateUser = (username, updates) => {
    return httpRequest({
        method: 'PATCH',
        url: `/${username}/edit`,
        data: updates
    })
}

// --------------- COMMENT METHODS ------------------------

export const getComments = (postID, { offset = 0, limit, skip, sort = 'desc' }) => {
    return httpRequest({
        method: 'GET',
        url: `/comment/${postID}`,
        params: { offset, limit, skip, sort }
    })
}

export const deleteComment = (commentID) => {
    return httpRequest({ method: 'DELETE', url: `/comment/${commentID}` });
}

export const commentOnPost = (postID, body) => httpRequest({
    method: 'POST',
    url: `/comment/${postID}`,
    data: { body }
})

export const updateComment = (commentID, body) => {
    return httpRequest({
        method: 'PATCH',
        url: `/comment/${commentID}`,
        data: { body }
    })
}

export const likeComment = (commentID) => {
    return httpRequest({
        method: 'POST',
        url: `/like/comment/${commentID}`
    });
}

export const replyOnComment = (body, comment_id, post_id) => {
    return httpRequest({
        method: 'POST',
        url: `/reply`,
        data: {
            body,
            comment_id,
            post_id
        }
    })
}

export const getCommentReplies = (params) => {
    return httpRequest({
        method: 'GET',
        url: `/reply`,
        params: {
            offset: params.offset,
            comment_id: params.comment_id,
            post_id: params.post_id
        }
    })
}

// ------------------ NOTIFICATION METHOD ----------------

export const getNotifications = (params) => {
    return httpRequest({
        method: 'GET',
        url: `/notifications`,
        params: { offset: params.offset }
    })
}

// ---------------- FOLLOW METHODS -----------------------------

export const followUser = (id) => httpRequest({ method: 'POST', url: `/follow/${id}` });

export const unfollowUser = (id) => httpRequest({
    method: 'POST',
    url: `/unfollow/${id}`
})

export const getFollowers = (username, { offset = 0 }) => {
    return httpRequest({
        method: 'GET',
        url: `/${username}/followers`,
        params: { offset }
    })
}

export const getFollowing = (username, params) => {
    return httpRequest({
        method: 'GET',
        url: `/${username}/following`,
        params
    })
}

export const getSuggestedPeople = async (params) => {
    return httpRequest({
        method: 'GET',
        url: `/people/suggested`,
        params
    })
}

//  ---------- NOTIFICATION METHODS ---------------
export const readNotification = (id) => {
    return httpRequest({
        method: 'PATCH',
        url: `/read/notification/${id}`
    })
}

export const getUnreadNotifications = () => httpRequest({ method: 'GET', url: `/notifications/unread` })

export const markAllAsUnreadNotifications = () => {
    return httpRequest({ method: 'PATCH', url: `/notifications/mark` })
}

//  ---------- BOOKMARK METHODS ----------------

export const getBookmarks = (params) => httpRequest({
    method: 'GET',
    url: `/bookmarks`,
    params
})

export const bookmarkPost = (postID) => httpRequest({
    method: 'POST',
    url: `/bookmark/post/${postID}`
})

//  ----------------- UPLOAD METHODS --------------

export const uploadPhoto = async (data, field) => {
    return httpRequest({
        method: 'POST',
        url: `/upload/${field}`,
        data
    })
}

//  ---------------- SEARCH METHOD --------------
export const search = async (params) => {
    return httpRequest({
        method: 'GET',
        url: `/search`,
        params
    })
}

//  ---------------- MESSAGE METHODS -------------

export const getMessages = (params) => {
    return httpRequest({
        method: 'GET',
        url: `/messages`,
        params
    })
}

export const readMessage = (senderID) => {
    return httpRequest({
        method: 'PATCH',
        url: `/message/read/${senderID}`
    })
}

export const getUnreadMessages = () => httpRequest({ method: 'GET', url: `/messages/unread` })

export const sendMessage = (text, to) => {
    return httpRequest({
        method: 'POST',
        url: `/message/${to}`,
        data: { text }
    })
}

export const getUserMessages = (targetID, params) => {
    return httpRequest({
        method: 'GET',
        url: `/messages/${targetID}`,
        params
    })
}
