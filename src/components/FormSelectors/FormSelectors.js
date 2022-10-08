import { useEffect, useState } from "react";
import Select from "../Select";

const FormSelectors = ({
  className,
  margin,
  roundedTops = "",
  roundedBottoms = "",
  placeholders,
  address,
  addressStart,
  addressEnd,
  setAddressStart,
  setAddressEnd,
}) => {
  const [filterAddress, setFilterAddress] = useState([]);

  useEffect(() => {
    setFilterAddress(
      address
        .filter((item) =>
          addressStart ? item.rout !== addressStart.rout : true
        )
        .filter((item) => (addressEnd ? item.rout !== addressEnd.rout : true))
    );
  }, [address, addressStart, addressEnd]);

  return (
    <>
      <div className={className}>
        <Select
          margin={margin}
          roundedTop={roundedTops && roundedTops[0]}
          roundedBottom={roundedBottoms && roundedBottoms[0]}
          placeholder={placeholders && placeholders[0]}
          addressList={filterAddress}
          onChange={setAddressStart}
        />
        <Select
          margin={margin}
          roundedTop={roundedTops && roundedTops[1]}
          roundedBottom={roundedBottoms && roundedBottoms[1]}
          placeholder={placeholders && placeholders[1]}
          addressList={filterAddress}
          onChange={setAddressEnd}
        />
      </div>
    </>
  );
};

export default FormSelectors;
