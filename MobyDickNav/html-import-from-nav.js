function handleLoad(e) {
  //  console.log("Loaded import: " + e.target.href);
    var content = e.import;
 //   console.log(content);
     var el = content.querySelector("main");
            document.body.appendChild(el);
  }
  function handleError(e) {
    console.log("Error loading import: " + e.target.href);
  }
  var importDoc = document.currentScript.ownerDocument;

  var spine = importDoc.querySelectorAll("nav[role='doc-toc'] a");

      for (var spineItem of spine) {
      var link = document.createElement("link");
          link.rel = "import";
          link.href = spineItem.href;
          document.head.appendChild(link);
          };

          window.addEventListener("HTMLImportsLoaded", function() {
  var existingLinks = importDoc.querySelectorAll("link[rel='import']");

        for (var link of existingLinks) {

            var content = link.import;
       //     console.log(link.import);
            var el = content.querySelector("main");
            document.body.appendChild(document.importNode(el, true));
};

});