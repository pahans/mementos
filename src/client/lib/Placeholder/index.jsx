import { Shimmer } from "react-shimmer";
import PropTypes from 'prop-types';

/**
 * 
 * Placeholder component for image lazy loading.
 * @param { int } width - width of the image to replace
 * @param { int } height - height of the image to replace
 */
function Placeholder({ width, height }) {
  return <Shimmer width={width} height={height} />;
}

Placeholder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default Placeholder;
