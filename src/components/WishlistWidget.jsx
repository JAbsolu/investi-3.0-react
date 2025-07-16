import { Box, Paper, Typography, Divider, CircularProgress } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { red, green, grey, teal } from '@mui/material/colors';
import { useEffect, useState, useCallback } from "react";
import { IoBookmarkOutline, IoTrendingUp, IoTrendingDown } from "react-icons/io5";

// Define missing constants
const darkBg = "#0d0d0d";
const white = "#ffffff";
const cardBg = "rgba(20, 30, 20, 0.4)";
const cardActiveBg = "rgba(0, 50, 30, 0.4)";
const API_URL = process.env.REACT_APP_API_URL;

const WishlistWIdget = ({ wishlist, removeFromWishlist, handleSearch, ticker: currentTicker, marketChange, isMobile = false }) => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // Improved data fetching with memoized callback
  const getLiveStockData = useCallback(async (ticker) => {
    if (!ticker) return;

    try {
      setLoading(true);
      // Fix API URL - ensure it has a trailing slash
      const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
      const url = `${baseUrl}tiingo/livedata?ticker=${ticker}`;
      
      console.log("Fetching data for:", ticker, "URL:", url);
      
      const response = await fetch(url);
      const result = await response.json();

      // Only update if response is ok
      if (!response.ok) {
        console.log("Error fetching data for ticker:", ticker, result.message || response.statusText);
        return;
      }

      // Create a more robust update approach
      setStockData(prevData => {
        // Filter out old data for this ticker
        const filteredData = prevData.filter(item => item.ticker !== ticker);
        // Add new data, ensuring it exists
        if (result.data && result.data.length > 0) {
          return [...filteredData, ...result.data];
        }
        return filteredData;
      });
      
      console.log("Data received for ticker:", ticker, result.data);
    } catch (error) {
      console.log("Error fetching ticker data:", ticker, error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Fetch data when wishlist changes and periodically refresh
  useEffect(() => {
    if (!wishlist || !Array.isArray(wishlist) || wishlist.length === 0) {
      console.log("Wishlist is empty or invalid:", wishlist);
      return;
    }
    
    console.log("Wishlist updated, fetching data for:", wishlist);
    
    // Initial fetch for all tickers
    wishlist.forEach(ticker => {
      if (ticker) getLiveStockData(ticker);
    });
    
    // Set up interval for periodic updates (every 60 seconds)
    const interval = setInterval(() => {
      if (wishlist && wishlist.length > 0) {
        console.log("Refreshing watchlist data...");
        wishlist.forEach(ticker => {
          if (ticker) getLiveStockData(ticker);
        });
      }
    }, 60000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [wishlist, getLiveStockData]);

  const getPriceForTicker = (ticker) => {
    const stock = stockData?.find(item => item?.ticker === ticker);
    
    if (!stock) return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={14} sx={{ color: teal[400] }} />
        <Typography fontSize="0.8rem" color={grey[500]}>Loading...</Typography>
      </Box>
    );
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {stock.tngoLast > stock.prevClose ? 
          <IoTrendingUp color={green[400]} /> : 
          <IoTrendingDown color={red[400]} />
        }
        <Typography 
          variant="body1" 
          fontWeight="bold"
          sx={{ 
            color: stock.tngoLast > stock.prevClose ? green[400] : red[400],
            letterSpacing: 0.5
          }}>
          ${stock.tngoLast?.toFixed(2)}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        padding: isMobile ? 0 : 2,
        overflowY: "auto",
        background: isMobile ? 'transparent' : 'rgba(20, 30, 20, 0.2)',
        borderLeft: isMobile ? 'none' : `1px solid ${green[900]}`,
      }}
    >
      {!isMobile && (
        <Typography variant="h6" fontWeight="bold" color={teal[400]} sx={{ mb: 2 }}>
          My Watchlist
        </Typography>
      )}
      
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((stockTicker, index) => (
          <Paper 
            key={index} 
            sx={{
              backgroundColor: currentTicker === stockTicker ? cardActiveBg : cardBg,
              borderRadius: 2,
              p: isMobile ? 1.5 : 2,
              mb: isMobile ? 1 : 2,
              maxWidth: isMobile ? '90%' : "80%",
              cursor: "pointer",
              border: currentTicker === stockTicker ? `1px solid ${green[700]}` : `1px solid transparent`, 
              '&:hover': {
                transform: 'translateY(-3px)',
                backgroundColor: 'rgba(30, 40, 30, 0.5)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderColor: green[900]
              },
              transition: 'all 0.2s ease',
            }}
            onClick={() => handleSearch(stockTicker)}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              p: 1.5,
              borderBottom: `1px solid ${grey[900]}`
            }}>
              <Typography 
                variant="h6" 
                fontWeight="600"
                sx={{ color: grey[100] }}
              >
                {stockTicker}
              </Typography>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(stockTicker);
                }}
                sx={{
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  }
                }}
              >
                <RxCross2 
                  fontSize={16} 
                  style={{ 
                    color: grey[400],
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: red[400]
                    }
                  }} 
                />
              </Box>
            </Box>
            
            <Box sx={{ 
              p: 1.5, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography 
                sx={{ 
                  fontWeight: "bold",
                  fontSize: '0.9rem',
                  color: grey[300],
                  letterSpacing: 0.5
                }}
              >
                Price
              </Typography>
              {getPriceForTicker(stockTicker)}
            </Box>
          </Paper>
        ))
      ) : (
        <Box sx={{ textAlign: "center", mt: 4, px: isMobile ? 2 : 0 }}>
          <Typography color={grey[500]} sx={{ fontStyle: "italic" }}>
            Your watchlist is empty
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WishlistWIdget;
