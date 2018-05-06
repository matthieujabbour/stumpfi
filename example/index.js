const fs = require('fs');
const path = require('path');
const stumpfi = require('stumpfi');
const stumpfi_io = require('stumpfi-io');

// Creating a new stumpfi document...
const myDocument = new stumpfi.Document('myDocument', 'My first stumpfi document !');

// Adding meta informations...
myDocument.addAuthor('matthieujabbour');
myDocument.addTag('first');
myDocument.addTag('stumpfi');
myDocument.addTag('document');

// Adding basic layout...
const layoutStyle = new stumpfi.Resource('style');
layoutStyle.setContent('body {position: relative; margin: 0; paddin: 0; width: 100%; height: 100%; background:#999999;} .stumpfi.page{ width: 100%; height: 100%; position: relative; margin: 10px auto;}');
myDocument.addResource(layoutStyle);


// Creating templates that will be used by components...
const headerTemplate = new stumpfi.Template('<p class="stumpfi-header"><span>{{SIMPLE_TEXT}}</span></p>');
const footerTemplate = new stumpfi.Template('<p class="stumpfi-footer"><span>{{SIMPLE_TEXT}}</span></p>');
const titleTemplate = new stumpfi.Template('<p class="stumpfi-title"><span>{{SIMPLE_TEXT}}</span></p>');
const videoTemplate = new stumpfi.Template('<iframe style="width: 100%; height: 100%" src="{{MEDIA}}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
const tweetTemplate = new stumpfi.Template('<iframe style="width: 100%; height: 100%" src=https://twitframe.com/show?url={{MEDIA}}" frameborder="0"></iframe>');
const gistTemplate = new stumpfi.Template('<script src="{{MEDIA}}"></script>');
const descriptionTemplate = new stumpfi.Template('<p class="stumpfi-description">{{SIMPLE_TEXT}}</p>');
const paragrapheTemplate = new stumpfi.Template('<p class="stumpfi-paragraph">{{SIMPLE_TEXT}}</p>');
const mixedTemplate = new stumpfi.Template('<img class="stumpfi-image" src="{{MEDIA}}" /><p class="stumpfi-paragraph">{{SIMPLE_TEXT}}</p><br/><br/><p class="stumpfi-paragraph">{{SIMPLE_TEXT}}</p>');
const linkTemplate = new stumpfi.Template('<p class="stumpfi-link">{{SIMPLE_TEXT}}<a href="{{MEDIA}}">{{SIMPLE_TEXT}}</a></p>');


// Creating the page master for all pages...
const pageMaster = new stumpfi.Page();

// Adding basic layout...
const pageLayout = new stumpfi.Resource('style');
pageLayout.setContent('html {background:#999999;} body{padding: 0; margin: 0 auto; background: white;}');
pageMaster.addResource(pageLayout);

// Adding page master's theme...
const pageTheme = new stumpfi.Resource('style');
pageTheme.setContent('@import url(https://fonts.googleapis.com/css?family=Exo); @import url(https://fonts.googleapis.com/css?family=Abel); @import url(https://fonts.googleapis.com/css?family=Leckerli+One); body { margin: 0 auto; } .stumpfi-footer {margin: 0;} .stumpfi-title, .stumpfi-header, .stumpfi-footer, .stumpfi-description {margin: 0; display: table; position: relative; width: 100%; height: 100%; color: white;text-align: center;font-family: \'Leckerli One\', cursive;background: #091330;} .stumpfi-title {font-size: 8em;} .stumpfi-header {font-size: 2em;} .stumpfi-footer { font-family: \'Abel\', sans-serif; font-size: 1em; } .stumpfi-title span, .stumpfi-header span, .stumpfi-footer span { display: table-cell; vertical-align: middle; } .stumpfi-description { background: none; color: black; font-size: 2em; } .stumpfi-paragraph, .stumpfi-link { font-size: 1.4em; text-align: justify; font-family: \'Exo\', sans-serif;} .stumpfi-image { width: 50%; margin: 1em 4em; float: right;} .stumpfi-link { text-align: center; }');
pageMaster.addResource(pageTheme);

// Creating page master's components...
const footer = new stumpfi.Component(footerTemplate, { h: 5, w: 100 }, { x: 0, y: 95 });
footer.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'stumpfi - MIT license'));
pageMaster.addComponent(footer);


// Creating page 1...
const page1 = new stumpfi.Page();
page1.addResource(pageTheme);
const title = new stumpfi.Component(titleTemplate, { h: 100, w: 100 }, { x: 0, y: 0 });
title.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'stumpfi'));
page1.addComponent(title);
myDocument.addPage(page1);


// Creating page 2...
const page2 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'What is stumpfi ?'));
page2.addComponent(header);
let paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 30 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'stumpfi is a brand new document format that allows you to create rich web-based documents. Thank to its universal tiny API, you can get started very quickly and create beautiful documents in minutes !'));
page2.addComponent(paragraph);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 50 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'No special software, no requirement ; anyone can read stumpfi documents on any device, as it is just standard web technologies (HTML, Javascript, CSS) :)'));
page2.addComponent(paragraph);
myDocument.addPage(page2);


