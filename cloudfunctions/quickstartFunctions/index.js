const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

/** 仅允许换取 quiz/ 前缀下的云素材（与 getAssetUrls 同源） */
const ALLOWED_FILE_PREFIX =
  "cloud://cloud1-d5gw2jt7af9f83de9.636c-cloud1-d5gw2jt7af9f83de9-1453135575/quiz/";

function isAllowedFileId(id) {
  return typeof id === "string" && id.indexOf(ALLOWED_FILE_PREFIX) === 0;
}

/** 管理端换取云文件临时 https（规避客户端 STORAGE_EXCEED_AUTHORITY） */
const getAssetUrls = async (event) => {
  let fileList = (event && event.fileList) || [];
  if (!Array.isArray(fileList)) fileList = [];
  fileList = fileList.filter(Boolean).slice(0, 50);

  if (!fileList.length) {
    return { fileList: [] };
  }

  const allowed = [];
  const rejected = [];
  fileList.forEach(function (id, index) {
    if (isAllowedFileId(id)) {
      allowed.push({ id: id, index: index });
    } else {
      rejected.push({
        fileID: id,
        status: 403,
        errMsg: "fileID not in allowed quiz/ prefix",
      });
    }
  });

  let resolved = [];
  if (allowed.length) {
    const resp = await cloud.getTempFileURL({
      fileList: allowed.map(function (item) {
        return item.id;
      }),
    });
    resolved = (resp && resp.fileList) || [];
  }

  const out = new Array(fileList.length);
  allowed.forEach(function (item, j) {
    out[item.index] = resolved[j] || {
      fileID: item.id,
      status: 500,
      errMsg: "getTempFileURL missing item",
    };
  });
  rejected.forEach(function (item) {
    const idx = fileList.indexOf(item.fileID);
    if (idx >= 0) out[idx] = item;
  });

  return { fileList: out };
};

// 云函数入口：生产仅保留 getAssetUrls；演示 type 硬禁用
exports.main = async (event, context) => {
  const type = event && event.type;
  switch (type) {
    case "getAssetUrls":
      return await getAssetUrls(event);
    case "getOpenId":
    case "getMiniProgramCode":
    case "createCollection":
    case "selectRecord":
    case "updateRecord":
    case "insertRecord":
    case "deleteRecord":
      return {
        success: false,
        errMsg: "type disabled: " + type,
      };
    default:
      return {
        success: false,
        errMsg: "unknown type: " + type,
      };
  }
};
