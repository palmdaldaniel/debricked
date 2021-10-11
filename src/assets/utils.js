export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM5OTAzODQsImV4cCI6MTYzMzk5Mzk4NCwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.omAlS5MrGUh7_d7uzNcsqLJ0xWrqSdFbF7nmBg_IAafRKbSfYFWW9bBBNtA2PADaOiczsApnVGI9NTFuKSdFkJYaoAscUQxZY1JOa_ZOdIilSnXQwjKKGuLb7rvmBK05pdyoU5YrZny4G96lXFMamXtbBFnnDgsn5satX9baFF2glrVparnKYhL8EThLa7dHnrUJU7hx5H1I1W0D9K1--JtOo6UPACJ-H2joUJ3vG6bvnnQJmrzvLRtSeMr_bfCtru55_w-35oKGCap2nZhjkckqNLNE1ye3iatdqM3DG2anb0qqfrzV-M8d542fQOgw8vdZya7oiB95mKkVIIWNPkwsc4IFLMb-IgbW9qquWVXd5U-R99REC7lcrH1ZVaBC_GjnL9gqg8UHQ1WHgN70BGdg_kv47CdQNpzDpwC19Q1EFb-DBjC8DOH7qfPmFZBkgz6Ai6GyH1n19c5pcySBTYwZznIjVDFpuuQ_cFklJvdrAUwAU9JLrXYi0VsciloxFHMgJ7VyisGh_CCut_j_Cd6syld2sZtLRJnll898FJfDd5upvNMSpDwVaN31V4jSYiliSLLhMt3w_BhVA6HF7nHejL0ArB3WIstARWwWaiXk8sBRqAcf7MC05OPtspdWaODloXszU2cb8zX1LkC2yjBq1M9rHXTiQtgB3ysvPyI";

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
