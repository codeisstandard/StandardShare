# StandardShare

Javascript library that takes care of all your sharing needs

## About

A JavaScript library by Standard Code.

See the [project homepage](http://codeisstandard.github.io/StandardShare).

## Installation

Using Bower:

    bower install standard-share

Or grab the [source](https://github.com/codeisstandard/StandardShare/dist/StandardShare.js) ([minified](https://github.com/codeisstandard/StandardShare/dist/StandardShare.min.js)).

## Usage

Basic usage is as follows:

```javascript
StandardShare.shareList().bindEvents().afterComplete(function() {
  //Handle the callback here. if you have to close a list.
});
```

StandardShare works by traversing a ul with a default class of ```standard-share```.

If you do not want to use the default class name you can pass in the name of the element like so
```javascript
shareList('.your-custom-list')
```
```html
<ul class="standard-share">
    <li data-standard-share="facebook" data-standard-link="#">
      <a href="#">Facebook <span class="icon icon-facebook"></span></a>
    </li>
    <li data-standard-share="twitter" data-standard-link="#">
      <a href="#">Twitter <span class="icon icon-twitter"></span></a>
    </li>
    <li data-standard-share="email" data-standard-link="#" >
      <a href="#">Email <span class="icon icon-mail"></span></a>
    </li>
    <li data-standard-share="copy-link" data-standard-link="#">
      <a href="#">Copy Link <span class="icon icon-link"></span></a>
    </li>
    <li data-standard-share="calender" data-standard-link="#">
      <a href="#">Add To Calendar <span class="icon icon-calendar"></span></a>
    </li>
</ul>
```
The ```data-standard-share="<any social share name>"``` the names have to match the list below.

| data-standard-share=  | Description  |
| ------------- | ----------- |
| facebook      | Facebook|
| twitter       | Twitter|
| email       | This will open the email client|
| copy-link       | This will use the <a href="https://github.com/zeroclipboard/zeroclipboard">ZeroClipboard</a> library.<br>If you are using this option please read below about it|
| calender       | To Be Implimented|

```data-standard-link="<link that will be shared>"```

For advanced usage, see the documentation.

## ZeroClipboard

Because copying to the clipboard is an operating system task we will need to use flash. <a href="https://github.com/zeroclipboard/zeroclipboard">ZeroClipboard</a>
has already implemented this.

If you use the copy-link option please be sure to include the ZeroClipboard.js and ZeroClipboard.swf
in the same folder and remember that StandardShare will depend on it.


## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
