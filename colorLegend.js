export const colorLegend = (selection, props) => {
    const { 
      colorScale, 
      spacing, 
      circleRadious,
      textOffset,
      backgroundRectWidth,
      onClick,
      selectedColorValue
    } = props

    const backgroundRect = selection.selectAll('rect')
        .data([null]);
      const n = colorScale.domain().length
      backgroundRect.enter().append('rect')
        .merge(backgroundRect)
            .attr('x', -circleRadious * 2)
            .attr('y', -circleRadious * 2)
            .attr('width', backgroundRectWidth)
            .attr('height', spacing * n + circleRadious *2)
            .attr('fill', 'white')
            .attr('rx', circleRadious * 2)
            .attr('opacity', 0.5)
            .attr('stroke', 'black')


    const groups =  selection
      .selectAll('.tick')
      .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g')
      .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        )
        .attr('opacity', d => 
          (!selectedColorValue || d === selectedColorValue) 
            ? 1
            : 0.2
        )
        .on('click', (e, d) => {
          onClick(d === selectedColorValue
            ? null
            : d
            );
        });

    groups.exit().remove();

    groupsEnter
      .append('circle')
      .merge(groups.select('circle'))
        .attr('fill', d => colorScale(d))
        .attr('r', circleRadious);
      

    groupsEnter
      .append('text')
      .merge(groups.select('text'))
        .attr('fill', 'black')
        .attr('x', textOffset)
        .attr('dy', '0.32em')
        .text(d => d);
  }