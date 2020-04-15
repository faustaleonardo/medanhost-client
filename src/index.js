import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';
import App from 'components/App';
import { AuthProvider } from './context/auth/authState';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { BookmarkProvider } from 'context/bookmarks/bookmarkState';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

ReactDOM.render(
  <AuthProvider>
    <BookmarkProvider>
      <App />
    </BookmarkProvider>
  </AuthProvider>,
  document.getElementById('root')
);
