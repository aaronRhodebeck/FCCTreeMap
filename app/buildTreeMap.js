import * as d3 from 'd3';
import { schemeSet3 } from 'd3-scale-chromatic';

export default function buildTreeMap(
  node,
  dataset,
  reactComponent,
  svgConfig = {
    width: 800,
    height: 450,
    margins: { left: 10, top: 10, right: 10, bottom: 150 },
    scaleable: true,
  },
) {
  // #region Shared variables
  const { width, height, margins, scaleable } = svgConfig;
  const svg = d3.select(node).append('svg');
  const treeMapSpace = {
    width: { start: margins.left, end: width - margins.right },
    height: { start: margins.top, end: height - margins.bottom },
  };
  const legendSpace = {
    width: { start: margins.left, end: width - margins.right },
    height: { start: height - margins.bottom, end: height },
  };
  // #endregion

  // #region Setup SVG
  if (scaleable) {
    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMinYMin');
  } else {
    svg.attr('width', width).attr('height', height);
  }
  // #endregion

  // #region Process hierarchy data
  const root = d3.hierarchy(dataset);
  root.sum(d => d.value);

  const catagories = root
    .leaves()
    .map(leaf => leaf.data.category)
    .filter((catagory, i, arr) => arr.indexOf(catagory) === i);
  // #endregion

  // #region Create catagory color scale
  const colorScale =
    catagories.length < 13
      ? d3.scaleOrdinal(schemeSet3)
      : d3.scaleOrdinal(d3.schemeCategory20b);
  // #endregion

  // #region Create tree map
  const treeMapLayout = d3
    .treemap()
    .size([width, height - margins.bottom])
    .paddingOuter(2)
    .paddingInner(1);

  treeMapLayout(root);

  const cells = svg
    .selectAll('g')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

  const squares = cells
    .append('rect')
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colorScale(d.data.category));

  const foreignObject = cells
    .append('foreignObject')
    .append('xhtml:div')
    .html(d => d.data.name + ' - $' + Math.trunc(d.data.value / 1000000) + 'M')
    .style('height', d => d.y1 - d.y0 - 4)
    .style('width', d => d.x1 - d.x0 - 4)
    .style('margin', 2)
    .style('font-size', 6.5)
    .style('font-family', 'Helvetica')
    .style('color', 'rgba(30,30,30,1)')
    .style('text-shadow', '-1px 0px 9px rgba(240,240,240,.8)')
    .style('overflow', 'hidden');
  // #endregion

  // #region Add legend

  const totalCatagoriesPerColumn = Math.ceil(catagories.length / 2);

  const legend = svg
    .append('g')
    .attr('transform', `translate(${width / 2 - 140}, ${height - margins.bottom + 10})`);

  const rectSpacing = (margins.bottom - 40) / totalCatagoriesPerColumn;

  const legendSquare = legend
    .selectAll('g')
    .data(catagories)
    .enter()
    .append('rect')
    .attr('height', 10)
    .attr('width', 10)
    .attr('x', (d, i) => (i < totalCatagoriesPerColumn ? 0 : 200))
    .attr('y', (d, i) => (i % totalCatagoriesPerColumn) * rectSpacing)
    .attr('fill', d => colorScale(d))
    .attr('stroke-width', 0.8)
    .attr('stroke', 'rgb(27, 27, 27)');

  const legendLabel = legend
    .selectAll('text')
    .data(catagories)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => (i < totalCatagoriesPerColumn ? 15 : 215))
    .attr('y', (d, i) => (i % totalCatagoriesPerColumn) * rectSpacing + 2)
    .style('alignment-baseline', 'hanging')
    .style('font-size', 9)
    .style('font-family', 'Helvetica')
    .style('font-weight', 'bold')
    .style('fill', 'rgb(140, 165, 198)');
  // #endregion

  // #region Set tooltip info
  function setTooltipState(d) {
    const tooltip = {
      visibility: 'visible',
      location: {
        x: d3.event.pageX,
        y: d3.event.pageY,
      },
      data: {
        name: d.data.name,
        category: d.data.category,
        color: colorScale(d.data.category),
        value: d.data.value,
      },
    };
    reactComponent.setState({ tooltip });
  }

  function hideTooltip() {
    const tooltip = { ...reactComponent.state.tooltip };
    tooltip.visibility = 'hidden';
    reactComponent.setState({ tooltip });
  }

  cells.on('mouseover', setTooltipState);
  cells.on('mouseout', hideTooltip);
  // #endregion
}
