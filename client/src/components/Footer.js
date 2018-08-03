import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer orange darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">More About the Author:</h5>
            <p className="grey-text text-lighten-4">
              Links to more of my personal projects and weblinks can be seen to
              the right.
            </p>
          </div>
          <div className="col l4 offset-l2 s12 orange darken-1">
            <h5 className="white-text">Links: </h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.facebook.com/mseckykoebel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.instagram.com/mseckykoebel/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://northwestern.academia.edu/MasonSeckyKoebel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Academia
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Personal Website (COMING SOON)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright orange darken-4">
        <div className="container orange darken-4">
          © 2014 Copyright Text
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
