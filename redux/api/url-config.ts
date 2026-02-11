const URLConfig = {
  auth: {
    uri: "/auth",
    context: {
      login: "/login",
      profile: "/profile",
      logout: "/logout",
      logoutAll: "/logout-all",
      sessionVerify: "/session/verify",
      tokenRefresh: "/token/refresh",
    },
  },
  devices: {
    uri: "/devices",
    context: {
      sitWiseDevices: "/site-wise-devices",
      nodeWiseDevices: "/node-wise-devices"
    },
  },
  tags: {
    uri: "/tags",
    context: {
      cameraIds: "/by_camera_ids",
    },
  },
  events: {
    uri: "/events",
    context: {},
  },
  bookmarks: {
    uri: "/bookmarks",
    context: {
      cameraIds: "/by_camera_ids",
    },
  },
  eventTypes: {
    uri: "/event-types",
    context: {},
  },
  snapshots: {
    uri: "/snapshots",
    context: {
       delete: (id: string) => `/${id}`,
    },
  },
  videos: {
    uri: "/videos",
    context: {
      delete: (id: string) => `/${id}`,
    },
  },
  downloadLogs: {
    uri: "/downloads",
    context: {},
  },
};

export default URLConfig;
