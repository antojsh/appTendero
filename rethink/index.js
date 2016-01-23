var r = require('rethinkdb');
var db={
	createTable: function (tableName,model) {
		r.db('test').tableCreate(tableName).run(connection, function (err, result) {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		})
	},
	insertRow: function(tableName, model,res) {
	     r.table(tableName).insert(model).run(connection, function (err, result) {
	         if (err) throw err;
	         console.log("insertRow" +JSON.stringify(result, null, 2));
	         db.getRows(tableName)
	         res(err);
	     })
	     

 	},
 	getRows:function(tableName) {
     r.table(tableName).run(connection, function (err, cursor) {
         if (err) throw err;
         cursor.toArray(function (err, result) {
             if (err) throw err;
             console.log("getRows" +JSON.stringify(result, null, 2));
         });
     });
 }

}
module.exports= db