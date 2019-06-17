var config = {
	bundles_version:24,
	bundles_url:"https://fsport.website.yandexcloud.net/fsport_2019_05_22/static/bundles/{0}?v=24",
	track_info_url:"https://fsport.website.yandexcloud.net/fsport_2019_05_22/static/tracks_data/track_{0}.bytes?v=24",
	rs:"https://fsport.website.yandexcloud.net/fsport_2019_05_22/static/rs.bytes?v=24", 
}
function getConfig() {
	 SendMessage("Main Camera", "GetConfigCallback",JSON.stringify(config));
}