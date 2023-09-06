import { Box, Typography, styled } from "@mui/material"

const Bolder = styled('span')({
  fontWeight: 500
})

const Blacker = ({ children }: { children?: string }) => (
  <Typography component="span" sx={{ color: '#505050' }}>{children}</Typography>
)

const Title = ({ title, fontSize, variant }: {
  title: string,
  fontSize?: number,
  variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined
}) => {
  return (
    <Typography
      variant={variant || 'subtitle1'}
      fontSize={fontSize}
      sx={{
        color: "#505050",
        fontWeight: 500,
        fontSize: '19px'
      }}>
      {title} <Box sx={{ width: '60px', borderBottom: '2px solid #8d1e1f', marginBottom: 2 }}></Box>
    </Typography>
  )
}

const Subtitle = ({ children }: { children?: string }) => (
  <Typography sx={{
    marginTop: 0.5,
    marginBottom: 2,
    color: '#505050',
    fontSize: '1.05em',
    fontWeight: 500,
  }}>
    {children} <Box sx={{ width: '60px', borderBottom: '1px solid #8d1e1f40', marginBottom: 2 }}></Box>
  </Typography>
)


export { Subtitle, Title, Bolder, Blacker }
