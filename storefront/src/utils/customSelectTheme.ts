
const customSelectTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#007bff", // Set the primary color
    primary75: "#0056b3", // Set the primary color when hovered
    primary50: "#007bff", // Set the primary color when selected
    primary25: "#007bff", // Set the primary color when focused
    neutral0: "#333", // Set the background color
    neutral5: "#fff", // Set the border color
    neutral10: "#fff", // Set the border color when hovered
    neutral20: "#333", // Set the border color when focused
    neutral30: "#333", // Set the border color when pressed
    neutral40: "#fff", // Set the text color
    neutral50: "#fff", // Set the text color when hovered
    neutral60: "#fff", // Set the text color when selected
    neutral70: "#fff", // Set the text color when focused
    neutral80: "#fff", // Set the text color when pressed
    neutral90: "#fff", // Set the placeholder color
  },
});

export default customSelectTheme;
