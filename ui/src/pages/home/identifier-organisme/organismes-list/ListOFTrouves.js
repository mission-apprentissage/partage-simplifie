import { Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

import AlertOFNotIdentified from "./AlertOFNotIdentified.js";
import DetailOFTrouve from "./DetailOFTrouve.js";
import InfoPlusieursOFTrouves from "./InfoPlusieursOFTrouves.js";
import InfoUniqueOFTrouve from "./InfoUniqueOFTrouve.js";

const ListOFTrouves = ({ searchUai, organismes }) => {
  const [showOFNotIdentified, setShowOFNotIdentified] = useState(false);

  return (
    <>
      {showOFNotIdentified === false && (
        <Stack spacing="4w">
          {organismes.length === 1 && <InfoUniqueOFTrouve uai={searchUai} />}
          {organismes.length > 1 && <InfoPlusieursOFTrouves uai={searchUai} />}

          {organismes.map((item, index) => (
            <DetailOFTrouve
              key={index}
              organisme={item}
              isDefaultOpened={organismes.length === 1 ? true : false}
              setShowOFNotIdentified={setShowOFNotIdentified}
            />
          ))}
        </Stack>
      )}

      {showOFNotIdentified === true && <AlertOFNotIdentified uai={searchUai} />}
    </>
  );
};

ListOFTrouves.propTypes = {
  searchUai: PropTypes.string.isRequired,
  organismes: PropTypes.arrayOf(
    PropTypes.shape({
      uai: PropTypes.string.isRequired,
      siren: PropTypes.string.isRequired,
      siret: PropTypes.string.isRequired,
      nature: PropTypes.string.isRequired,
      nom_etablissement: PropTypes.string.isRequired,
      reseaux: PropTypes.arrayOf(PropTypes.string).isRequired,
      adresse: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      academie: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListOFTrouves;
