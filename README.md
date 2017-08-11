# Web Publications TOC Explainer

This is a straw-man proposal to use the HTML ```nav``` element to bind together web resources into a publication. Think of this as commentary on the ongoing work of the W3C Publishing Working Group, as it happens in the [Web Publications Repo](https://www.github.com/w3c/wpub)


## What is a web publication?

A web publication is a collection of web resources, treated as a single work, which meets user expectations of readability, personalization, simplicity, accessibility, ubiquity, and unity:

1. I can navigate through the publication without clicking links. (Controversial!)
2. If I leave the publication and go back later, the browser remembers where I was.
3. If I search on the page, the scope of the search is the entire web publication.
4. I can always access the table of contents from the current page.
5. I can share the Web publication’s URL.
6. I can read the publication while offline.
7. I can annotate the publication.
8. I can easily change the font, font size, theme, etc.

## The abstract manifest

An abstract manifest is the set of information necessary for a user agent to process and present a web publication.

### Information in the abstract manifest

#### 1. Title

This identifies the title of the web publication, which can be distinct from any titles associated with the constituent resources.

#### 2. Identifier

A unique identifier for the web publication. The identifier chosen will likely differ across use cases—for example, book publishers would likely use ```urn:isbn```. 

#### 3. List of Primary Resources

An abstract manifest must provide a list of primary resources, and the default ordering of those resources. 

#### 4. Metadata

An abstract manifest must provide a way to associate metadata with a web publication. Any particular piece of metadata is, however, optional.

#### 5. “Publication-ness”

An abstract manifest must indicate to a user agent that it represents a web publication. 




## Proposed implementation of the abstract manifest concept


How do we bind this collection of resources together? We need a list of the primary resources, with a default order. That’s an ordered list of URLs, which can be semantically represented by the HTML ```nav``` element.

Define the URL of a web publication to be the URL of this “index” resource which contains the ```nav```. 

## Motivations

Why HTML? Why ```nav```?

1. Ease of authoring. HTML is the lingua franca of the web. We shouldn’t require an author to learn JSON to do something that HTML can do.

2. Accessibility. WCAG requires [multiple ways](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-mult-loc) to navigate multi-document web sites. A table of contents is a [primary way](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G64) to provide such navigation, and is available to assistive technology. CSS can help clarify the document structure, or help personalize for users (for example, providing high- or low-contrast options). 

3. Fallback behaviour. A user agent unfamiliar with web publications would have no idea what to do with a JSON file. But a user can point their browser at an HTML file, and the browser can render it. Even if no new features of web publications are implemented in that browser, or shimmed, the user can read the publication. 



## Rules

1. A web publication must have an “index” resource containing a ```nav``` element.
2. The primary publication resources must be referenced in this ```nav``` element, in the default order.
3. These URLs must be available (in the CORS sense) to the origin of the index resource. 
4. The title of the index resource is the title of the web publication. If the title is absent, @dauwhe and @bigbluehat will come after you. 
5. The URL of the index resource is the URL of the web publication.
6. Constituent resources should have a ```rel=contents``` link to the index resource.
7. Constituent resources should have ```rel=prev``` and ```rel=next``` links as appropriate.
8. The index resource must have an 📖 attribute on the ```html``` element, to identify it as a web publication. The attribute may also be serialized as the text string ```book```. 

## Examples

See [Moby-Dick](https://dauwhe.github.io/zero-labs/MobyDickNav/MobyDickNav.html).

```html
<!DOCTYPE html>
<html 📖 lang="en">
  <head>
    <title>Moby-Dick</title>
    <meta charset="utf-8">
  </head>
  <body>
    <main>
        <nav role="doc-toc">
          <ol>
            <li><a href="html/c001.html">Loomings</a></li>
            <li><a href="html/c002.html">The Carpet-Bag</a></li>
            <li><a href="html/c003.html">The Spouter-Inn</a></li>
            <li><a href="html/c004.html">The Counterpane</a></li>
          </ol>
        </nav>
     </main>
  </body>
</html>

```

## Accessibility

One reason for focusing on ```nav``` as the glue that holds a publication together is because of the need for a table of contents that is available to humans and assistive technology, and that supports the visual nuance provided by CSS, and the internationalization features of HTML. 


## Offline

Service workers can allow offline reading of web resources. Script can easily create a list of primary resources to pass to a service worker, but obtaining a list of secondary resources is more problematic. This is where we hope for help from browsers, as authoring an exhaustive list of fonts, images, CSS files, etc. is no fun. 

## Security

Web publications are based on the [origin](https://tools.ietf.org/html/rfc6454) model of the web. In particular, a resource in a web publication should be same-origin to the index resource, or available to that origin via CORS. 

[To do: Say something intelligent about CSP.]



## Experimentation

1. One way to create a single entity out of multiple HTML documents is to use the now-deprecated HTML Imports. We hope that some similar mechanism will come to the web platform soon, but there is still support (and a polyfill) for HTML imports. 
2. Shadow DOM might be useful for two things. One is encapsulating styles of imported components. It might also [help allow authors](https://tabatkins.github.io/specs/css-shadow-parts/) to expose hooks for readers to personalize publications, while still retaining control of certain critical design elements. 

## The State of the Art

We’ve drawn inspiration from Jeremy Keith’s [Resilient Web Design](https://resilientwebdesign.com). This book is a beautiful example of a "bookish" experience on the web now, with good use of link relations, simple design, and beautifully clear, semantic HTML. The subject of the book is also on-topic. 

