
/* IMPORT */

import * as is from 'electron-is';
import * as React from 'react';
import {connect} from 'overstated';
import Main from '@renderer/containers/main';

/* TOOLBAR */

const Toolbar = ({ isFullscreen }) => {

  if ( !is.macOS () || isFullscreen ) return null;

  return <div className="layout-header"></div>;

};

/* EXPORT */

export default connect ({
  container: Main,
  selector: ({ container }) => ({
    isFullscreen: container.window.isFullscreen ()
  })
})( Toolbar );
