// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function getProducts(req, res) {
	let agrupation = 4;
	let concept = 0;
	var array = [];
	var category = [];
	let shareCode = "1b92NcpkSSB1C4NnUbqHAW61ubT-d3QzlXggN-OZI9Eo"; //CODE from URL https://docs.google.com/spreadsheets/d/1b92NcpkSSB1C4NnUbqHAW61ubT-d3QzlXggN-OZI9Eo/edit#gid=0
	let API_KEY = "AIzaSyDjtyy3dlt4fCbx1p-zWIinokycevZJGUg";
	let sheetName = "MASTER";

	fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${shareCode}/values/${sheetName}?alt=json&key=${API_KEY}`
	)
		.then((response) => response.json())
		.then((data) => {
			for (var i = 0; i < data.values.length; i++) {
				array.push({
					id: data.values[i][0],
					name: data.values[i][2],
					description: data.values[i][3],
					price: data.values[i][4],
				});

				category.push(data.values[i][1]);
				// brandsArray.push(data.values[i][9]);
			}

			res.send(
				JSON.stringify([
					array,
					category.filter((v, i, a) => a.indexOf(v) === i),
					// brandsArray.filter((v, i, a) => a.indexOf(v) === i),
				])
			);
		});
}
