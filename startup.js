if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {

      for (var i = 0; i < 3; i++) {
        Images.insert(
          {
            img_src: "img_".concat(i, ".jpg"),
            img_alt: "funny image",
          }
        );
      }
    }
  });
}
