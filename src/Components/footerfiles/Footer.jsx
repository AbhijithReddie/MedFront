import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <Container fluid className="cb-footer">
      <Row className="cb-ftr-cntnr">
        <Col md={3} className="text-center">
          <a href="/" target="_self" className="cb-hm-text">
            <img
              className="rounded-circle"
              id="cb-logo-main-menu"
              itemProp="image"
              height="125"
              width="125"
              alt="MedWorld Logo"
              title="MedWorld Logo"
              src="https://www.creativefabrica.com/wp-content/uploads/2020/07/17/Medicine-Logo-Graphics-4647232-1.jpg"
            />
          </a>
        </Col>
        <Col md={3}>
          <div className="text-left cb-font-16 font-weight-bold">MOBILE SITE & APPS</div>
          <ul className="cb-ftr-ul">
            <li className="cb-ftr-lst">
              <a href="#" className="text-white">
                <span className="cb-mobile-site cb-ico"></span>
                <span className="cb-footer-list-rt">www.medworld.com</span>
              </a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" href="#" target="_blank" rel="noreferrer">
                <span className="cb-app-android cb-ico"></span>
                <span className="cb-footer-list-rt">Android</span>
              </a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" href="#" target="_blank" rel="noreferrer">
                <span className="cb-app-ios cb-ico"></span>
                <span className="cb-footer-list-rt">iOS</span>
              </a>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <div className="text-left cb-font-16 font-weight-bold">FOLLOW US ON</div>
          <ul className="cb-ftr-ul">
            <li className="cb-ftr-lst">
              <a className="text-white" title="Facebook" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-fb cb-ico"></span>
                <span className="cb-footer-list-rt">facebook</span>
              </a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" title="Twitter" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-twitter cb-ico"></span>
                <span className="cb-footer-list-rt">twitter</span>
              </a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" title="Youtube" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-ytbe cb-ico"></span>
                <span className="cb-footer-list-rt">youtube</span>
              </a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" title="Pinterest" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-pinterest cb-ico"></span>
                <span className="cb-footer-list-rt">Pinterest</span>
              </a>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <div className="text-left cb-font-16 font-weight-bold">COMPANY</div>
          <ul className="cb-ftr-ul">
            <li className="cb-ftr-lst">
              <a className="text-white" title="Careers" href="/careers">Careers</a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" title="Advertise" href="/info/advertise">Advertise</a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" rel="nofollow" title="Privacy Policy" href="/info/privacy">Privacy Policy</a>
            </li>
            <li className="cb-ftr-lst">
              <a className="text-white" rel="nofollow" title="Terms of Use" href="/info/termsofuse">Terms of Use</a>
            </li>
          </ul>
        </Col>
        <Col md={12} className="cb-ftr-cpyrght text-center">
          © 2024 medworld.com, CVR College of Engineering. All rights reserved | 
          <a className="cb-ftr-cpyrght text-hvr-underline" href="http://www.cvr.ac.in/" target="_blank" rel="noreferrer"> CVR College of Engineering </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
