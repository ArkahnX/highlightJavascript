/**
 * multifile optomization script
 */
// ({
// 	appDir: "source/",
// 	baseUrl: "./",
// 	dir: "build",
// 	modules: [{
// 		name: "main",
// 		include: ["test", "requires"]
// 	}],
// 	wrap: {
// 		startFile: "fragments/start.frag",
// 		endFile: "fragments/end.frag"
// 	},
// 	keepBuildDir: false,
// 	locale: "en-us",
// 	optimize: "uglify",
// 	uglify: {
// 		quote_keys: true,
// 		except: []
// 	},
// 	removeCombined: true,
// 	findNestedDependencies: true,
// 	optimizeCss: "standard",
// 	inlineText: true,
// 	useStrict: true,
// 	skipModuleInsertion: true,
// })
/**
 * single file optomization script
 */
({
	baseUrl: "./source/",
	name: "setup",
	include: ["functions","helper","error"],
	out: "build/highlightJavascript.js",
	wrap: {
		startFile: "source/fragments/start.frag",
		endFile: "source/fragments/end.frag"
	},
	keepBuildDir: false,
	locale: "en-us",
	optimize: "uglify",
	uglify: {
		quote_keys: true,
		except: []
	},
	findNestedDependencies: true,
	optimizeCss: "standard",
	inlineText: true,
	useStrict: true,
	skipModuleInsertion: true,
})