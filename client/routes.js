Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
  	to: "header"
  });
});

Router.route('/images', function() {
  this.render('welcome', {
  	to: "header"
  });

  this.render('images', {
  	to: "main"
  });
});

Router.route('/image/:_id', function() {
  this.render('welcome', {
  	to: "header"
  });

  this.render('image', {
  	to: "main",
  	data: function() {
  		return Images.findOne({_id: this.params._id});
  	}
  });
});