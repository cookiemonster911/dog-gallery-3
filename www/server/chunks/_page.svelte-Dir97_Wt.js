import { a as subscribe, n as noop } from './utils-CC34fe4r.js';
import { c as create_ssr_component, b as add_attribute, e as escape } from './ssr-Cj2rH81Y.js';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function isElement(node) {
  return node.children !== undefined;
}

function isText(node) {
  return node.text !== undefined;
}

function isEmpty(_ref) {
  var children = _ref.children;

  // Checks if the children array has more than one element.
  // It may have a link inside, that's why we need to check this condition.
  if (children.length > 1) {
    var hasText = children.filter(function f(child) {
      if (isText(child) && child.text !== '') {
        return true;
      }

      if (isElement(child)) {
        return (child.children = child.children.filter(f)).length;
      }

      return false;
    });
    return hasText.length > 0 ? false : true;
  } else if (children[0].text === '') return true;

  return false;
}

var EmptyElementsToRemove;

(function (EmptyElementsToRemove) {
  EmptyElementsToRemove[EmptyElementsToRemove["heading-one"] = 0] = "heading-one";
  EmptyElementsToRemove[EmptyElementsToRemove["heading-two"] = 1] = "heading-two";
  EmptyElementsToRemove[EmptyElementsToRemove["heading-three"] = 2] = "heading-three";
  EmptyElementsToRemove[EmptyElementsToRemove["heading-four"] = 3] = "heading-four";
  EmptyElementsToRemove[EmptyElementsToRemove["heading-five"] = 4] = "heading-five";
  EmptyElementsToRemove[EmptyElementsToRemove["heading-six"] = 5] = "heading-six";
  EmptyElementsToRemove[EmptyElementsToRemove["table_head"] = 6] = "table_head";
})(EmptyElementsToRemove || (EmptyElementsToRemove = {}));

var elementTypeKeys = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'heading-three': 'h3',
  'heading-four': 'h4',
  'heading-five': 'h5',
  'heading-six': 'h6',
  "class": 'class',
  link: 'a',
  image: 'img',
  iframe: 'iframe',
  video: 'video',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  'list-item-child': 'list_item_child',
  table: 'table',
  table_head: 'table_head',
  table_body: 'table_body',
  table_row: 'table_row',
  table_cell: 'table_cell',
  table_header_cell: 'table_header_cell',
  'block-quote': 'blockquote',
  paragraph: 'p',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  code: 'code',
  'code-block': 'code_block'
};

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

var escapeHtml_1;
var hasRequiredEscapeHtml;

function requireEscapeHtml () {
	if (hasRequiredEscapeHtml) return escapeHtml_1;
	hasRequiredEscapeHtml = 1;

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	escapeHtml_1 = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}
	return escapeHtml_1;
}

var escapeHtmlExports = requireEscapeHtml();
var escapeHtml = /*@__PURE__*/getDefaultExportFromCjs(escapeHtmlExports);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function Audio(_ref) {
  var url = _ref.url;
  return "\n    <audio\n      style=\"display: block; max-width: 100%; height: auto\"\n      src=\"" + url + "\"\n      controls=\"\"\n    >\n      <p>\n        Your browser doesn&#x27;t support HTML5 audio. Here is a\n        <a href=\"" + url + "\">link to the audio</a>\n        instead.\n      </p>\n    </audio>\n  ";
}

function IFrame(_ref) {
  var url = _ref.url;
  return "\n    <div\n      style=\"\n        position: relative;\n        overflow: hidden;\n        width: 100%;\n        padding-top: 56.25%;\n      \"\n    >\n      <iframe\n        style=\"\n          position: absolute;\n          top: 0px;\n          bottom: 0px;\n          right: 0px;\n          left: 0px;\n          width: 100%;\n          height: 100%;\n        \"\n        src=\"" + escapeHtml(url) + "\"\n        loading=\"lazy\"\n        allow=\"fullscreen\"\n        frameBorder=\"0\"\n        referrerPolicy=\"no-referrer\"\n      ></iframe>\n    </div>\n  ";
}

function Image(_ref) {
  var src = _ref.src,
      width = _ref.width,
      height = _ref.height,
      altText = _ref.altText,
      title = _ref.title;

  if (process.env.NODE_ENV !== "production" && !src) {
    console.warn("[@graphcms/rich-text-html-renderer]: src is required. You need to include a `url` in your query");
  }

  return "\n    <img loading=\"lazy\" src=\"" + escapeHtml(src) + "\" " + (width ? "width=\"" + width + "\"" : "") + " " + (height ? "height=\"" + height + "\"" : "") + " " + (altText ? "alt=\"" + altText + "\"" : "") + " " + (title ? "title=\"" + title + "\"" : "") + " />\n  ";
}

