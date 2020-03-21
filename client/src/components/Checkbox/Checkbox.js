import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

/**
 * A customized green checkbox
 * The default color is red/pink which is not good for
 * displaying todo completeness
 */
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />);

export default GreenCheckbox;
