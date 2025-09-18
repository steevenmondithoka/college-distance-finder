// Home.jsx
import React from 'react';

// Assuming you have images for the phone and the abstract shapes
// For simplicity, I'll use placeholders or simple div colors.
// You'll need to replace '/path/to/phone-image.png' and handle the abstract shapes.

function Home() {
  return (
    <div style={homeStyles.container}>
      {/* Background blur effects */}
      <div style={homeStyles.backgroundBlurLeft}></div>
      <div style={homeStyles.backgroundBlurRight}></div>

      <div style={homeStyles.mainContentWrapper}>
        {/* Left Section: Text Content */}
        <div style={homeStyles.textContent}>
          <p style={homeStyles.smallText}></p>
          <h1 style={homeStyles.heading}>The best way <br /> to showcase <br /> your project.</h1>
          <p style={homeStyles.description}>
            Here you can put a short description about your project.
          </p>
          <div style={homeStyles.ctaButtons}>
            <button style={homeStyles.tryFreeButton}>Try for free</button>
            <button style={homeStyles.howItWorksButton}>See how it works</button>
          </div>
        </div>

        {/* Right Section: 3D Illustration */}
        <div style={homeStyles.illustrationSection}>
          {/* This is a simplified representation of the 3D illustration */}
          <div style={homeStyles.phoneContainer}>
            <div style={homeStyles.phoneMockup}>
              {/* This could be an actual image or more complex CSS for a phone */}
              <div style={homeStyles.phoneScreen}>
                 {/* This could be an actual image of the app screen */}
                 <span style={homeStyles.phoneLogoText}>Lando</span>
              </div>
            </div>
          </div>
          <div style={homeStyles.abstractShapesContainer}>
            {/* Representing the yellow and blue abstract shapes */}
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeYellow1}}></div>
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeBlue1}}></div>
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeYellow2}}></div>
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeBlue2}}></div>
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeYellow3}}></div>
            <div style={{...homeStyles.abstractShape, ...homeStyles.shapeBlue3}}></div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Company Logos */}
      <div style={homeStyles.companyLogosSection}>
        <p style={homeStyles.companyLogosText}>Trusted by individuals and teams at the world's best companies</p>
        <div style={homeStyles.logosContainer}>
          <div style={homeStyles.logoPlaceholder}>Logo</div>
         
        </div>
      </div>
    </div>
  );
}

const homeStyles = {
  container: {
    width:'100vw',
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8', // Light background color for the overall page
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '50px', // Space for the bottom logos
    boxSizing: 'border-box',
    overflow: 'hidden', // To contain the background blur effects
  },
  mainContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px 50px 0 50px', // Adjust top padding to clear the fixed navbar
    maxWidth: '1200px',
    width: '100%',
    flexGrow: 1, // Allow it to take available space
  },
  textContent: {
    flex: 1,
    maxWidth: '500px',
    textAlign: 'left',
    zIndex: 2,
  },
  smallText: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '10px',
  },
  heading: {
    fontSize: '56px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#666',
    marginBottom: '30px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
  },
  tryFreeButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  tryFreeButtonHover: { // For hover effect
    backgroundColor: '#0056b3',
  },
  howItWorksButton: {
    backgroundColor: 'white',
    color: '#555',
    border: '1px solid #ddd',
    padding: '12px 25px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  howItWorksButtonHover: { // For hover effect
    backgroundColor: '#f5f5f5',
    borderColor: '#bbb',
  },
  illustrationSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '400px', // Give it a fixed height for positioning
    zIndex: 2,
  },
  phoneContainer: {
    position: 'absolute',
    transform: 'translateY(-50px) rotateZ(15deg)', // Lifted and slightly rotated
    zIndex: 4,
  },
  phoneMockup: {
    width: '120px',
    height: '240px',
    backgroundColor: '#222', // Dark phone body
    borderRadius: '15px',
    border: '5px solid #000',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  phoneScreen: {
    width: 'calc(100% - 10px)',
    height: 'calc(100% - 10px)',
    backgroundColor: '#ffc107', // Yellow background for app screen
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneLogoText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  abstractShapesContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    bottom: '-20px', // Position relative to the bottom of the section
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
  },
  abstractShape: {
    position: 'absolute',
    width: '80px',
    height: '100px',
    borderRadius: '50px 50px 0 0', // Rounded top, flat bottom
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
  shapeYellow1: { backgroundColor: '#ffc107', height: '100px', width: '80px', transform: 'translateX(-120px) translateY(20px) rotateZ(-5deg)', zIndex: 1 },
  shapeBlue1: { backgroundColor: '#007bff', height: '140px', width: '90px', transform: 'translateX(-60px) rotateZ(5deg)', zIndex: 2 },
  shapeYellow2: { backgroundColor: '#ffc107', height: '120px', width: '70px', transform: 'translateY(10px) rotateZ(10deg)', zIndex: 1 },
  shapeBlue2: { backgroundColor: '#007bff', height: '100px', width: '80px', transform: 'translateX(60px) translateY(5px) rotateZ(-10deg)', zIndex: 2 },
  shapeYellow3: { backgroundColor: '#ffc107', height: '80px', width: '60px', transform: 'translateX(100px) translateY(15px) rotateZ(15deg)', zIndex: 1 },
  shapeBlue3: { backgroundColor: '#007bff', height: '120px', width: '85px', transform: 'translateX(30px) translateY(-5px) rotateZ(0deg)', zIndex: 3 }, // Adjusted for more overlap and varied heights

  companyLogosSection: {
    width: '100vw',
    maxWidth: '1200px',
    padding: '50px 50px 20px 50px',
    textAlign: 'center',
    marginTop: '50px',
    borderTop: '1px solid #eee',
    zIndex: 2,
  },
  companyLogosText: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  logosContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  logoPlaceholder: {
    width: '80px',
    height: '30px',
    backgroundColor: '#eee',
    color: '#bbb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    borderRadius: '5px',
  },
  backgroundBlurLeft: {
    position: 'absolute',
    top: '5%',
    left: '-10%',
    width: '400px',
    height: '400px',
    backgroundColor: 'rgba(200, 180, 255, 0.3)', // Light purple
    borderRadius: '50%',
    filter: 'blur(100px)',
    zIndex: 0,
  },
  backgroundBlurRight: {
    position: 'absolute',
    bottom: '10%',
    right: '-10%',
    width: '500px',
    height: '500px',
    backgroundColor: 'rgba(180, 220, 255, 0.3)', // Light blue
    borderRadius: '50%',
    filter: 'blur(120px)',
    zIndex: 0,
  },
};

export default Home;