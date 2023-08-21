import { RadarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import React, { useContext } from 'react';
import { ThemeContext } from '../../services/Themes/Theme';

type RadarProps = {
	data: any[];
};

const Radar: React.FC<RadarProps> = ({ data }) => {
	const { isLightTheme } = useContext(ThemeContext);
	// const data = [
	// 	{
	// 		product: 'Product 1',
	// 		feature: 'Price',
	// 		score: 60,
	// 	},
	// ];

	const options = {
		title: 'Radar',
		radar: {
			axes: {
				angle: 'feature',
				value: 'score',
			},
		},
		data: {
			groupMapsTo: 'product',
		},
		theme: isLightTheme ? 'g10' : 'g90',
		height: '400px',
	};

	return <RadarChart data={data} options={options as any}></RadarChart>;
};

export default Radar;
