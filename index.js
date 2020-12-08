import { 
  select, 
  json, 
  tsv, 
  geoPath, 
  geoNaturalEarth1, 
  zoom,
  event,
  scaleOrdinal,
  schemeCategory10,
  schemeSpectral,
  range
} from 'd3';
import { loadAndProcessData } from  './loadAndProcessData'
import { colorLegend } from './colorLegend'
import { choropleth } from './choropleth'

const svg = select('svg');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection)
const g = svg.append('g');

const colorLegendG = svg.append('g')
  .attr('transform', `translate(20, 350)`)

  // const countryName = {}
  // tsvData.forEach(d => {
  //   countryName[d.iso_n3] = d.name;    
  // });

const colorScale = scaleOrdinal()

const colorValue = d => d.properties.economy

let selectedColorValue;
let features;

const onClick = d => {
  selectedColorValue = d;
  console.log(selectedColorValue);
  render();
}

loadAndProcessData().then(countries =>{
  features = countries.features;
  render();
});

const render = () => {
    colorScale
    .domain(features.map(colorValue))
    .domain(colorScale.domain().sort().reverse())
    .range(schemeSpectral[colorScale.domain().length]);

  colorLegendG
    .call(colorLegend, {
      colorScale, 
      spacing: 15,
      circleRadious: 5,
      textOffset: 15,
      backgroundRectWidth: 160,
      onClick,
      selectedColorValue
      });
}

