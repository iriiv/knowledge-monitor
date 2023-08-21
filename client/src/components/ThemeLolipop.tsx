import { LollipopChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
`;

export const ThemeLolipop = ({ data, options }: any) => {
  return (
    <Wrapper>
      <LollipopChart data={data} options={options}></LollipopChart>
    </Wrapper>
  );
};
