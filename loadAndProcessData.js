import { tsv, json } from 'd3';
import { feature } from 'topojson-client';

export const loadAndProcessData = () =>

    Promise.all([
        tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
        json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ]).then(([tsvData, topoJSONData]) => {
    
        const rowByID = tsvData.reduce((accumulator, d) => {
        accumulator[d.iso_n3] = d;
        return accumulator
        }, {});
    
        const countries = feature(topoJSONData, topoJSONData.objects.countries);
    
        countries.features.forEach(d => {
        Object.assign(d.properties, rowByID[d.id]);
        });

        return countries;
    });