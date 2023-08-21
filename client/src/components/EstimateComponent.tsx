import styled from "styled-components";
import { RadioButton, CircleFilled } from "@carbon/icons-react";
import { useState } from "react";

type EstimateComponentProps = {
  value: number;
};

const SelectWrapper = styled.div`
  display: flex;
`;

export const EstimateComponent = ({ value }: EstimateComponentProps) => {
  const [estimate, setEstimate] = useState(value);
  return (
    <SelectWrapper>
      {[...Array(estimate).keys()].map((idx) =>
        idx < value ? <CircleFilled size={24} /> : <RadioButton size={24} />
      )}
    </SelectWrapper>
  );
};
