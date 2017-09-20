# An Informal Guide to Web Publications

## Introduction

What is a publication? 

A web publication is not a single thing, but rather a loose collection of behaviors which, taken together, make it easier for users to read long, possibly complex documents. 

Two things make web publications different from the “ordinary” web we know and love. One is that a web publication may consist of multiple resources that form a logical whole. Moby-Dick could consist of 136 HTML files in a specified order, but it’s still a single work. So searching should search all 136 chapters.

More importantly, users have a set of expectations about how such content should be presented in order to make it easy to read and understand. Users need to personalize the presentation, using the font and font size that make it easiest for them to read. They want it to be easy to go to the next chapter without interrupting the reading experience by hunting for a link to click. They might need a high- or low-contrast version of the content. They want to read while offline.

Thus the goal of web publications is to provide the information necessary to provide these features ("affordances") to readers. We hope that someday browsers will provide these features, but in the meantime we have to use scripting. That's OK, because we'll learn a lot from trying, and that will help the spec get better.


## Manifest & Metadata

We must answer two fundamental questions about any given web publication:

1. What are the pieces?

2. How do the pieces fit together? Do some of the pieces have to be in a certain order?

A "manifest" is a list of the passengers or cargo on a ship. We need a list of the components of a web publication--all the HTML files, stylesheets, images, scripts, etc. needed to create the whole. We also need a special list of the files that go in a particular order. In EPUB we called this the "spine". 

In order to placate the web developers who seemingly rule the world, the manifest is expressed as a JSON file. The manifest is also a natural location for metadata that applies to the whole publication, rather than just one of the components. 

Here's a simple example, for a tiny version of "Moby-Dick" with only three HTML files:

```json
{
	"kind": "📖",
	"name": "Moby-Dick",
	"lang": "en-US",
	"locator": "https://dauwhe.github.io/MobyDickNav/",
	"address": "https://dauwhe.github.io/MobyDickNav/",
	"identifier": "urn:uuid:5740a60e-8da1-11e7-bb31-be2e44b06b34",
	"main": ["index.html", "html/c001.html", "html/c002.html", "html/c003.html"],
	"resources": ["css/mobydick.css", "js/shim.js"],
	"contents": "https://dauwhe.github.io/MobyDickNav/"
}

```

Let's take a look at the various "members" of the manifest.

Issue: why does web app manifest use the word "members"?

### 1. Kind

Our first requirement is to identify our publication as a web publication. We can use the book emoji, or the simpler-to-type `book`. 

### 2. Name

We use "name" to be compatible with [Web Application Manifest](https://www.w3.org/TR/appmanifest/)

### 3. Lang

This is the language of the manifest. 

Issue: Should this be the language that any user interface for the book is presented in?

Issue: What about multi-language publications?

### 4. Locator

This is the URL of the Web Publication itself, wherever it may be currently hosted. It's like if you went off to college, and this is your local address.

### 5. Address

This is the original, permanent address of the web publication. It may be the same as `locator`. 

### 6. Identifier

A unique identifier for the web publication. This might be an ISBN or other non-resolvable identifeer. 

### 7. Main

This is an ordered list of the main resources in a publication, analagous to the `spine` in EPUB. 




### 8. Resources

This is a list of all the other resources that are a part of the publication. No need to list `main` resources again.

Note: These resources could be HTML documents, if they are not part of a "default reading order".

### 9. Contents

This lists the URL of the publication's table of contents (i.e. `nav` file). 


## Installing a web publication





## Navigation

Navigation is critical for accessing and understanding the components of a web publication. A web publication **should** have a table of contents, with a `nav` element which includes entries for at least all main resources.

## Content Model

Whatever works on the web. 

## Synchronized media 


## Implementation issues
### Local storage
### Service workers
	
## Scripting

	Defer; unknown if this will be needed (maybe in PWP or EPUB4)

## Page transition
	Defer; unknown if this will be needed
	
## Personalization [Mateus]
	User to reading environment
	Author to reading environment
	
## Security


### Scripting

## Privacy

## Archiving










