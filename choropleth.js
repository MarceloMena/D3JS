export const choropleth = (selection, props) => {
  const { 
    colorScale, 
    spacing, 
    circleRadious,
    textOffset,
    backgroundRectWidth,
    onClick,
    selectedColorValue
  } = props;

  let g = selection.selectAll('g').data([null]);
  g = g.enter().append('g').merge(g);
  
  g.append('path')
    .attr('d', pathGenerator({type: "Sphere"}))
    .attr('class', 'map-background');

  g.call(zoom().on('zoom', zoomed));

  function zoomed({transform}) {
    g.attr("transform", transform);
  }

  const paths = g.selectAll('path')
    .data(features);

  paths
    .enter().append('path')
    .attr('class', 'country')
    .attr('d', pathGenerator)
    .attr('fill', d => colorScale(colorValue(d)))
    .append('title')
        .text(d => d.properties.name + ': ' + colorValue(d));
}