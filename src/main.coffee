onClick = (e) ->
  $trackButton = $(e.currentTarget)
  $body = $(document.body)

  collection = $trackButton.attr("data-collection")
  eventName = $trackButton.attr("data-event-name")

  $attributeContainer = $trackButton.find(".attributes")
  eventData = generateData($attributeContainer)

  if not eventData?
    return

  eventData.event = eventName

  $body.attr("data-state", "loading")

  Keen.addEvent collection, eventData, (data) ->
    if data.created
      $body.attr("data-state", "")


generateData = ($attributeContainer) ->
  data = {}
  $fields = $attributeContainer.children()

  for field in $fields
    $field = $(field)
    type = $field.attr("data-type")
    name = $field.attr("data-name")
    hint = $field.attr("data-hint")
    value = window.prompt("#{name} (#{type}) (hint: #{hint || 'none'})")

    if not value?
      return null

    if type is "number"
      value = parseFloat(value)

    data[name] = value

  return data


$(".track-button").on("click", onClick)