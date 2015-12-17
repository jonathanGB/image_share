 Session.set("imageLimit", 2);
  lastScroll = 0;

  $(window).scroll(function(event) {
    var currHeight = window.scrollY;

    if (currHeight > lastScroll && currHeight + $(window).height() >= $(document).height()) { // if reaching bottom of page (infinite scroll feature)
      console.log("mo' images loaded!");
      Session.set("imageLimit", Session.get("imageLimit") + 2);
      lastScroll = currHeight;
    }
  });

  Template.images.helpers({
    images: function() {
      if (Session.get("userFilter")) {
         return Images.find(
          {createdBy: Session.get("userFilter")}, {sort: {createdOn: -1, rating: -1}
        });
      }

      return Images.find(
        {}, {sort: {createdOn: -1, rating: -1}, limit: Session.get("imageLimit")
      });
    },

    getUser: function(user_id) {
      var user = Meteor.users.findOne({_id: user_id});
      
      if (user)
        return user.username;
      else
        return "anon";
    },

    filteringImages: function() {
      if (Session.get("userFilter"))
        return true;

      return false;
    },

    getFilterUser: function() {
      var user = Meteor.users.findOne({
        _id: Session.get("userFilter")
      });
      
      if (user)
        return user.username;
      else
        return "anon";
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  Template.body.helpers({
    username: function() {
      if (Meteor.user())
        return Meteor.user().username;
      else
        return "anon";
    }
  });

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
    },
    'click a.js-set-image-filter': function(event) {
      Session.set("userFilter", this.createdBy);
      event.preventDefault();
    },
    'click a.js-unset-image-filter': function(event) {
      Session.set("userFilter", undefined);
      event.preventDefault();
    }
  });

  Template.image_add_form.events({
    'submit form.js-add-image': function(event) {
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;

      if (Meteor.user()) {
        Images.insert({
          img_src: img_src,
          img_alt: img_alt,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        });
      }

      $('#image_add_form').modal('hide');

      event.preventDefault();
    }
  });