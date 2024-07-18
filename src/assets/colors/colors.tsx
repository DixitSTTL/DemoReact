import { Appearance } from 'react-native';

const isDark = Appearance.getColorScheme() === 'dark'

type Colors = {
  text: string;
  textAccent: string;
  background: string;
  color_EB623D: string;
  color_primary: string;
  color_primary_dark: string;
  black50: string;

  white: string;
  black: string;

 

}

export const lightModeColors: Colors = {
  text: '#222',
  textAccent: '#444',
  background: '#fff',
  color_EB623D: "#ffece7",
  color_primary: "#2957A7",
  color_primary_dark: "#2957A7",
  black50: "#00000050",

  white: "#fff",
  black: "#000",

  


}

export const darkModeColors: Colors = {
  text: '#fff',
  textAccent: '#ccc',
  background: '#222',
  color_EB623D: "#ffece7",
  color_primary: "#5B71E9",
  color_primary_dark: "#2957A7",
  black50: "#00000050",

  white: "#fff",
  black: "#000",

  

}

export const colors = isDark ? darkModeColors : lightModeColors;

