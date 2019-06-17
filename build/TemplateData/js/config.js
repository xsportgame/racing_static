var config = {
	bundles_version:25
	bundles_url:"https://xsportgame.github.io/racing_static/static/bundles/{0}?v=25",
	track_info_url:"https://xsportgame.github.io/racing_static/static/tracks_data/track_{0}.bytes?v=25",
	rs:"https://xsportgame.github.io/racing_static/static/rs.bytes?v=25", 
}
function getConfig() {
	 SendMessage("Main Camera", "GetConfigCallback",JSON.stringify(config));
}