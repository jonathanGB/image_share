Images = new Mongo.Collection("images");

// set up security
Images.allow({
	insert: function(userId, doc) {

		if (Meteor.user()) {
			if (userId != doc.createdBy)
				return false;
			else if (doc.img_src && doc.img_alt)
				return true;
		}

		return false;
	},

	remove: function(userId, doc) {
		if (userId != doc.createdBy)
			return false;
		
		return true;
	}
});