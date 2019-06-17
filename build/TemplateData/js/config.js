var config = {
	bundles_version:27,
	bundles_url:"https://xsportgame.github.io/racing_static/static/bundles/{0}?v=27",
	track_info_url:"https://xsportgame.github.io/racing_static/static/tracks_data/track_{0}.bytes?v=27",
	rs:"https://xsportgame.github.io/racing_static/static/rs.bytes?v=27", 
};
function getConfig() {
	 SendMessage("Main Camera", "GetConfigCallback",JSON.stringify(config));
}