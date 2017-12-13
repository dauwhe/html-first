# Web Publications TOC Explainer

We propose to use the HTML `nav` element to bind together web resources into a web publication. Such a publication is characterized by an ordered list of links, and HTML is well suited to create such a list that is understandable by both human readers and machines. Basing web publications on a table of contents allows for easy authoring, a natural upgrade path from existing web books and EPUBs, avoids duplication, helps meet accessibility and usability requirements, and is functional with today’s web.


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


## Humans and Machines, Internal and External

The html nav element is a good way to describe a default reading order, but is not suited for listing secondary resources. Having an external JSON file is convenient for machine-processing of this information. This could also provide an alternate location for publication-wide metadata.



## Rules

1. A web publication must have an “index” resource containing a `nav` element, unless there's only a single primary resource. 
2. The primary publication resources must be referenced in this `nav` element, in the default order. 
3. There may be other `nav` elements in the index document. This proposal only covers the first, in document order. The document author may decide not to display the first `nav`, if they wish to present a different navigation structure to the user.
4. These URLs must be available (in the CORS sense) to the origin of the index resource. 
5. The title of the index resource is the title of the web publication. If the title is absent, @dauwhe and @bigbluehat will come after you. 
6. The URL of the index resource is the URL of the web publication.
7. Constituent resources should have a `rel=contents` link to the index resource.
8. Constituent resources should have `rel=prev` and `rel=next` links as appropriate.
9. The index resource must have an 📖 attribute on the `html` element, to identify it as a web publication. The attribute may also be serialized as the text string `book`.

## Examples

### Simple Code Example


#### HTML `nav` file

```html
<!DOCTYPE html>
<html 📖 lang="en">
  <head>
    <title>Moby-Dick</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="next prefetch" href="html/c001.html">
    <link rel="publication" href="manifest.json">
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

#### JSON manifest

```json

{
  "metadata": {
    "creator": "Herman Melville",
    "publisher": "Harper and Row"
  },

  "resources": [
    {
      "href": "html/c001.html",
      "type": "text/html"
    },
    {
      "href": "html/c002.html",
      "type": "text/html"
    },
    {
      "href": "html/c003.html",
      "type": "text/html"
    },
    {
      "href": "html/c004.html",
      "type": "text/html"
    },
    {
      "href": "css/MobyDick.css",
      "type": "text/css"
    },
    {
      "href": "Moby_Dick_final_chase.jpg",
      "type": "image/jpeg"
    },
    {
      "href": "Moby_Dick_p510_illustration.jpg",
      "type": "image/jpeg"
    },
    {
      "href": "moby-dick-book-cover.jpg",
      "type": "image/jpeg"
    }
  ]
}

```

### Demo Books

1. [Moby-Dick](https://dauwhe.github.io/html-first/MobyDickNav/index.html).

2. [The Theory of Heat Radiation](https://dauwhe.github.io/html-first/HeatRadiation). This book includes MathML, and has a nested table of contents to indicate the Part/Chapter structure. Note that this poses no problems for the TOC model of declaring primary resources and their order. Thanks to [Infogrid Pacific](http://www.infogridpacific.com) for the files.

In these current demos, a [Service Worker](https://w3c.github.io/ServiceWorker/v1/) (SW) enables offline reading. It caches secondary resources (CSS, scripts, images, fonts referenced from CSS) without having an explicit list! This is done by loading each primary resource reference in the ToC into hidden `iframe`s to allow the SW to cache the requests as they come in.

The current [Service Worker code](sw.js) uses the [`stale-while-revalidate` pattern](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)--meaning, every request is pulled from cache first (if available) and then the network is checked for updates. This provides the "webby-ist" experience for the author (readers eventually get updates as they browse/page-through the text). However, there are certainly other caching and updating patterns to consider and explore.

To run the demos locally, we recommend [http-server](https://www.npmjs.com/package/http-server) with server-side caching shut off:
```sh
$ npm i -g http-server
$ http-server . -c-1
```

## The State of the Art

We’ve drawn inspiration from Jeremy Keith’s [Resilient Web Design](https://resilientwebdesign.com). This book is a beautiful example of a "bookish" experience on the web now, with good use of link relations, simple design, and beautifully clear, semantic HTML. The subject of the book is also on-topic.

## Frequently Asked Questions

> What about Web Application Manifest?

We consider this to be orthogonal to Web App Manifests. If you wish to have “save to homescreen” functionality, by all means use it.

> What about metadata?

The web already has numerous ways of including metadata in HTML documents. All we’re proposing is a convention that metadata in this "index" document applies to the entire web publication. The PWG can decide which method(s) will be used by WPs, or leave it to the web.

> What about secondary resources?

With both of our demo books, we’ve been able to cache secondary resources (including fonts referenced from CSS) without having a list of such resources. Such a list is a burden on authors. But many machine-processing scenarios, as well as use cases outside the browser (such as reading systems) may benefit from a machine-optimized list of such resources. Hence we've added an optional JSON manifest.

> HTML requires a non-empty title element.

Feature, not bug.





## Feedback

[Web Publications](https://www.github.com/w3c/wpub) are being discussed by the W3C Publishing Working Group.