function Video(_ref) {
  var src = _ref.src,
      width = _ref.width,
      height = _ref.height,
      title = _ref.title;
  return "\n    <video src=\"" + escapeHtml(src) + "\" controls width=\"" + (width || '100%') + "\" height=\"" + (height || '100%') + "\" " + (title ? "title=\"" + title + "\"" : "") + ">\n      <p>\n        Your browser doesn't support HTML5 video. Here is a\n        <a href=\"" + src + "\">link to the video</a> instead.\n      </p>\n    </video>\n  ";
}

function Class(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return "<div class=\"" + className + "\">" + children + "</div>";
}

function Link(_ref) {
  var children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, ["children"]);

  var href = rest.href,
      rel = rest.rel,
      id = rest.id,
      title = rest.title,
      openInNewTab = rest.openInNewTab,
      className = rest.className;
  return "\n    <a href=\"" + escapeHtml(href) + "\" target=\"" + (openInNewTab ? '_blank' : '_self') + "\" " + (className ? "class=\"" + className + "\"" : "") + " " + (rel ? "rel=\"" + rel + "\"" : "") + " " + (title ? "title=\"" + title + "\"" : "") + " " + (id ? "id=\"" + id + "\"" : "") + " " + (rel ? "rel=\"" + rel + "\"" : "") + ">\n      " + children + "\n    </a>\n  ";
}

function FallbackForCustomAsset(_ref) {
  var mimeType = _ref.mimeType;

  if (process.env.NODE_ENV !== "production") {
    console.warn("[@graphcms/rich-text-html-renderer]: Unsupported mimeType encountered: " + mimeType + ". You need to write your renderer to render it since we are not opinionated about how this asset should be rendered (check our docs for more info).");
  }

  return "";
}

var defaultElements = {
  a: Link,
  "class": Class,
  video: Video,
  img: Image,
  iframe: IFrame,
  blockquote: function blockquote(_ref2) {
    var children = _ref2.children;
    return "<blockquote>" + children + "</blockquote>";
  },
  ul: function ul(_ref3) {
    var children = _ref3.children;
    return "<ul>" + children + "</ul>";
  },
  ol: function ol(_ref4) {
    var children = _ref4.children;
    return "<ol>" + children + "</ol>";
  },
  li: function li(_ref5) {
    var children = _ref5.children;
    return "<li>" + children + "</li>";
  },
  p: function p(_ref6) {
    var children = _ref6.children;
    return "<p>" + children + "</p>";
  },
  h1: function h1(_ref7) {
    var children = _ref7.children;
    return "<h1>" + children + "</h1>";
  },
  h2: function h2(_ref8) {
    var children = _ref8.children;
    return "<h2>" + children + "</h2>";
  },
  h3: function h3(_ref9) {
    var children = _ref9.children;
    return "<h3>" + children + "</h3>";
  },
  h4: function h4(_ref10) {
    var children = _ref10.children;
    return "<h4>" + children + "</h4>";
  },
  h5: function h5(_ref11) {
    var children = _ref11.children;
    return "<h5>" + children + "</h5>";
  },
  h6: function h6(_ref12) {
    var children = _ref12.children;
    return "<h6>" + children + "</h6>";
  },
  table: function table(_ref13) {
    var children = _ref13.children;
    return "<table>" + children + "</table>";
  },
  table_head: function table_head(_ref14) {
    var children = _ref14.children;
    return "<thead>" + children + "</thead>";
  },
  table_body: function table_body(_ref15) {
    var children = _ref15.children;
    return "<tbody>" + children + "</tbody>";
  },
  table_row: function table_row(_ref16) {
    var children = _ref16.children;
    return "<tr>" + children + "</tr>";
  },
  table_cell: function table_cell(_ref17) {
    var children = _ref17.children;
    return "<td>" + children + "</td>";
  },
  table_header_cell: function table_header_cell(_ref18) {
    var children = _ref18.children;
    return "<th>" + children + "</th>";
  },
  bold: function bold(_ref19) {
    var children = _ref19.children;
    return "<b>" + children + "</b>";
  },
  italic: function italic(_ref20) {
    var children = _ref20.children;
    return "<i>" + children + "</i>";
  },
  underline: function underline(_ref21) {
    var children = _ref21.children;
    return "<u>" + children + "</u>";
  },
  code: function code(_ref22) {
    var children = _ref22.children;
    return "<code>" + children + "</code>";
  },
  code_block: function code_block(_ref23) {
    var children = _ref23.children;
    return "<pre\n      style=\"\n        white-space: pre;\n        word-wrap: break-word;\n        overflow-x: auto;\n        -webkit-overflow-scrolling: touch;\n        font-family: monospace;\n      \"\n    >\n      " + children + "\n    </pre>";
  },
  list_item_child: function list_item_child(_ref24) {
    var children = _ref24.children;
    return "" + children;
  },
  Asset: {
    audio: Audio,
    image: function image(props) {
      return Image(_extends({}, props, {
        src: props.url
      }));
    },
    video: function video(props) {
      return Video(_extends({}, props, {
        src: props.url
      }));
    },
    font: FallbackForCustomAsset,
    application: FallbackForCustomAsset,
    model: FallbackForCustomAsset,
    text: FallbackForCustomAsset
  },
  embed: {},
  link: {}
};

