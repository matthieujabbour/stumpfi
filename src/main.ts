/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import Component from './entities/Component';
import Content from './entities/Content';
import Document from './entities/Document';
import HtmlComponent from './renderer/Component';
import HtmlDocument from './renderer/Document';
import HtmlPage from './renderer/Page';
import Page from './entities/Page';
import Theme from './entities/Theme';
import load from './load';
import save from './save';
// import Runtime from './Runtime';


// console.log(Runtime.createComponent()); // tslint:disable-line

export default {
  save,
  load,
  entities: { Document, Page, Component, Content },
  renderer: { Document: HtmlDocument, Page: HtmlPage, Component: HtmlComponent },
};


const doc : Document = new Document();
const sec : Page = new Page();
const th : Theme = new Theme();
const cont : Content = new Content('<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The world will miss you. R.I.P. <a href="https://twitter.com/hashtag/chesterbennington?src=hash">#chesterbennington</a> <a href="https://twitter.com/hashtag/LinkinPark?src=hash">#LinkinPark</a></p>&mdash; Matthieu Jabbour (@MJaxi0m) <a href="https://twitter.com/MJaxi0m/status/888142541643816961">July 20, 2017</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
const comp : Component = new Component(cont);
const ct : Content = new Content('BONJOUR POULET');
const compt : Component = new Component(ct);
th.addComponent(compt);
comp.setStyle({ fontSize: '50px', color: 'red' });
sec.addComponent(comp);
sec.setTheme(th);
doc.addPage(sec);
doc.addPage(sec);
ct.setHtml('BONJOUT POULEYTE');
doc.setName('azdzdok');
doc.addResource({ tagName: 'link', attributes: { rel: 'okokok', href: 'ookojij' } });
doc.addResource({ tagName: 'script', content: 'var j = 3;', attributes: { rel: '', href: '' } });
/* tslint:disable:no-console */
// console.log(doc.getPages().length);
cont.setHtml('okokokk');
save(doc, './dist');
// // console.log(doc.getText());
const p : Document = load('./dist/azdzdok.html');
p.setName('azdkzadok');

console.log(p);
const t : Theme | null = p.getPages()[0].getTheme();
if (t !== null) console.log(t.getComponents()[0].getContent());

save(p, './dist');
