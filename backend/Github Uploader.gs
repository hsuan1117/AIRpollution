/*
 * Github Uploader (Google App Script)
 * 張睿玹版權所有
 * https://github.com/dwcoop/GoogleAppScript_Uploader/license.html
 * 文件: Github Uploader.gs(後端)
 * 版本: V1.0.0
 * 日期: 2019-06-07T15:54Z
 */
function GithubUploader(data,settings){
  function getSHA(settings){
    var endpoint=(
      "https://api.github.com/repos/"+
      settings.repoOwner+"/"+settings.repoName+"/contents/"+
      encodeURIComponent(settings.uploadPath+settings.fileName)
    ),sha;
    
    sha=UrlFetchApp.fetch(endpoint,{
        "method":"GET",
        "headers":{
          "Authorization": "Basic "+Utilities.base64EncodeWebSafe(("username:"+settings.token), Utilities.Charset.UTF_8)
        }
    }).getContentText('utf-8')
    
    return JSON.parse(sha).sha
  }
  var endpoint=(
    "https://api.github.com/repos/"+
    settings.repoOwner+"/"+settings.repoName+"/contents/"+
    encodeURIComponent(settings.uploadPath+settings.fileName)
  ),fetchResult;
  
  try{
    Logger.log(Utilities.base64Encode(data, Utilities.Charset.UTF_8))
    fetchResult=UrlFetchApp.fetch(endpoint,{
      "method":"PUT",
      "headers":{
        "Content-Type": "application/json",
        "Authorization": "Basic "+Utilities.base64EncodeWebSafe(("username:"+settings.token), Utilities.Charset.UTF_8)
      },
      "payload":JSON.stringify({
        "message":("網站:"+settings.siteName+",上傳時間:"+new Date().toString()+",專案:"+settings.scriptProjectName),
        "content":Utilities.base64Encode(data, Utilities.Charset.UTF_8),
        "commiter":{
          "name":(settings.siteName+"Github上傳機器人(using Google App Script,Github Uploader by 張睿玹)"+new Date()),
          "email":""
        },
        "sha":getSHA(settings)
      }),
      "muteHttpExceptions":true
    }).getContentText('utf-8')
  }catch(e){
    fetchResult="__ERROR__: "+e.message
  }
  return fetchResult
}
