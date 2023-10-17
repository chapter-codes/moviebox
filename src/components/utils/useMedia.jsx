import {useMediaQuery } from 'react-responsive'

export function useMedia(){
	const size=useMediaQuery({minWidth:810})? 'Desktop':
		useMediaQuery({minWidth:600})? 'Tablet':
		'Mobile'

	console.log('SCREEN SIZE: ', size)

	return size	
}	

