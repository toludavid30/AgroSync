import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div id="Landing">
      <div className="heroSection">
        <div className="wrapper container-fluid px-5">
          <h1 className="heroText animated-text col-11 col-md-8 text-center" data-aos="fade-up">
            AgroSync: Empowering Agriculture, Connecting Futures
          </h1>
          <p className="subColor subText text-center animated-fadein col-10 fs-5 mx-auto" data-aos="zoom-in">
            Welcome to AgroSync, the next-generation marketplace where farmers and buyers connect seamlessly.<br />
            <span style={{ color: '#8ED93F', fontWeight: 600 }}>AI-powered crop health analysis</span> lets farmers upload crop images directly from their phones, instantly receiving health status, spoilage risk, and actionable recommendations.<br />
            Unlock new opportunities, maximize yields, and make data-driven decisions with our intuitive analytical dashboard.
          </p>
          <div className="heroActions d-flex gap-3 animated-slideup">
            <Link to="/marketplace" className="btn btn-sm subBG2 subColor" data-aos="fade-right">Market Place</Link>
            <Link to="/signup" className="btn btn-md subBG subColor2" data-aos="fade-left">Sign Up</Link>
          </div>
        </div>
      </div>

        {/* Features Section */}
        <section id="features" className="featuresSection">
          <h2 className="sectionTitle">Why Choose AgroSync?</h2>
          <div className="featuresRow">
            <div className="featureCard animated-pop">
              <span className="featureIcon" role="img" aria-label="Marketplace">🛒</span>
              <h3>Marketplace</h3>
              <p>Connect with trusted buyers and sellers. Discover a transparent, secure, and efficient platform for trading agricultural produce.</p>
            </div>
            <div className="featureCard animated-pop" style={{ animationDelay: '0.2s' }}>
              <span className="featureIcon" role="img" aria-label="AI Analysis">🤖</span>
              <h3>AI Crop Health</h3>
              <p>Leverage advanced AI to analyze crop images, detect diseases, and receive instant health status and spoilage risk assessments.</p>
            </div>
            <div className="featureCard animated-pop" style={{ animationDelay: '0.4s' }}>
              <span className="featureIcon" role="img" aria-label="Upload">📱</span>
              <h3>Easy Image Upload</h3>
              <p>Upload crop images directly from your phone. Get actionable recommendations to improve yield and reduce losses.</p>
            </div>
            <div className="featureCard animated-pop" style={{ animationDelay: '0.6s' }}>
              <span className="featureIcon" role="img" aria-label="Dashboard">📊</span>
              <h3>Analytical Dashboard</h3>
              <p>Visualize your farm’s performance, track sales, and make data-driven decisions with our intuitive dashboard.</p>
            </div>
          </div>
        </section>

        {/* AI Crop Analysis Section */}
        <section id="ai-analysis" className="aiSection">
          <div className="aiContent">
            <div className="aiText">
              <h2 className="sectionTitle">AI-Powered Crop Health Analysis</h2>
              <p>
                Simply snap a photo of your crops and let AgroSync’s AI analyze for diseases, spoilage, and growth issues. Receive instant feedback and expert recommendations tailored to your farm’s needs.
              </p>
              <ul className="aiList">
                <li>Instant health status and spoilage risk</li>
                <li>Personalized recommendations</li>
                <li>Reduce losses and maximize yield</li>
              </ul>
            </div>
            <div className="aiImage animated-float">
              <img src="/Maize seedling in cultivated agricultural field with graphic concepts modern agricultural technology, digital farm, smart farming innovation.jpg" alt="AI Crop Analysis Demo" style={{ maxWidth: '320px', borderRadius: '1.5rem', boxShadow: '0 4px 24px #8ed93f22' }} />
            </div>
          </div>
        </section>

        {/* Image Upload and Recommendation Demo Section */}
        <section id="upload-demo" className="uploadSection">
          <div className="uploadContent">
            <div className="uploadText">
              <h2 className="sectionTitle">How It Works</h2>
              <ol className="uploadSteps">
                <li>Take a photo of your crop using your phone.</li>
                <li>Upload the image to AgroSync.</li>
                <li>Receive instant AI analysis and recommendations.</li>
              </ol>
            </div>
            <div className="uploadDemo animated-slidein">
              <img src="/upload-demo.png" alt="Upload Demo" style={{ maxWidth: '260px', borderRadius: '1rem', boxShadow: '0 2px 12px #8ed93f33' }} />
            </div>
          </div>
        </section>

        {/* Analytical Dashboard Preview Section */}
        <section id="dashboard" className="dashboardSection">
          <h2 className="sectionTitle">Analytical Dashboard Preview</h2>
          <div className="dashboardPreview animated-dashboard">
            <div className="dashboardCard">
              <h4>Farm Performance Overview</h4>
              <div className="dashboardStats">
                <div>
                  <span className="statValue">98%</span>
                  <span className="statLabel">Healthy Crops</span>
                </div>
                <div>
                  <span className="statValue">2%</span>
                  <span className="statLabel">At Risk</span>
                </div>
                <div>
                  <span className="statValue">120</span>
                  <span className="statLabel">Sales This Month</span>
                </div>
              </div>
              <div className="dashboardChart">
                <img src="/dashboard-preview.png" alt="Dashboard Chart" style={{ width: '100%', borderRadius: '1rem', marginTop: '1.5rem' }} />
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Landing