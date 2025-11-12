import { apiSlice } from "../apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;



















// import URLConfig from "../config/url-config";
// import { apiSlice } from "./apiSlice";

// const BASE_URL = process.env.NEXT_PUBLIC_API_ARCHIVE_BASE_URL;

// export const tagsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTags: builder.query<any, any>({
//       query: ({
//         page,
//         page_size,
//         event_type,
//         start_time,
//         end_time,
//         search,
//         deviceIds,
//       }) => {
//         const queryParams = new URLSearchParams();

//         queryParams.set("page", page.toString());
//         queryParams.set("page_size", page_size.toString());

//         if (
//           event_type !== null &&
//           event_type !== undefined &&
//           event_type !== ""
//         ) {
//           queryParams.set("event_type", event_type);
//         }

//         if (
//           start_time !== null &&
//           start_time !== undefined &&
//           start_time !== ""
//         ) {
//           queryParams.set("start_time", start_time);
//         }

//         if (end_time !== null && end_time !== undefined && end_time !== "") {
//           queryParams.set("end_time", end_time);
//         }

//         if (search !== null && search !== undefined && search !== "") {
//           queryParams.set("search", search);
//         }
//         if (deviceIds !== null && deviceIds !== undefined && deviceIds !== "") {
//           queryParams.set("deviceIds", deviceIds);
//         }

//         return {
//           url: `${BASE_URL}${URLConfig.tags.uri}/?${queryParams.toString()}`,
//           method: "GET",
//         };
//       },
//       transformResponse: (response: any, _meta: any, arg: any) => {
//         const page = arg.page ?? 1;
//         const page_size = arg.page_size ?? 10;

//         let results = response?.results ?? [];
//         results = results.map((tag: any, index: number) => ({
//           ...tag,
//           index: (page - 1) * page_size + index + 1,
//           camera_name: tag.camera?.name ?? "-",
//           site_name: tag.camera?.site_name ?? "-",
//           event_name: tag.event_type_name,
//           created_by_full: tag.updated_by,
//           created_at: tag.updated_at ?? tag.created_at,
//           image_url: tag.media_asset?.image_url
//         }));

//         response["results"] = results;
//         return response;
//       },
//     }),

//     addTag: builder.mutation<any, any>({
//       query: (newTag) => ({
//         url: `${BASE_URL}${URLConfig.tags.uri}/`,
//         method: "POST",
//         body: newTag,
//       }),
//     }),

//     getTagsByCameraIds: builder.query<any, any>({
//       query: ({ camera_ids }) => {
//         const queryParams = new URLSearchParams();
//         if (
//           camera_ids !== null &&
//           camera_ids !== undefined &&
//           camera_ids !== ""
//         ) {
//           queryParams.set("camera_ids", camera_ids);
//         }
//         return {
//           url: `${BASE_URL}${URLConfig.tags.uri}${
//             URLConfig.tags.context.cameraIds
//           }/?${queryParams.toString()}`,
//           method: "GET",
//         };
//       },
//     }),
//   }),
// });

// export const {
//   useGetTagsQuery,
//   useAddTagMutation,
//   useGetTagsByCameraIdsQuery,
// } = tagsApiSlice;

