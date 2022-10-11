import { useEffect, useState } from "react";
import Select from "../Select";
import { styles } from "./styles";

const SelectPoints = ({
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
      <div className={styles.container}>
        <Select
          margin={styles.margin}
          placeholder={placeholders && placeholders[0]}
          addressList={filterAddress}
          onChange={setAddressStart}
        />
        <Select
          margin={"mt-0 sm:mt-1"}
          placeholder={placeholders && placeholders[1]}
          addressList={filterAddress}
          onChange={setAddressEnd}
        />
      </div>
    </>
  );
};

export default SelectPoints;
