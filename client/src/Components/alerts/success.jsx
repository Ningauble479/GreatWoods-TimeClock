import { Box, Typography } from '@material-ui/core'



export default function Success ({type, words}) {
    return (
          <Box style={{
                position: 'fixed',
                top: '10%',
                left: '50%',
                width: 700,
                backgroundColor: type === 'success' ? 'green' : type === 'error' ? 'red' : 'orange',
                border: '2px solid #000',
                borderRadius: '50px',
                boxShadow: 24,
                padding: 10,
                zIndex:'999999999999'
                }}>
            <Typography>
              {words}
            </Typography>
          </Box>
    )
}