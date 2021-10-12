export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzQwMjIwMTgsImV4cCI6MTYzNDAyNTYxOCwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.a38TtJy_OLnDRa9_HFCjbjuqxRTzUaSaA5hLfs6x6CC0kt6KosmRzv0dC5peb2nbe489WaD3Z4YOgoTlgWJHcKVUyZq8tTzbZ02EKB-n5Vxl1v4cfjvUXJS-RjWpjRoZDdLYxCTbcfxpR6teL-tPUuA4v9zqZwhVWbkP_8p48wAFC5T-yKGbvuzoAQ-v19cw9l2ySz99QKW15OhKgwuTdvPWYVtH0yYa5XK7x8FQg0qNFBEryLLY6edJ_R-Be1KDcRSMCjMmHnU_2Tzifr7JtxWGRMH-QggO-fgwBZyYI2gxIF0Vz4s22xcFWCBlZvdA0Mb3gLRd2czXFVyth5kdqQe-ELiKc5cIaPm_svFwvxJEy00ZS_AFOY_AdhwAo_bK8_wlSQ62F6Ezrm-OpZze4kEXszrK8NTeV7opHr5-irvTjgPMWEOa_GqrdDf1Ld4QaJJVp8Ee_gQf-1MW6zFusZ_A-0cfik41-A78V3V--Eti5Y8cKsnLuDqr6qjEjvqHut_zwByxT3Kd6YyrjNEiuxCL78oSMV1vYmOktrRBe_EINIMRVwokkkMyBnHWFnrupLZkYCu1rHfN65u0VPiU3A6wRA_4zW8ydU3_dyKIP68Dv95K341z_-fiGReWou9rWgEH6wlta0aDXAxbt-WvGhsVps_KgdPxpYaAqLUF7bM";

// submit dependency file // post request
export const urlUpload =
  "http://localhost:8081/api/1.0/open/uploads/dependencies/files";

// track scanningprogress // get request
export const urlStartScanning =
  "http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads";

// start the scanning progress // post request
export const urlTrackProgress =
  "http://localhost:8081/api/1.0/open/ci/upload/status";

// get current user
export const urlWhoAmI = "http://localhost:8081/api/1.0/open/zapier/user";

// get current users repos
export const urlUsersRepos =
  "http://localhost:8081/api/1.0/open/zapier/repositories";
