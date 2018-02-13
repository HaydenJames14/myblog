import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {
            username: '',
            email: '',
            userId: '',
            active: undefined
        },
        threads: [],
        posts: [],
        threadId: '',
        filteredThread: [],
        allMembers: [],
        msg: '',
        threadName: '',
        loggedStatus: false,
        myThreads: [],
        myPosts: [],
        threadPosts: [],
        filteredData: [],
        searchText: '',
        searchType: 'threads',
        messages: []
    },
    getters: {
        getuser(state) {
            return state.user;
        },
        getToken(state) {
            return sessionStorage.getItem('accessToken');
        },
        getUserId(state) {
            return state.user.userId;
        },
        getThreadId(state) {
            return state.threadId;
        },
        getUsername(state) {
            return state.user.username;
        },
        getThreads(state) {
            return state.threads;
        },
        getFilteredData(state) {
            return state.filteredData;
        },
        getPosts(state) {
            return state.posts;
        },
        getThreadHeader(state) {
            return state.threadHeader;
        },
        getMyThreads(state) {
            return state.myThreads
        },
        getMyPosts(state) {
            return state.myPosts
        },
        getAllMembers(state) {
            return state.allMembers;
        },
        getThreadName(state) {
            return state.threadName;
        },
        getMsg(state) {
            return state.msg;
        },
        getLoggedStatus(state) {
            return state.loggedStatus;
        },
        getThreadPosts(state) {
            return state.threadPosts;
        },
        getSearchText(state) {
            return state.searchText;
        },
        getSearchType(state) {
            return state.searchType;
        },
        getReceivedMessage(state) {
            return state.receivedMessage;
        },
        getAllMessages(state) {
            return state.messages;
        },
        getConversation(state, payload) {
            return state.messages.filter(function(message) {
                return message.sender === payload.sender
            })
        }
    },
    mutations: {
        setUser(state, payload, token) {
            state.user.username = payload.username;
            state.user.email = payload.email;
            state.user.userId = payload.userId;
            state.user.active = true;
            sessionStorage.setItem('accessToken', token);
            state.loggedStatus = true;
        },
        setUserNone(state) {
            state.user.username = '';
            state.user.email = '';
            state.user.userId = '';
            state.user.active = false;
            sessionStorage.removeItem("accessToken");
            state.loggedStatus = false;
        },
        setPosts(state, payload) {
            state.posts = payload;
        },
        setThreads(state, payload) {
            state.threads = payload;
        },
        setThreadId(state, payload) {
            state.threadId = payload;
        },
        setMsg(state, payload) {
            state.msg = payload
        },
        setAllMembers(state, payload) {
            state.allMembers = payload;
        },
        setThreadName(state, payload) {
            state.threadName = payload;
        },
        setMyThreads(state, payload) {
            state.myThreads = payload;
        },
        setMyPosts(state, payload) {
            state.myPosts = payload;
        },
        setThreadPosts(state, payload) {
            state.threadPosts = payload;
        },
        setSearchText(state, payload) {
            if (payload) state.searchText = payload;
        },
        setSearchType(state, payload) {
            state.searchType = payload;
        },
        setFilteredData(state, payload) {
            if (!payload.text) {
                return;
            } else {
                if (payload.type === 'threads') {
                    // Filter by search thread title
                    state.filteredData = store.getters.getThreads.filter(thread => { return thread.title.match(payload.text) });
                }
                if (payload.type === 'posts') {
                    // Filter thread by selected post
                    state.filteredData = store.getters.getPosts.filter(post => { return post.title.match(payload.text) })
                }
                if (payload.type === 'member') {
                    // Find all posts belonging to selected member
                    state.filteredData = store.getters.getPosts.filter(post => { return post.postedBy.match(payload.text) })
                }
            }
            return state.filteredData;
        },
        setLoggedStatus(state, payload) {
            state.loggedStatus = payload;
        },
        SOCKET_SET_MEMBER_ACTIVE(state, payload) {
            let members = state.allMembers.map(function(m) {
                if (m.username === payload) { return m.active = true }
            });
            /*
                        for (let i = 0; i < state.allMembers.length; i++) {
                            if (state.allMembers.username === payload) {
                                state.allMembers.active = true
                            }
                        } */
            console.log('In socket_set_member_active');
            store.commit('setAllMembers', state.allMembers);
        },
        SOCKET_SET_MEMBER_NOT_ACTIVE(state, payload) {
            let members = state.allMembers.map(function(m) {
                if (m.username === payload) {
                    m.active = false;
                    console.log('In map.. value of m: ' + m);
                    return m
                } else {
                    return m
                }
            })
            store.commit('setAllMembers', members);
            console.log('In socket_set_member_not_active');
            store.commit('setAllMembers', state.allMembers);
        },
        setMessages(state, payload) {
            state.messages.push(payload);
        }
    },
    actions: {
        setThreads(context, threads) {
            context.commit('setThreads', threads);
        },
        setPosts(context, posts) {
            context.commit('setPosts', posts);
        },
        addMember(context, payload) {
            context.commit('addMember', payload)
        },
        setAllMembers(context, payload) {
            context.commit('setAllMembers', payload);
        },
        setMyThreads(context, payload) {
            context.commit('setMyThreads', payload);
        },
        setMyPosts(context, payload) {
            context.commit('setMyPosts', payload);
        },
        setThreadPosts(context, payload) {
            context.commit('setThreadPosts', payload);
        }
    }

});