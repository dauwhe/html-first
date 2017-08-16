# Web Publications TOC Explainer

We propose to use the HTML `nav` element to bind together web resources into a web publication. Such a publication is characterized by an ordered list of links, and HTML is ideally suited to create such a list that is understandable by both human readers and machines. Basing web publications on a table of contents allows for easy authoring, a natural upgrade path from existing web books and EPUBs, avoids duplication, helps meet accessibility and usability requirements, and is functional with today’s web.


## What is a Web Publication?

>A [Web Publication](https://w3c.github.io/wpub/) is a collection of one or more primary resources, organized together through a manifest into a [single logical work](http://w3c.github.io/dpub-pwp-ucr/index.html#single) with a default reading order. The Web Publication is uniquely identifiable and presentable using Open Web Platform technologies.

Note that a “manifest” is just the set of information necessary for a user agent to process and present a web publication:


1. **Title**. This identifies the title of the web publication, which can be distinct from any titles associated with the constituent resources.

2. **Identifier**. A unique identifier for the web publication. The identifier chosen will likely differ across use cases—for example, book publishers would likely use `urn:isbn`.

3. **Language**. What is the language of the collection of resources?

4. **List of Primary Resources**. We must provide a list of primary resources, and the default ordering of those resources.

5. **Identity as a Web Publication**. We must indicate to a user agent that this collection of resources represents a web publication.

6. **Metadata**. We should provide a way to associate metadata with a web publication. Any particular piece of metadata is, however, optional.




## How and Why?


How do we bind this collection of resources together? We need a list of the primary resources, with a default order. That’s an ordered list of URLs, which can be semantically represented by the HTML `nav` element. Define the URL of a web publication to be the URL of this “index” resource which contains the `nav`.


```html
<nav role="doc-toc">
  <ol>
    <li><a href="html/c001.html">Loomings</a></li>
    <li><a href="html/c002.html">The Carpet-Bag</a></li>
    <li><a href="html/c003.html">The Spouter-Inn</a></li>
    <li><a href="html/c004.html">The Counterpane</a></li>
  </ol>
</nav>
```

But why HTML? Why `nav`?

1. **Design for humans**. User agents need to know the primary resources and their default ordering, but so do human readers. Just seeing a list of URLs is not enough; one needs human-readable text describing those URLs. This is the heart of a table of contents—describe the contents and the location both.

2. **Make authoring easy**. HTML is the lingua franca of the web, a language we already know. It’s easy to find tools and syntax checkers. It’s easy to see what you’re doing, even with tricky things like nesting lists (and yes, good tables of contents are often hierarchical).

3. **Don’t repeat yourself**. [“Every piece of knowledge must have a single, unambiguous, authoritative representation within a system”](https://en.wikipedia.org/wiki/Don't_repeat_yourself). Separating the human-readable table of contents from some machine-readable means maintaining two lists of resources.

4. **Web publications for all**. One reason for focusing on `nav` as the glue that holds a publication together is because of the need for a table of contents that is available to humans and assistive technology, and that supports the visual nuance provided by CSS, and the internationalization features of HTML. WCAG requires [multiple ways](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-mult-loc) to navigate multi-document web sites. An HTML table of contents is a [primary way](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G64) to provide such navigation, and is available to assistive technology. CSS can help clarify the document structure, or help personalize for users (for example, providing high- or low-contrast options). WCAG also requires title and language information, which fit naturally in HTML.

5. **Web publications everywhere**. HTML and CSS can express most of the world’s scripts and languages.

6. **Progressive enhancement**. Basing web publications on `nav` allows existing user agents to make web publications functional, and provides an easy path from existing content which has tables of contents (for example, every EPUB3 in the world). A user can point their browser at an HTML file, and the browser can render it. Even if no new features of web publications are implemented in that browser, or shimmed, the user can read the publication.



## Rules

1. A web publication must have an “index” resource containing a `nav` element.
2. The primary publication resources must be referenced in this `nav` element, in the default order.
3. These URLs must be available (in the CORS sense) to the origin of the index resource. 
4. The title of the index resource is the title of the web publication. If the title is absent, @dauwhe and @bigbluehat will come after you. 
5. The URL of the index resource is the URL of the web publication.
6. Constituent resources should have a `rel=contents` link to the index resource.
7. Constituent resources should have `rel=prev` and `rel=next` links as appropriate.
8. The index resource must have an 📖 attribute on the `html` element, to identify it as a web publication. The attribute may also be serialized as the text string `book`.

## Examples

### Simple Code Example

```html
<!DOCTYPE html>
<html 📖 lang="en">
  <head>
    <title>Moby-Dick</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="next prefetch" href="html/c001.html" />
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

### Demo Books

1. [Moby-Dick](https://dauwhe.github.io/html-first/MobyDickNav/index.html).

2. [The Theory of Heat Radiation](https://dauwhe.github.io/html-first/HeatRadiation). This book includes MathML, and has a nested table of contents to indicate the Part/Chapter structure. Note that this poses no problems for the TOC model of declaring primary resources and their order. 

A [Service Worker](https://w3c.github.io/ServiceWorker/v1/) enables offline reading. Note that it caches secondary resources (CSS, scripts, images, fonts referenced from CSS) without having an explicit list!

To run the demos locally, we recommend [http-server](https://www.npmjs.com/package/http-server) with server-side caching shut off:
```sh
$ npm i -g http-server
$ http-server . -c-1
```

## The State of the Art

We’ve drawn inspiration from Jeremy Keith’s [Resilient Web Design](https://resilientwebdesign.com). This book is a beautiful example of a "bookish" experience on the web now, with good use of link relations, simple design, and beautifully clear, semantic HTML. The subject of the book is also on-topic.

## Feedback

[Web Publications](https://www.github.com/w3c/wpub) are being discussed by the W3C Publishing Working Group.
