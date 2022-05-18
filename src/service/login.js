import request from "../util"

const loginService = (accountID, password) => {
  return request({
    url: `api/v1/login`,
    method: "POST",
    data:{
      accountID,
      password
    }
  })
}

export { loginService }
