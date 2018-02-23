# stumpfi

One doc format to rule them all.


## Usage

```bash
yarn add stumpfi
```


## Development

```bash
yarn run start
yarn run test
yarn run build
yarn run doc
```



## Why stumpfi ?

The idea came when I was working in the company I co-founded. I made four main statements, that are especially true for office apps :

1. There is a large quantity of documents formats that exist, some of them having the same purpose, and each software handles one or more of those formats. This makes software interoperability very tough and unefficient, and reusing contents from one app to another can be a nightmare.

2. Some apps provide features to convert from one format to another to achieve interoperability, but this can generate some information loss due to each format specifications (e.g. converting an HTML document to PDF inevitably results in a less-rich document).

3. Most of the file formats are whether too simple and thus not extensible for more advanced uses, or super-heavy and unmanageable because they try to handle all the possible usecases using a specific syntax (Microsoft's OOXML format for instance, mixes content and graphic effects into a bloated XML structure defined by a roughly 5000 pages spec document).

4. Directly related to the precedent statement, those file formats are insanely hard to modify programmatically, or even to visualize, and getting started with them is over complicated. Documentation does not always exist, or APIs are way too complex. This is why proprietary libraries or softwares are used for this purpose.



## Yet another doc format ?

Yes and no. Stumpfi is both a file structuration pattern and and API to manipulate it. Technically, I didn't invent anything : it is just a basic web file that can contain HTML, CSS, Javascript, and any other stuff you can usually find in a web page. I just designed it in order to ensure it has the following properties :

- Content / form dissociation (thank to HTML / CSS)
- Duplicated contents suppression (and thus storage saving)
- Softwares interoperability
- Native support from any OS (you don't need any special app to visualize your document since HTML is natively supported on every OS)
- Simplicity, with a very basic file structuration and a tiny universal API to manipulate it
- Reusability / capitalization of contents, from one app to another
- Extensibility / future proof (since it only uses web technologies)



## Caveat

This doc format is not meant to replace every format that exists. For instance, you won't be able to encode an image, a song, or create a 3D model with stumpfi. It is just particularly useful when creating documents that manipulate basic contents such as videos, songs, images, text, ... (e.g. office apps).



## Contributing

To come.



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 - present, Matthieu Jabbour.
