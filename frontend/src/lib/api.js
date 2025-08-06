import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  try {
    const response = await axiosInstance.get("/users/friends");
    // Ensure we return an array even if response.data is null/undefined
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error in getUserFriends:", error);
    throw error;
  }
}

export async function getRecommendedUsers() {
  try {
    const response = await axiosInstance.get("/users");
    // Ensure we return an array even if response.data is null/undefined
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    throw error;
  }
}

export async function getOutgoingFriendReqs() {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    // Ensure we return an array even if response.data is null/undefined
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs:", error);
    throw error;
  }
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
