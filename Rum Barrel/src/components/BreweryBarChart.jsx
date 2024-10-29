import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default class BreweryBarChart extends PureComponent {
  render() {
    const { breweries } = this.props;

    // Count occurrences of each brewery type
    const typeCounts = breweries.reduce((acc, brewery) => {
      acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
      return acc;
    }, {});

    // Format data for the bar chart
    const data = Object.entries(typeCounts).map(([type, count]) => ({
      name: type,
      value: count,
    }));

    // Define colors for each brewery type
    const colors = {
      micro: '#8884d8',
      nano: '#82ca9d',
      regional: '#ffc658',
      brewpub: '#ff7300',
      large: '#0088fe',
      planning: '#d0ed57',
      contract: '#a4de6c',
      proprietor: '#d0ed57',
      closed: '#000000'
    };

    return (
      <div style={{ width: '80%', height: 200, backgroundColor: '#f0f4f7', padding: '20px', borderRadius: '8px' }}>
        <ResponsiveContainer>
          <BarChart data={data}>
          <XAxis dataKey="name" stroke="#555555" tick={{ fill: '#00000', fontSize: 14 }} />
            <YAxis stroke="#555555" tick={{ fill: '#00000', fontSize: 14 }} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', color: '#333' }} itemStyle={{ color: '#333333' }} />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name] || '#8884d8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
