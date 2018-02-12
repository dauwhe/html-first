# Moby-Dick (sans JS)

Just how far can Moby-Dick make it through the ocean of publication without JS?

This demo uses:
 - CSS Grid (for overall layout): nav on left; content on right
 - `<base target="content">` + `<iframe name="content">` to load all links into content frame
 - nav items with a `name` attribute can be referenced (though not loaded) via fragment identifiers
 - `document.anchors` is populated with the above nav items--both linearly and as named items

## Almost...

Had `<iframe seamless>` not been taken out of HTML5, then the publication's "entry page" could have held and managed the styles for the entire book--now they must be referenced from each document.

## Sadly...

We still need JS to:
 - store publication progression state (how far along we are in the book)
 - load the right resource based on fragement usages
 - offline the publication
