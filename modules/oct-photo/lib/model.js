
var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema;

/*
* Request
* 1. Create album for user id
* 2. Put photo to the album
* 3. Get all albums
* 4. Get all photos in the album
* 5. Get comments on the photo
* 6. Get likes of the photo
* 7. Get likes of all photo of the album (likes on album)
*/
var AlbumSchema = new Schema({
	owner: {type: Schema.Types.ObjectId, required: true },
	name: {type: String, unique: true },
	description: {type: String},
	date: {type: Date, default: Date.now},
	photos: [
		{
			name: {type: String},
			description: {type: String},
			path: {type: String},
			date: {type: Date, default: Date.now},
			likes: [
				{
					login: { type: String },
					link: { type: String },
					id: { type: Schema.Types.ObjectId }
				}
			],
			comments: [
				{
					login: { type: String },
					link: { type: String },
					id: { type: Schema.Types.ObjectId },
					text: { type: String }
				}
			]
		}	
	]
}); 
AlbumSchema.index(
{
  owner: 1, name: 1
}, 
{
	unique: true
});
mongoose.model('Album', AlbumSchema);