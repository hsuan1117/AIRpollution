/*
 * AIRpollution 空氣汙染外掛 
 * 張睿玹版權所有
 * https://github.com/dwcoop/AIRpollution/license.html
 * 文件: index.gs(後端)
 * 版本: V1.0.2-TW
 * 日期: 2019-06-29T22:27Z
 */
var AIRpollution_backendSettings = {
	"API_pollutionURL": "https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json&callback=AIRpollution_serverCallback",
	"githubSettings": {
		repoOwner: "",
		repoName: "",
		uploadPath: "",
		scriptProjectName: "",
		fileName: "AIRpollution-data_zh-TW.js",
		siteName: "",
		token: "",
		branch: "data"
	},
	"gitlabSettings": {
		siteName: "",
		uploadPath: "",
		fileName: "AIRpollution-data_zh-TW.js",
		uploadBranch: "",
		scriptProjectName: "",
		repoId: "",
		token: ""
	}
}

function getData() {
	var AIRdata = UrlFetchApp.fetch(AIRpollution_backendSettings.API_pollutionURL, {
		"method": "GET"
	}).getContentText('utf-8');
	var result = GithubUploader(
		("/*Auto Update by Google App script , gen time :" + new Date() + "*/" + AIRdata),
		AIRpollution_backendSettings.githubSettings
	)
	Logger.log(result)
}

function setTrigger() {
	ScriptApp.newTrigger("空汙每小時更新資料")
		.timeBased()
		.everyHours(1)
		.create();
}
