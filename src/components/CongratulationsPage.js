import React from 'react';
import '../componentsCss/CongratulationsPage.css'

const CongratulationsPage = () => {
  return (
    <div className="congratulation-area text-center mt-5">
      <div className="container">
        <div className="congratulation-wrapper">
          <div className="congratulation-contents center-text">
            <div className="congratulation-contents-icon">
              <i className="fas fa-check"></i>
            </div>
            <h4 className="congratulation-contents-title"> Congratulations! </h4>
            <p className="congratulation-contents-para">
              Your Joined Folder
            </p>
            <div className="btn-wrapper mt-4">
              <a href="/" className="cmn-btn btn-bg-1">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsPage;
