var config = {
	bundles_version:27,
	bundles_url:"https://fsport.website.yandexcloud.net/fsport_2019_07_28/static/bundles/{0}?v=27",
	track_info_url:"https://fsport.website.yandexcloud.net/fsport_2019_07_28/static/tracks_data/track_{0}.bytes?v=27",
	rs:"https://fsport.website.yandexcloud.net/fsport_2019_07_28/static/rs.bytes?v=27", 
}
function getConfig() {
	 SendMessage("Main Camera", "GetConfigCallback",JSON.stringify(config));
}