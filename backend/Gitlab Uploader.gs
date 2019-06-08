/*
 * Gitlab Uploader (Google App Script)
 * 張睿玹版權所有
 * https://github.com/dwcoop/GoogleAppScript_Uploader/license.html
 * 文件: Gitlab Uploader.gs(前端)
 * 版本: V1.0.0
 * 日期: 2019-06-07T15:54Z
 */
function GithlabUploader(data,settings){
  var url=(
    "https://gitlab.com/api/v4/projects/"+settings.repoId+"/repository/files/"+
    encodeURIComponent(settings.uploadPath+settings.fileName)+
    "?ref="+settings.uploadBranch
  ),fetchResult
  try{
    fetchResult=UrlFetchApp.fetch(url,{
      "method":"POST",
      "contentType":"application/json",
      "headers":{
        "PRIVATE-TOKEN":settings.token
      },
      "payload":JSON.stringify({
        "branch":settings.uploadBranch,
        "content":Utilities.base64Encode(data, Utilities.Charset.UTF_8),
        "author_name":(settings.siteName+"Github上傳機器人(using Google App Script,Gitlab Uploader by 張睿玹)"+new Date()),
        "encoding":"base64",
        "commit_message":("網站:"+settings.siteName+",上傳時間:"+new Date().toString()+",專案:"+settings.scriptProjectName)
      })
    }).getContentText('utf-8')
  }catch(e){
    fetchResult="__ERROR__: "+e.message
  }
  return fetchResult
}