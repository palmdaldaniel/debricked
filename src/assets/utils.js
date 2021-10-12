export const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzQwMzUzMTUsImV4cCI6MTYzNDAzODkxNSwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.hgI4lb6PsWATJ6zFFyLb5uekC_8cs3gwUu9rHHXI5tbjm5ceR1En44XpIag4MKC1gHjbB0A0W2w5x_KAhva-gfvLp2M8zLRuNn_8W8zVnJWNCH6Ham-HrRuwaibh9qmuVhqHXT-tqdbANPPhxbzRexq9QIk2OFYy-FWBLmQCOBBO4OGakJMT8bGkFaXQ0Zqa5YPuMdaEuh_8804r4GfPQEdvaBsYYV7yLxl8Q9EJi3e58uJDJAdinXQ_NiucFrGdbXN5b0PnHhHzRs9YR4qq6hOlRsJuuIL4pO9y_K_gJbPA96N1CWrPGXDkAWawkZUfCDQSowgpsPGpGUOsJsXhIS0vxPS4C_irTlUlf7VJl0M-VDN7O8HTAOSE6nH4pYykn-I9lj4pT1S-me2eaep4omRQXREJ_o606o86kyfTaDDFBZePwDP6JQtuqcspRhRUp18F6abm46-RSob0IPEGlLrg1NT2xjDx7yoB-2PdcjA8moRr5ACUvXjMZke08yQZ5iKpR2XfNWjpy9fcgPIECbvoy_H04ocFtUCpEL_sgphFVZP4sUyAUNXXD7Tc6lQnAzmHytQxLTSvpGcEvxig4vEnhNGYxPZ4P2g0YF2ILlG8BjoL-EQ5KddObO8xgoBJisE-Pc2tGXeTfZ95CTpKkdWkaPgMQ34xE62Zhn7uN9c";

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
