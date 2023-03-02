import { Box, Typography } from "@mui/material"


const Title = (props: {
  title: string,
  fontSize?: number,
  variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined
}) => {
  return (
    <Typography
      variant={props.variant || 'subtitle1'}
      fontSize={props.fontSize}
      sx={{
        color: "#505050",
        fontWeight: 500,
        fontSize: '19px'
      }}>
      {props.title} <Box sx={{ width: '60px', borderBottom: '2px solid #8d1e1f', marginBottom: 2 }}></Box>
    </Typography>
  )
}

export default Title;
