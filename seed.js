export default (db) => {
	db.save('sayans-saga', {
		characters: [
	      	{
		        name: "Nappa",
		        race: "Sayan",
		        power: 7000
	    	},
	    	{
		        name: "Krillin",
		        race: "Human",
		        power: 2000
	    	},
	    	{
		        name: "Chi-Chi",
		        race: "Human",
		        power: 130
	    	},
	    	{
		        name: "Bulma",
		        race: "Human",
		        power: 12
	    	},
	    	{
		        name: "Majin Buu",
		        race: "Pink Child-like Blob",
		        power: 1150000000
	    	}
	    ]
  	}, (err, res) => {
      	if (err) {
          console.log("err:", err)
      	} else {
          console.log("==> ✅  Seeded!")
      	}
    })
}