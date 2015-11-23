Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Template.images.helpers({images: Images.find({}, {sort: {createdOn: -1, rating: -1}})});

  Template.images.events({
    'click .js-image': function(event) {
      $(event.target).parents('.image-container').slideUp();
    },
    'click .js-del-image': function(event) {
      var image_id = this._id;

      $(event.target).parents('.image-container').slideUp('slow', function() {
        Images.remove({_id: image_id});
      });
    },
    'click .js-rate-image' : function(event) {
      var userRating = $(event.currentTarget).data("userrating");

      Images.update({_id: this['data-id']}, {$set: {rating: userRating}});
    },
    'click button.js-show-image-form': function(event) {
      $('#image_add_form').modal('show');
    }
  });

  Template.image_add_form.events({
    'submit form.js-add-image': function(event) {
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;

      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdOn: new Date()
      });

      $('#image_add_form').modal('hide');

      event.preventDefault();
    }
  });
}
