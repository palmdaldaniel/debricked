export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM5NzcxMzYsImV4cCI6MTYzMzk4MDczNiwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.ATWPsWT7s6SJg6xG2FFowMTG9xBC6EuYM7y6SE-lKcaTODXdF_LCU7tnBsMU03lN1EPVDemKqwMeBD6neQCk8OEmlGTNfabGZfAUDUyE7pJlCv6xTwwku8EyariKfX-Tqp8YOsZQsgxtLZGpxb_ARa3wR68E9K8lqKFQuXX1qeCtZnkh-mABPJl9oOYh9UiQm9v707bCOMKhIpC3O8BfotY0BMaVpn5nSEDDxZ9pq6eVYpyJ21BZfxY51EqkXEFQY_m1Mid9HfJ4BLG9GvBMajdcFjyeDhd3cO9xEyoxIqtjE-5m34okGibEvK7KOClMJbBwMB3dsAm9b3qgK_qdiXm7gCSbgTYaB5rhw2I8PVz2sntDDjSLQRInSEkKWiZIz0S16XbsxshlaNftTKw-t8h0LXHqwY25VjjVUXgjFio5LC-QoqxenUr02Z2kj6KFAKexupmxkwcsTncG0LiDsY66a1hHc-hpaPPO55Uxo77lB83CRpO4njVMdyCHs-Lq1ia3DXy-5hUVNwVyJHHyV8BdygAFTWis2H0Jm-emodLApN8Ay12upoOyPHxA1Nt97SObw4aBZ7QpR7YUK04jORYr-IFNVV_vCYEl5uASMluhhFvrdxXsYYveiODWtOq0vetS482VxrwicnVA6A9SmLglkNXGcL3BowTZC1L-gp4";

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