// Creating page 3...
const page3 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Build classic documents...'));
page3.addComponent(header);
const mixed = new stumpfi.Component(mixedTemplate, { h: 50, w: 60 }, { x: 20, y: 30 });
mixed.setContentAt(0, new stumpfi.Content('MEDIA', 'http://thegrid.co.nz/wp-content/uploads/2014/02/01cbb01b-0a55-4a29-b4a8-ced972d9b8a4.jpg'));
mixed.setContentAt(1, new stumpfi.Content('SIMPLE_TEXT', 'Create any kind of document, from reports, presentations, documentations, to complete landing pages, with the exact same tools and framework !'));
mixed.setContentAt(2, new stumpfi.Content('SIMPLE_TEXT', 'With Templates and Page masters, never worry about style layout and formatting anymore, just focus on your content. With stumpfi, your document will always be attractive.'));
page3.addComponent(mixed);
myDocument.addPage(page3);


// Creating page 4...
const page4 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Embed everything...'));
page4.addComponent(header);
const tweet = new stumpfi.Component(tweetTemplate, { h: 75, w: 25 }, { x: 37.5, y: 20 });
tweet.setContentAt(0, new stumpfi.Content('MEDIA', 'https://twitter.com/sunwebchd/status/992621160520089600'));
page4.addComponent(tweet);
let description = new stumpfi.Component(descriptionTemplate, { h: 5, w: 50 }, { x: 25, y: 80 });
description.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '...Like a tweet !'));
page4.addComponent(description);
myDocument.addPage(page4);



// Creating page 5...
const page5 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Embed everything...'));
page5.addComponent(header);
const video = new stumpfi.Component(videoTemplate, { h: 50, w: 50 }, { x: 25, y: 25 });
video.setContentAt(0, new stumpfi.Content('MEDIA', 'https://www.youtube.com/embed/zC30BYR3CUk'));
page5.addComponent(video);
description = new stumpfi.Component(descriptionTemplate, { h: 5, w: 50 }, { x: 25, y: 80 });
description.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '...Like a Youtube video !'));
page5.addComponent(description);
myDocument.addPage(page5);


// Creating page 6...
const page6 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Embed everything...'));
page6.addComponent(header);
const gist = new stumpfi.Component(gistTemplate, { h: 50, w: 50 }, { x: 25, y: 25 });
gist.setContentAt(0, new stumpfi.Content('MEDIA', 'https://gist.github.com/matthieujabbour/aaa3d580bd4525dc8636012fef464711.js'));
page6.addComponent(gist);
description = new stumpfi.Component(descriptionTemplate, { h: 5, w: 50 }, { x: 25, y: 80 });
description.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '...Like a code snippet !'));
page6.addComponent(description);
myDocument.addPage(page6);


// Creating page 7...
const page7 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Concepts & API'));
page7.addComponent(header);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 20 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '- Content : very atomic part of a document (raw text, image, rich markdowned text, video, ...)'));
page7.addComponent(paragraph);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 27 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '- Template : handles all the styling part, layout, colors, ... actually how content will be displayed !'));
page7.addComponent(paragraph);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 40 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '- Component : contents-templates combinaison (make + shape)'));
page7.addComponent(paragraph);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 50 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '- Page : composition of components on the same section (similar to what you are used to)'));
page7.addComponent(paragraph);
paragraph = new stumpfi.Component(paragrapheTemplate, { h: 10, w: 60 }, { x: 20, y: 60 });
paragraph.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '- Document : meta data, and list of pages, they form a full document together, that you can then easily share with anyone'));
page7.addComponent(paragraph);
let link = new stumpfi.Component(linkTemplate, { h: 10, w: 60 }, { x: 20, y: 75 });
link.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'More information about the concepts '));
link.setContentAt(1, new stumpfi.Content('MEDIA', 'https://github.com/matthieujabbour/stumpfi/wiki/Concepts'));
link.setContentAt(2, new stumpfi.Content('SIMPLE_TEXT', 'here !'));
page7.addComponent(link);
link = new stumpfi.Component(linkTemplate, { h: 10, w: 60 }, { x: 20, y: 80 });
link.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'You can also read the  '));
link.setContentAt(1, new stumpfi.Content('MEDIA', 'https://htmlpreview.github.io/?https://raw.githubusercontent.com/matthieujabbour/stumpfi/master/doc/index.html'));
link.setContentAt(2, new stumpfi.Content('SIMPLE_TEXT', 'API'));
page7.addComponent(link);
myDocument.addPage(page7);


// Creating page 8...
const page8 = new stumpfi.Page(pageMaster);
header = new stumpfi.Component(headerTemplate, { h: 10, w: 100 }, { x: 0, y: 0 });
header.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Contact & Git'));
page8.addComponent(header);
link = new stumpfi.Component(linkTemplate, { h: 10, w: 60 }, { x: 20, y: 30 });
link.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'GitHub repository : '));
link.setContentAt(1, new stumpfi.Content('MEDIA', 'https://github.com/matthieujabbour/stumpfi'));
link.setContentAt(2, new stumpfi.Content('SIMPLE_TEXT', 'https://github.com/matthieujabbour/stumpfi'));
page8.addComponent(link);
link = new stumpfi.Component(linkTemplate, { h: 10, w: 60 }, { x: 20, y: 40 });
link.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', 'Contact : '));
link.setContentAt(1, new stumpfi.Content('MEDIA', 'mailto:matthieujabbour@gmail.com'));
link.setContentAt(2, new stumpfi.Content('SIMPLE_TEXT', 'matthieujabbour@gmail.com'));
page8.addComponent(link);
description = new stumpfi.Component(descriptionTemplate, { h: 5, w: 50 }, { x: 25, y: 60 });
description.setContentAt(0, new stumpfi.Content('SIMPLE_TEXT', '...Thank you for supporting stumpfi !'));
page8.addComponent(description);
myDocument.addPage(page8);





fs.writeFileSync(path.resolve(__dirname, './result.html'), stumpfi_io.toHTML(myDocument));