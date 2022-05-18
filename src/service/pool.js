import request from "../util/poolApi"

const listPool = (page, limit) => {
  return request({
    url: `api/v1/pool`,
    method: "GET",
    params: {
      page,
      limit,
    },
  })
}
const createPool = (data) => {
  return request({
    url: `api/v1/pool`,
    method: "POST",
    data,
  })
}
const editPool = (data) => {
  return request({
    url: `api/v1/pool/update`,
    method: "POST",
    data,
  })
}
const deletePool = (id) => {
  return request({
    url: `api/v1/pool/delete`,
    method: "POST",
    data: {
      id,
    },
  })
}
const upLoadFile = (data) => {
  return request({
    url: `api/v1/file/upload`,
    method: "POST",
    data,
  })
}
const deleteFile = (name) => {
  return request({
    url: `api/v1/file/${name}`,
    method: "DELETE",
  })
}
export { listPool, createPool, deletePool, editPool, upLoadFile, deleteFile }
