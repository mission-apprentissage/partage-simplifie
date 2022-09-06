import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

const Highlight = ({ children, ...otherProps }) => {
  return (
    <Box marginLeft="4w" borderLeft="4px solid" borderColor="#6A6AF4" fontSize="gamma" {...otherProps}>
      <Text marginLeft="4w">{children}</Text>
    </Box>
  );
};

Highlight.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Highlight;