function getArrayOfElements(content) {
  return Array.isArray(content) ? content : content.children;
}

function serialize(text) {
  if (text.includes('\n')) {
    var splitText = text.split('\n');
    return splitText.map(function (line, index) {
      return "" + line + (index === splitText.length - 1 ? '' : '<br />');
    }).join('');
  }

  return text;
}

function renderText(_ref) {
  var shouldSerialize = _ref.shouldSerialize,
      textNode = _ref.textNode,
      renderers = _ref.renderers;
  var text = textNode.text,
      bold = textNode.bold,
      italic = textNode.italic,
      underline = textNode.underline,
      code = textNode.code;
  var escapedText = escapeHtml(text);
  var parsedText = shouldSerialize ? serialize(escapedText) : escapedText;
  var Bold = renderers == null ? void 0 : renderers['bold'];
  var Italic = renderers == null ? void 0 : renderers['italic'];
  var Underline = renderers == null ? void 0 : renderers['underline'];
  var Code = renderers == null ? void 0 : renderers['code'];

  if (bold && Bold) {
    parsedText = Bold({
      children: parsedText
    });
  }

  if (italic && Italic) {
    parsedText = Italic({
      children: parsedText
    });
  }

  if (underline && Underline) {
    parsedText = Underline({
      children: parsedText
    });
  }

  if (code && Code) {
    parsedText = Code({
      children: parsedText
    });
  }

  return parsedText;
}

function renderElement(_ref2) {
  var element = _ref2.element,
      references = _ref2.references,
      renderers = _ref2.renderers;

  var children = element.children,
      type = element.type,
      rest = _objectWithoutPropertiesLoose(element, ["children", "type"]);

  var nodeId = rest.nodeId,
      nodeType = rest.nodeType;

  if (type in EmptyElementsToRemove && isEmpty({
    children: children
  })) {
    return "";
  }

  var isEmbed = nodeId && nodeType;
  var referenceValues = isEmbed ? references == null ? void 0 : references.filter(function (ref) {
    return ref.id === nodeId;
  })[0] : null;

  if (process.env.NODE_ENV !== "production" && isEmbed && !(referenceValues != null && referenceValues.id)) {
    console.error("[@graphcms/rich-text-html-renderer]: No id found for embed node " + nodeId + ". In order to render custom embeds, `id` is required in your reference query.");
    return "";
  }

  if (process.env.NODE_ENV !== "production" && isEmbed && nodeType === 'Asset' && !(referenceValues != null && referenceValues.mimeType)) {
    console.error("[@graphcms/rich-text-html-renderer]: No mimeType found for embed node " + nodeId + ". In order to render custom assets, `mimeType` is required in your reference query.");
    return "";
  }

  if (process.env.NODE_ENV !== "production" && isEmbed && nodeType === 'Asset' && !(referenceValues != null && referenceValues.url)) {
    console.error("[@graphcms/rich-text-html-renderer]: No url found for embed node " + nodeId + ". In order to render custom assets, `url` is required in your reference query.");
    return "";
  }

  var elementToRender;

  if (isEmbed && nodeType !== 'Asset') {
    var _renderers$link, _renderers$embed;

    var _element = type === 'link' ? renderers == null ? void 0 : (_renderers$link = renderers.link) == null ? void 0 : _renderers$link[nodeType] : renderers == null ? void 0 : (_renderers$embed = renderers.embed) == null ? void 0 : _renderers$embed[nodeType];

    if (_element !== undefined) {
      elementToRender = _element;
    } else {
      console.warn("[@graphcms/rich-text-html-renderer]: No renderer found for custom " + type + " nodeType " + nodeType + ".");
      return "";
    }
  }

  if (isEmbed && nodeType === 'Asset') {
    var _renderers$Asset;

    var _element2 = renderers == null ? void 0 : (_renderers$Asset = renderers.Asset) == null ? void 0 : _renderers$Asset[referenceValues == null ? void 0 : referenceValues.mimeType];

    if (_element2 !== undefined) {
      elementToRender = _element2;
    } else {
      var _renderers$Asset2;

      var mimeTypeGroup = referenceValues == null ? void 0 : referenceValues.mimeType.split('/')[0];
      elementToRender = renderers == null ? void 0 : (_renderers$Asset2 = renderers.Asset) == null ? void 0 : _renderers$Asset2[mimeTypeGroup];
    }
  }

  var elementNodeRenderer = isEmbed ? elementToRender : renderers == null ? void 0 : renderers[elementTypeKeys[type]];

  if (elementNodeRenderer) {
    var props = _extends({}, rest, referenceValues);

    var nextElements = renderElements({
      content: children,
      renderers: renderers,
      references: references,
      parent: element
    }).join('');
    return elementNodeRenderer(_extends({}, props, {
      children: nextElements
    }));
  }

  return "";
}

