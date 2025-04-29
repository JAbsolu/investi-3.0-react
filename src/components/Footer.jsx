import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, useMediaQuery, useTheme } from '@mui/material';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaChartLine } from 'react-icons/fa';
import { green, teal, grey } from '@mui/material/colors';

// Constants for colors matching dashboard
const darkBg = "#0d0d0d";
const white = "#ffffff";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Logo and description */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FaChartLine style={{ color: teal[400], fontSize: "24px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: white }}>
              Investi
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: grey[400],
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              lineHeight: 1.6,
              mb: 2
            }}
          >
            Investi provides investors with real-time market data and AI-powered insights to make 
            smarter investment decisions and grow your portfolio.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {[FaTwitter, FaFacebook, FaLinkedin, FaGithub].map((Icon, i) => (
              <IconButton 
                key={i}
                size="small" 
                aria-label="social media" 
                sx={{ 
                  color: grey[400],
                  '&:hover': { 
                    color: teal[300],
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                  }
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Links Section 1 */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: teal[300], 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
            }}
          >
            PRODUCT
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {['Dashboard', 'Features', 'AI Analysis', 'Pricing', 'Documentation'].map((item, i) => (
              <Box component="li" key={i} sx={{ mb: 1 }}>
                <Link 
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: grey[400], 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { color: green[400] } 
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Links Section 2 */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: teal[300], 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
            }}
          >
            COMPANY
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {['About Us', 'Careers', 'Press', 'News', 'Contact'].map((item, i) => (
              <Box component="li" key={i} sx={{ mb: 1 }}>
                <Link 
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: grey[400], 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { color: green[400] } 
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Links Section 3 */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: teal[300], 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
            }}
          >
            LEGAL
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings'].map((item, i) => (
              <Box component="li" key={i} sx={{ mb: 1 }}>
                <Link 
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: grey[400], 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { color: green[400] } 
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Newsletter Section */}
        <Grid item xs={6} sm={6} md={2}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: teal[300], 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
            }}
          >
            RESOURCES
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {['Blog', 'Newsletter', 'Events', 'Help Center', 'Tutorials'].map((item, i) => (
              <Box component="li" key={i} sx={{ mb: 1 }}>
                <Link 
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: grey[400], 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { color: green[400] } 
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, bgcolor: green[900], opacity: 0.5 }} />

      <Box 
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          gap: 2
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: grey[500],
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          © {new Date().getFullYear()} Investi. All rights reserved.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['Privacy Policy', 'Terms of Service', 'Cookies Settings'].map((item, i) => (
            <Link 
              key={i}
              href="#" 
              underline="none" 
              sx={{ 
                color: grey[500], 
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                '&:hover': { color: teal[400] } 
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
