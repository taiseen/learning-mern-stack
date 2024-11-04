// export const getPopularPosts = async ({ queryKey }) => {
//     // this { queryKey } auto supply by useQuery hook...
//     const response = await api.get(queryKey[0]);
//     return response.data;
// }

// export const getFavoritePosts = async ({ queryKey }) => {
//     const response = await api.get(queryKey[0]);
//     return response.data;
// }

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// export const getPaginatedProducts = async ({ queryKey }) => {
//     const response = await api.get(`${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`);
//     return response.data;
// }

// export const getProductById = async ({ queryKey }) => {
//     const response = await api.get(`${queryKey[0]}/${queryKey[1]}`);
//     return response.data;
// }

// export const addNewProduct = async (item) => {
//     const response = await api.post('products', item);
//     return response.data;
// }

// export const editProduct = async (item) => {
//     const response = await api.patch(`products/${item.id}`, item);
//     return response.data;
// }

// export const productDeleteById = async (id) => {
//     await api.delete(`products/${id}`);
// }

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// export const getAllPost = () => api.get(`/posts`);

// export const likePost = (postId) => api.patch(`/posts/${postId}/like`);

// export const getProfile = (userId) =>
//     api.get(`/profile/${userId}`);

// export const profileBioUpdate = (userId, bio) =>
//     api.patch(`/profile/${userId}`, { bio });

// export const profileImgUpdate = (userId, fromData) =>
//     api.post(`/profile/${userId}/avatar`, fromData);

// export const createNewPost = (post) =>
//     api.post(`/posts`, { post });

// export const deletePost = (postId) =>
//     api.delete(`/posts/${postId}`);

// export const postComment = (postId, comment) =>
//     api.post(`/posts/${postId}/comment`, { comment });


// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// export const getAllProducts = async ({ queryKey }) => {
//     // this { queryKey } auto supply by useQuery hook...
//     const response = await api.get(queryKey[0]);
//     return response.data;
// }

// export const getPaginatedProducts = async ({ queryKey }) => {
//     const response = await api.get(`${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`);
//     return response.data;
// }