function renderNode(_ref3) {
  var node = _ref3.node,
      parent = _ref3.parent,
      references = _ref3.references,
      renderers = _ref3.renderers;

  if (isText(node)) {
    var shouldSerialize = parent && isElement(parent) && parent.type !== 'code-block';
    return renderText({
      shouldSerialize: shouldSerialize,
      textNode: node,
      renderers: renderers
    });
  }

  if (isElement(node)) {
    return renderElement({
      element: node,
      renderers: renderers,
      references: references
    });
  }

  var type = node.type;

  if (process.env.NODE_ENV !== "production") {
    console.warn("[@graphcms/rich-text-html-renderer]: Unknown node type encountered: " + type);
  }

  return "";
}

function renderElements(_ref4) {
  var content = _ref4.content,
      parent = _ref4.parent,
      references = _ref4.references,
      renderers = _ref4.renderers;
  var elements = getArrayOfElements(content);
  return elements.map(function (node) {
    return renderNode({
      node: node,
      parent: parent || null,
      renderers: renderers,
      references: references
    });
  });
}

function astToHtmlString(_ref5) {
  var resolvers = _ref5.renderers,
      content = _ref5.content,
      references = _ref5.references;

  var assetRenderers = _extends({}, defaultElements == null ? void 0 : defaultElements.Asset, resolvers == null ? void 0 : resolvers.Asset);

  var renderers = _extends({}, defaultElements, resolvers, {
    Asset: assetRenderers
  });

  if (process.env.NODE_ENV !== "production" && !content) {
    console.error("[@graphcms/rich-text-html-renderer]: content is required.");
    return "";
  }

  if (process.env.NODE_ENV !== "production" && !Array.isArray(content) && !content.children) {
    console.error("[@graphcms/rich-text-html-renderer]: children is required in content.");
    return "";
  }
  /*
    Checks if there's a embed type inside the content and if the `references` prop is defined
       If it isn't defined and there's embed elements, it will show a warning
    */


  if (process.env.NODE_ENV !== "production") {
    var elements = getArrayOfElements(content);
    var embedElements = elements.filter(function (element) {
      return element.type === 'embed';
    });

    if (embedElements.length > 0 && !references) {
      console.warn("[@graphcms/rich-text-html-renderer]: to render embed elements you need to provide the `references` prop");
    }
  }

  return renderElements({
    content: content,
    references: references,
    renderers: renderers
  }).join('');
}

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let Dog;
  let $Dog, $$unsubscribe_Dog = noop, $$subscribe_Dog = () => ($$unsubscribe_Dog(), $$unsubscribe_Dog = subscribe(Dog, ($$value) => $Dog = $$value), Dog);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$subscribe_Dog(Dog = data.Dog);
  $$unsubscribe_Dog();
  return `<div><section class="mt-2 flex gap-x-6"><figure class="basis-[33%]"><img${add_attribute("src", $Dog.data?.dog?.picture.url, 0)} alt="${"Dog - " + escape($Dog.data?.dog?.name, true)}" class="aspect-square w-full object-cover"></figure> <div class="flex-1"><h1 class="text-6xl font-bold leading-loose">${escape($Dog.data?.dog?.name)}</h1> <p class="text-muted-foreground text-3xl leading-normal">Department: <b>${escape($Dog.data?.dog?.department)}</b></p> <p class="text-muted-foreground text-3xl leading-normal">Batch: <b>${escape($Dog.data?.dog?.batch)}</b></p></div></section> <div class="prose mt-3"><!-- HTML_TAG_START -->${astToHtmlString({
    content: $Dog.data?.dog?.description.json,
    references: $Dog.data?.dog?.description.references
  })}<!-- HTML_TAG_END --></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Dir97_Wt.js.map
