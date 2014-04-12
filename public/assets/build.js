;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  var generateData, onClick;

  onClick = function(e) {
    var $attributeContainer, $body, $trackButton, collection, eventData, eventName;
    $trackButton = $(e.currentTarget);
    $body = $(document.body);
    collection = $trackButton.attr("data-collection");
    eventName = $trackButton.attr("data-event-name");
    $attributeContainer = $trackButton.find(".attributes");
    eventData = generateData($attributeContainer);
    if (eventData == null) {
      return;
    }
    eventData.event = eventName;
    $body.attr("data-state", "loading");
    return Keen.addEvent(collection, eventData, function(data) {
      if (data.created) {
        return $body.attr("data-state", "");
      }
    });
  };

  generateData = function($attributeContainer) {
    var $field, $fields, data, field, hint, name, type, value, _i, _len;
    data = {};
    $fields = $attributeContainer.children();
    for (_i = 0, _len = $fields.length; _i < _len; _i++) {
      field = $fields[_i];
      $field = $(field);
      type = $field.attr("data-type");
      name = $field.attr("data-name");
      hint = $field.attr("data-hint");
      value = window.prompt("" + name + " (" + type + ") (hint: " + (hint || 'none') + ")");
      if (value == null) {
        return null;
      }
      if (type === "number") {
        value = parseFloat(value);
      }
      data[name] = value;
    }
    return data;
  };

  $(".track-button").on("click", onClick);

}).call(this);

},{}]},{},[1])
;